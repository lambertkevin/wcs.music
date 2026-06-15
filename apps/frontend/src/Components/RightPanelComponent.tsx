import z from "zod/v4";
import axios from "axios";
import { useMemo, useState } from "react";
import type { SpotifySearchTracksReponseSchema } from "../../../api/src/validation/SpotifySchema";
import type { LinkMetaResponse, VideoMeta } from "../../../api/src/types";
import SpotifyIframeComponent from "./SpotifyIframeComponent";
import SpotifySvg from "../assets/spotify.svg?react";
import { useModalStore } from "../store/modal";

type Props = {
  className: string | undefined;
  selectedLinks: Set<string>;
  analyzedLinks: Record<string, LinkMetaResponse> | undefined;
  analyzedLinksMap: Record<string, VideoMeta>;
  disablePrimaryButton?: boolean;
  disableSecondaryButton?: boolean;
};

const RightPanelComponent = ({
  className,
  selectedLinks,
  analyzedLinks,
  analyzedLinksMap,
  disablePrimaryButton,
  disableSecondaryButton,
}: Props) => {
  const selectedLinksHaveSongMatches = useMemo(() => {
    for (const link of selectedLinks) {
      if (!analyzedLinksMap[link]?.songMatches?.length) return false;
    }
    return true;
  }, [selectedLinks]);

  const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set());
  const onSelectTrack = (track: string, checked: boolean) => {
    setSelectedTracks((prevTracks) => {
      const next = new Set(prevTracks);
      if (checked) {
        next.add(track);
      } else {
        next.delete(track);
      }
      return next;
    });
  };
  const [spotifyTracks, setSpotifyTracks] = useState<string[]>();
  const [isSearchTracksOngoing, setIsSearchTracksOngoing] = useState(false);
  const onSearchSpotifyTracks = async () => {
    if (isSearchTracksOngoing) return;

    setIsSearchTracksOngoing(true);
    axios
      .post<z.infer<(typeof SpotifySearchTracksReponseSchema)["2xx"]>>(
        "http://127.0.0.1:3000/v1/spotify/search-tracks",
        {
          items: Array.from(selectedLinks)
            .flatMap((link) => analyzedLinksMap[link].songMatches)
            .filter((e) => !!e),
        },
      )
      .then(({ data }) => {
        if (data.type === "success") {
          setSpotifyTracks(data.tracks);
          setSelectedTracks(new Set(data.tracks));
        }
      })
      .catch(() => {})
      .finally(() => setIsSearchTracksOngoing(false));
  };

  const { openModal } = useModalStore();
  const onCreatePlaylist = () => {
    const analyzedLinksValues = analyzedLinks
      ? Object.values(analyzedLinks)
      : [];

    console.log(analyzedLinks, analyzedLinksValues[0]);

    openModal({
      type: "CreatePlaylist",
      props: {
        name:
          analyzedLinksValues.length === 1
            ? analyzedLinksValues[0].type === "ERROR"
              ? "My new WCS Playlist"
              : analyzedLinksValues[0].type === "PLAYLIST"
                ? analyzedLinksValues[0].title
                : analyzedLinksValues[0].videoDetails.title
            : "My new WCS Playlist",
        description: `Based on ${Object.keys(analyzedLinks || {}).join(", ")}`,
        tracks: selectedTracks,
      },
    });
  };

  return (
    <div className={className}>
      {spotifyTracks ? (
        <>
          <button
            className="btn btn-secondary btn-outline sticky w-11/12 my-4"
            disabled={
              disablePrimaryButton ||
              !selectedLinksHaveSongMatches ||
              !selectedLinks.size
            }
            onClick={onSearchSpotifyTracks}
          >
            Search selected on Spotify
          </button>
          <ul>
            {spotifyTracks.map((track) => (
              <li className="my-2 flex flex-row justify-center items-center">
                <SpotifyIframeComponent track={track} />
                <div className="w-1/12 flex flex-col items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="btn btn-square btn-ghost checkbox checkbox-md"
                    checked={selectedTracks.has(track)}
                    onChange={(e) => onSelectTrack(track, e.target.checked)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-between w-11/12 my-4">
            <button
              className="btn btn-success grow"
              disabled={disableSecondaryButton || !selectedTracks.size}
              onClick={onCreatePlaylist}
            >
              <SpotifySvg width={30} />
              Add to playlist
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-between w-11/12 my-4">
          <button
            className="btn  btn-outline grow"
            disabled={
              disablePrimaryButton ||
              !selectedLinksHaveSongMatches ||
              !selectedLinks.size
            }
            onClick={onSearchSpotifyTracks}
          >
            Search selected on Spotify
          </button>
        </div>
      )}
      {!selectedLinksHaveSongMatches ? (
        <div className="toast toast-end">
          <div className="alert alert-error alert-outline">
            <span>Selected videos aren't all identified</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RightPanelComponent;
