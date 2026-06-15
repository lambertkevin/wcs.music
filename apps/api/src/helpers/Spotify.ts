import fs from "node:fs/promises";
import axios, { AxiosError } from "axios";
import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/client";
import { wait } from "./Utilities";
import {
  APIErrorResponse,
  SpotifyAppAccessTokenResponse,
  SpotifyCreatePlaylistResponse,
  SpotifySearchTrackResponse,
  SpotifyUserAccessTokenResponse,
} from "../types";

export const getAppAccessToken = async (): Promise<
  { type: "success"; appAccessToken: string } | APIErrorResponse
> => {
  let existingAppAccessToken: string | undefined;
  if (await fs.stat(".tokens.json").catch(() => false)) {
    try {
      const jsonContent = await fs.readFile(".tokens.json", "utf-8");
      const { appAccessToken, expiresAt } = JSON.parse(jsonContent) as {
        appAccessToken: string;
        expiresAt: number;
      };
      if (Date.now() < expiresAt) {
        existingAppAccessToken = appAccessToken;
      }
    } catch (e) {
      console.error(e);
      // ignore and get fresh app access token
    }
  }

  if (existingAppAccessToken) {
    return {
      type: "success",
      appAccessToken: existingAppAccessToken,
    };
  }

  try {
    const { data: appAccessTokenData } =
      await axios.post<SpotifyAppAccessTokenResponse>(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "client_credentials",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
    const { access_token: appAccessToken, expires_in: expiresIn } =
      appAccessTokenData;
    await fs.writeFile(
      ".tokens.json",
      JSON.stringify({
        appAccessToken,
        expiresAt: Date.now() + expiresIn * 1000,
      }),
    );

    return {
      type: "success",
      appAccessToken,
    };
  } catch (e) {
    return {
      type: "error",
      code: 500,
      message: "Couldn't get App accessToken",
      details: axios.isAxiosError(e) ? e.response?.data : undefined,
    };
  }
};

export const getUserAccessToken = async (
  fastify: FastifyInstance,
  code?: string,
  refreshToken?: string,
): Promise<
  | { type: "success"; accessToken: string; refreshToken: string }
  | APIErrorResponse
> => {
  if (!code && !refreshToken) {
    return {
      type: "error",
      message: "Open this link",
      details: `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&scope=playlist-modify-private,playlist-modify-public&redirect_uri=http://127.0.0.1:3000/v1/spotify/auth`,
    };
  }

  if (refreshToken) {
    return refreshUserAccessToken(refreshToken);
  }

  if (code) {
    return getUserTokensFromCode(code);
  }

  return {
    type: "error",
    code: 500,
    message: "Couldn't get user access token",
  };
};

export const refreshUserAccessToken = async (
  refreshToken: string | undefined,
  retries: number = 2,
): Promise<
  | { type: "success"; accessToken: string; refreshToken: string }
  | APIErrorResponse
> => {
  if (!refreshToken) return { type: "error", message: "Missing refreshToken" };

  try {
    const { data: userAccessTokenData } =
      await axios.post<SpotifyUserAccessTokenResponse>(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: process.env.CLIENT_ID,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")}`,
          },
        },
      );

    return {
      type: "success",
      accessToken: userAccessTokenData.access_token,
      refreshToken: refreshToken,
    };
  } catch (e) {
    console.log("Token Refreshing Error", JSON.stringify(e, null, 2));
    if (axios.isAxiosError(e) && retries >= 0) {
      await wait(500);
      return refreshUserAccessToken(refreshToken, retries - 1);
    }

    return {
      type: "error",
      code: axios.isAxiosError(e) ? e.status || 500 : 500,
      message: axios.isAxiosError<{ error?: string }>(e)
        ? e.response?.data?.error || e.message
        : "Unknown",
      details: axios.isAxiosError(e) ? e.response?.data : undefined,
    };
  }
};

export const getUserTokensFromCode = async (
  code: string | undefined,
  retries: number = 2,
): Promise<
  | { type: "success"; accessToken: string; refreshToken: string }
  | APIErrorResponse
