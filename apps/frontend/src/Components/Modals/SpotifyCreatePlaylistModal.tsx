import z from "zod/v4";
import axios from "axios";
import { useState } from "react";
import type { CreatePlaylistModalProps } from "../../store/modal";
import SpotifySvg from "../../assets/spotify.svg?react";
import type {
  SpotifyCreatePlaylistResponseSchema,
  SpotifyAuthResponseSchema,
} from "../../../../api/src/validation/SpotifySchema";

const SpotifyCreatePlaylistModal = ({
  name,
  description,
  tracks,
}: CreatePlaylistModalProps) => {
  const [spotifyAuthCode, setSpotifyAuthCode] = useState<string>();
  const [tokens, setTokens] = useState<{
    accessToken: string | undefined;
    refreshToken: string | undefined;
  }>({
    accessToken: localStorage.getItem("spotify-access-token") || undefined,
    refreshToken: localStorage.getItem("spotify-refresh-token") || undefined,
  });

  const onAuthSpotify = () => {
    window.open(
      `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&scope=playlist-modify-private,playlist-modify-public&redirect_uri=http://${window.location.host}/spotify/auth`,
      "popup",
      [
        `left=${window.innerWidth / 2 - 200}`,
        `top=${window.innerHeight / 2 - 350}`,
        "width=400",
        "height=700",
      ].join(","),
    );
    const channel = new BroadcastChannel("spotify-auth");
    channel.onmessage = async (e: MessageEvent<{ code: string }>) => {
      if (e.data.code) {
        setSpotifyAuthCode(e.data.code);
        const {
          data: { accessToken, refreshToken },
        } = await axios.post<
          z.infer<(typeof SpotifyAuthResponseSchema)["2xx"]>
        >(`${import.meta.env.VITE_API_DOMAIN}/v1/spotify/auth`, {
          code: e.data.code,
          refreshToken: tokens.refreshToken,
        });

        setTokens({
          accessToken,
          refreshToken,
        });
        localStorage.setItem("spotify-access-token", accessToken);
        localStorage.setItem("spotify-refresh-token", refreshToken);
      }

      channel.postMessage({ type: "close" });
      channel.close();
    };
  };

  const [playlistInfos, setPlaylistInfos] = useState({
    name: name,
    description: description,
  });
  const onPlaylistInputsChange =
    (type: "name" | "description") =>
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setPlaylistInfos({
        ...playlistInfos,
        [type]: e.target.value,
      });
    };

  const [playlistId, setPlaylistId] = useState<string>();
  const onCreatePlaylist = async () => {
    try {
      const {
        data: {
          accessToken: freshAccessToken,
          refreshToken: freshRefreshToken,
          playlistId: pid,
        },
      } = await axios.post<
        z.infer<(typeof SpotifyCreatePlaylistResponseSchema)["2xx"]>
      >(`${import.meta.env.VITE_API_DOMAIN}/v1/spotify/create-playlist`, {
        ...playlistInfos,
        items: Array.from(tracks),
        refreshToken: tokens.refreshToken,
        accessToken: tokens.accessToken,
      });

      setPlaylistId(pid);
      setTokens({
        accessToken: freshAccessToken,
        refreshToken: freshRefreshToken,
      });
      localStorage.setItem("spotify-access-token", freshAccessToken);
      localStorage.setItem("spotify-refresh-token", freshRefreshToken);
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.status === 401) {
        localStorage.removeItem("spotify-access-token");
        localStorage.removeItem("spotify-refresh-token");
        setSpotifyAuthCode(undefined);
        setTokens({
          accessToken: undefined,
          refreshToken: undefined,
        });
      }
    }
  };

  return (
    <div className="modal-box flex flex-col items-center py-8">
      <h3 className="font-bold text-lg text-left w-full mb-8">
        Create Playlist
      </h3>

      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      {!spotifyAuthCode && (!tokens.accessToken || !tokens.refreshToken) ? (
        <button
          className="btn btn-ghost btn-outline h-fit flex flex-col w-fit p-8"
          onClick={onAuthSpotify}
        >
          <span>
            <SpotifySvg width={50} />
          </span>
          <span>Authorize Spotify</span>
        </button>
      ) : playlistId ? (
        <>
          <iframe
            data-testid="embed-iframe"
            className="rounded-2xl"
            src={`https://open.spotify.com/embed/playlist/${playlistId}`}
            width="100%"
            height="352"
            allow="autoplay; encrypted-media;"
            loading="lazy"
          ></iframe>
        </>
      ) : (
        <div className="flex flex-col w-full">
          <fieldset className="fieldset flex">
            <legend className="fieldset-legend">Playlist title</legend>
            <input
              type="text"
              className="input grow"
              name="playlist-title"
              value={playlistInfos.name}
              onChange={onPlaylistInputsChange("name")}
              placeholder="My awesome WCS playlist..."
            />
          </fieldset>
          <fieldset className="fieldset flex mb-4">
            <legend className="fieldset-legend">Playlist description</legend>
            <input
              type="text"
              className="input grow"
              name="playlist-desc"
              value={playlistInfos.description}
              onChange={onPlaylistInputsChange("description")}
              placeholder="Description..."
            />
          </fieldset>
          <button
            className="btn btn-primary btn-outline flex flex-row w-fit self-end"
            onClick={onCreatePlaylist}
          >
            <SpotifySvg width={20} />
            <span>Create Playlist</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SpotifyCreatePlaylistModal;
