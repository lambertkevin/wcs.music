import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/client";
import { APIErrorResponse, SongMatch } from "../types";
import {
  findTrack,
  createPlaylist,
  getAppAccessToken,
  addSongsToPlaylist,
} from "../helpers/Spotify";
import { isAxiosError } from "axios";

export const searchTracksFromSongMatches = async (
  fastify: FastifyInstance,
  prisma: PrismaClient,
  items: SongMatch[],
): Promise<
  | {
      type: "success";
      tracks: string[];
    }
  | APIErrorResponse
> => {
  const appAccessTokenResponse = await getAppAccessToken();
  if (appAccessTokenResponse.type === "error") return appAccessTokenResponse;

  const { appAccessToken } = appAccessTokenResponse;
  const spotifyTracks = new Set<string>();
  for (const item of items) {
    const findTrackResponse = await findTrack(
      prisma,
      appAccessToken,
      item.title,
      item.artist,
    );

    if (findTrackResponse.type === "search" && findTrackResponse.track) {
      spotifyTracks.add(findTrackResponse.track);
    }
  }

  return {
    type: "success",
    tracks: Array.from(spotifyTracks),
  };
};

export const savePlaylist = async (
  fastify: FastifyInstance,
  prisma: PrismaClient,
  userAccessToken: string,
  userRefreshToken: string,
  playlistName: string,
  playlistDescription: string,
  tracks: string[],
): Promise<
  | {
      type: "success";
      playlistId: string;
      uri: string;
      accessToken: string;
      refreshToken: string;
    }
  | APIErrorResponse
> => {
  if (!userRefreshToken)
    return { type: "error", message: "Empty refreshToken" };

  const spotifyURIs = new Set<string>(tracks);
  if (!spotifyURIs.size) {
    throw new Error("Couldn't find any songs");
  }

  const createPlaylistResponse = await createPlaylist(
    userAccessToken,
    userRefreshToken,
    playlistName,
    playlistDescription,
  );

  if (createPlaylistResponse.type === "success") {
    try {
      await addSongsToPlaylist(
        createPlaylistResponse.userAccessToken,
        createPlaylistResponse.playlist.id,
        spotifyURIs,
      );

      return {
        type: "success",
        playlistId: createPlaylistResponse.playlist.id,
        uri: createPlaylistResponse.playlist.external_urls.spotify,
        accessToken: createPlaylistResponse.userAccessToken,
        refreshToken: createPlaylistResponse.userRefreshToken,
      };
    } catch (e) {
      return {
        type: "error",
        message: "Failed to add songs to playlist",
        details: isAxiosError(e) ? e.response?.data : undefined,
      };
    }
  } else {
    return createPlaylistResponse;
  }
};
