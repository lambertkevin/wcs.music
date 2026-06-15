import classnames from "classnames";
import type { LinkMetaResponse } from "../../../api/src/types";
import VideoListElementComponent from "./VideoListElementComponent";
import ShazamSvg from "../assets/shazam.svg?react";

type Props = {
  className: string | undefined;
  onSelectAll: () => void;
  selectedLinks: Set<string>;
  analyzedLinksMapSize: number;
  analyzedLinks: Record<string, LinkMetaResponse> | undefined;
  onVideoChecked: (uri: string, checked: boolean) => void;
  buttonDisabled: boolean;
  onIdentifySongs: () => void;
};

const MiddlePanelComponent = ({
  className,
  selectedLinks,
  analyzedLinksMapSize,
  analyzedLinks,
  onSelectAll,
  onVideoChecked,
  buttonDisabled,
  onIdentifySongs,
}: Props) => {
  return (
    <div className={className}>
      <div className="px-6 pt-0 max-h-screen overflow-scroll w-full flex flex-col flex-1 justify-between">
        <div className="p-4 pb-2 pt-2 text-xs flex flex-row justify-between sticky top-0 backdrop-blur-md z-10 bg-base-200/70">
          <span className="card-title text-white">Videos</span>
          {analyzedLinksMapSize ? (
            <button
              className={classnames([
                "btn transition-none",
                selectedLinks.size === analyzedLinksMapSize
                  ? "btn-ghost btn-outline"
                  : "btn-primary btn-outline",
              ])}
              onClick={onSelectAll}
            >
              {selectedLinks.size === analyzedLinksMapSize
                ? "Deselect All"
                : "Select All"}
              {selectedLinks.size === analyzedLinksMapSize ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={22}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={22}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              )}
            </button>
          ) : (
            <></>
          )}
        </div>

        {analyzedLinks ? (
          <ul className="list py-5 flex flex-col justify-between">
            {Object.values(analyzedLinks).map((linkMeta, index) =>
              linkMeta.type === "VIDEO" ? (
                <VideoListElementComponent
                  key={linkMeta.videoDetails.uri}
                  className="list-row flex items-center cursor-pointer bg-base-300 transition-colors duration-300 ml-0 rounded-none"
                  onVideoChecked={onVideoChecked}
                  videoDetails={linkMeta.videoDetails}
                  index={index}
                  selectedLinks={selectedLinks}
                />
              ) : linkMeta.type === "PLAYLIST" ? (
                <li>
                  <div className="pb-2">
                    <div className="menu-title pl-0 pb-0 text-secondary">
                      Playlist: {linkMeta.title}
                    </div>
                    <span className="text-xs opacity-30 font-mono">
                      <a
                        className="link link-hover"
                        href={linkMeta.uri}
                        target="_blank"
                      >
                        {linkMeta.uri}
                      </a>
                    </span>
                  </div>
                  <ul className="pl-4 border-l border-neutral/40">
                    {linkMeta.items.map((videoDetails, subIndex) => (
                      <VideoListElementComponent
                        className="list-row flex items-center cursor-pointer bg-base-300 transition-colors duration-300 ml-0 rounded-none"
                        key={videoDetails.uri}
                        onVideoChecked={onVideoChecked}
                        videoDetails={videoDetails}
                        index={index}
                        subIndex={subIndex}
                        selectedLinks={selectedLinks}
                      />
                    ))}
                  </ul>
                </li>
              ) : (
                <></>
              ),
            )}
          </ul>
        ) : (
          <div className="w-full text-center justify-self-center text-xl">
            No analyzed video yet
          </div>
        )}

        <button
          className={classnames([
            "btn bg-info/20 hover:bg-info/80 rounded-4xl btn-outline px-10 sticky z-10 bottom-2 right-2 text-white self-end",
            analyzedLinksMapSize ? "" : "opacity-0!",
            buttonDisabled || !selectedLinks.size
              ? "btn-disabled opacity-50"
              : "",
          ])}
          onClick={onIdentifySongs}
        >
          {buttonDisabled ? (
            <>
              <svg
                className="mr-2 size-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-10"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-30"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Identifying...
            </>
          ) : (
            <>
              <ShazamSvg width={20} />
              Identify Songs
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MiddlePanelComponent;
