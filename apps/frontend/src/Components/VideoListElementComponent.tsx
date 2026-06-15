import { useMemo } from "react";
import classNames from "classnames";
import YoutubeSvg from "../assets/youtube.svg?react";
import ShazamSvg from "../assets/shazam.svg?react";
import { secondsToDigital } from "../helpers";
import type {
  LinkMetaResponse,
  SongMatchSource,
  VideoMeta,
} from "../../../api/src/types";

type Props = {
  className: string | undefined;
  onVideoElementChecked: (uri: string, checked: boolean) => void;
  selectedLinks: Set<string>;
  videoDetails: VideoMeta;
  identifiedSongsMap: Record<string, LinkMetaResponse> | undefined;
  index: number;
  subIndex?: number;
};

const VideoListElementComponent = ({
  className,
  onVideoElementChecked,
  selectedLinks,
  videoDetails,
  identifiedSongsMap,
  index,
  subIndex,
}: Props) => {
  const { uri, thumbnails, title, lengthSeconds } = videoDetails;
  const { songMatches } =
    identifiedSongsMap?.[uri]?.type === "VIDEO"
      ? identifiedSongsMap?.[uri]?.videoDetails || {}
      : videoDetails;

  const songMatchesBySource = useMemo(() => {
    const sources: Record<SongMatchSource, typeof songMatches> = {
      SHAZAM: undefined,
      YOUTUBE: undefined,
    };
    for (const songMatch of songMatches || []) {
      if (!sources[songMatch.source]) {
        sources[songMatch.source] = [];
      }
      sources[songMatch.source]!.push(songMatch);
    }

    sources.SHAZAM?.sort(
      (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
    );
    sources.YOUTUBE?.sort(
      (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0),
    );

    return sources;
  }, [songMatches]);

  return (
    <li
      className={classNames([
        className,
        selectedLinks.has(uri) ? "bg-base-300" : "",
      ])}
      onClick={() => onVideoElementChecked(uri, !selectedLinks.has(uri))}
    >
      <div
        className={classNames([
          "w-1/12 font-thin opacity-30 tabular-nums whitespace-nowrap text-secondary",
          subIndex !== undefined ? "text-xl" : "text-3xl",
        ])}
      >
        {(index + 1).toString().padStart(2, "0")}
        {subIndex !== undefined
          ? `-${(subIndex + 1).toString().padStart(2, "0")}`
          : null}
      </div>
      <div className="w-2/12">
        <img
          className="w-full rounded-md"
          src={thumbnails[thumbnails.length - 1]?.url}
        />
      </div>
      <div className="w-7/12">
        <div className="line-clamp-2">{title}</div>
        <div className="text-xs opacity-60 font-mono">
          {secondsToDigital(Number(lengthSeconds))}
        </div>
        <div className="text-xs opacity-30 font-mono">
          <a className="link link-hover" href={uri} target="_blank">
            {uri}
          </a>
        </div>
        {songMatches && (
          <div className="flex flex-row mt-4">
            {songMatchesBySource["YOUTUBE"] && (
              <div className="flex flex-col w-1/2">
                <div className="badge badge-soft badge-error text-xs">
                  <YoutubeSvg height={14} width={14} /> Youtube
                </div>
                <ul className="pl-4 list-disc">
                  {songMatchesBySource["YOUTUBE"].map((match) => (
                    <li className="text-red-500 opacity-50 text-xs my-0.5">{`${match.title} - ${match.artist}`}</li>
                  ))}
                </ul>
              </div>
            )}
            {songMatchesBySource["SHAZAM"] && (
              <div className="flex flex-col w-1/2">
                <div className="badge badge-soft badge-info text-xs">
                  <ShazamSvg height={14} width={14} /> Shazam
                </div>
                <ul className="pl-4 list-disc">
                  {songMatchesBySource["SHAZAM"].map((match) => (
                    <li className="text-info opacity-50 text-xs mb-0.5">{`${match.title} - ${match.artist}`}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-1/12 flex flex-col items-end cursor-pointer">
        <input
          type="checkbox"
          className="btn btn-square btn-ghost checkbox checkbox-md pointer-events-none"
          checked={selectedLinks.has(uri)}
        />
      </div>
    </li>
  );
};

export default VideoListElementComponent;