> => {
  if (!code) return { type: "error", message: "Missing code" };

  try {
    const { data: userAccessTokenData } =
      await axios.post<SpotifyUserAccessTokenResponse>(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "authorization_code",
          redirect_uri: "http://127.0.0.1:5173/spotify/auth",
          code: code,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")}`,
          },
        },
      );

    return {
      type: "success",
      accessToken: userAccessTokenData.access_token,
      refreshToken: userAccessTokenData.refresh_token,
    };
  } catch (e) {
    if (retries >= 0) {
      await wait(500);
      return getUserTokensFromCode(code, retries - 1);
    }

    return {
      type: "error",
      code: 401,
      message: JSON.stringify((e as AxiosError)?.response?.data),
    };
  }
};

export const createPlaylist = async (
  userAccessToken: string,
  userRefreshToken: string,
  name: string,
  description: string,
  retries = 2,
): Promise<
  | {
      type: "success";
      playlist: SpotifyCreatePlaylistResponse;
      userAccessToken: string;
      userRefreshToken: string;
    }
  | APIErrorResponse
> => {
  try {
    const { data: createPlaylistResponse } =
      await axios.post<SpotifyCreatePlaylistResponse>(
        "https://api.spotify.com/v1/me/playlists",
        {
          name,
          description,
          public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        },
      );

    return {
      type: "success",
      playlist: createPlaylistResponse,
      userAccessToken,
      userRefreshToken,
    };
  } catch (e) {
    if (axios.isAxiosError(e) && e.status === 401) {
      if (retries >= 0) {
        const refreshUserAccessTokenResponse =
          await refreshUserAccessToken(userRefreshToken);
        if (refreshUserAccessTokenResponse.type === "success") {
          const { accessToken: freshUserAccessToken } =
            refreshUserAccessTokenResponse;
          await wait(500);
          return createPlaylist(
            freshUserAccessToken,
            userRefreshToken,
            name,
            description,
            retries - 1,
          );
        }
      }

      return {
        type: "error",
        code: 401,
        message: "Couldn't create the playlist",
        details: e.response?.data,
      };
    }
    return {
      type: "error",
      code: 500,
      message: "Couldn't create the playlist",
      details: e,
    };
  }
};

export const findTrack = async (
  prismaClient: PrismaClient,
  appAccessToken: string,
  title: string,
  artist: string,
): Promise<
  | {
      type: "search";
      track: string | null;
    }
  | APIErrorResponse
> => {
  const existingShazamSearch = await prismaClient.spotifyResult.findMany({
    where: {
      artist,
      title,
    },
  });
  if (existingShazamSearch.length) {
    return {
      type: "search",
      track: existingShazamSearch[0].uri,
    };
  }

  let spotifyTracks: SpotifySearchTrackResponse["tracks"];
  try {
    const {
      data: { tracks },
    } = await axios.get<SpotifySearchTrackResponse>(
      "https://api.spotify.com/v1/search",
      {
        params: {
          q: `${title} - ${artist}`,
          type: "track",
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${appAccessToken}`,
        },
      },
    );

    spotifyTracks = tracks;
  } catch (e) {
    return {
      type: "error",
      message: "Spotify API search failed",
      details: axios.isAxiosError(e) ? e.response?.data : undefined,
    };
  }

  if (!spotifyTracks.items.length) {
    return {
      type: "search",
      track: null,
    };
  }

  await prismaClient.spotifyResult.createMany({
    data: spotifyTracks.items.map(({ uri }) => ({
      searchTerm: `${title} - ${artist}`,
      title,
      artist,
      uri,
    })),
  });
  return {
    type: "search",
    track: spotifyTracks.items[0].uri,
  };
};

export const addSongsToPlaylist = async (
  userAccessToken: string,
  playlistId: string,
  uris: Set<string>,
): Promise<void> => {
  await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/items`,
    { uris: Array.from(uris), position: 0 },
    {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    },
  );

  return;
};
