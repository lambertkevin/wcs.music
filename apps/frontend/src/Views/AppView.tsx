import axios from "axios";
import { useMemo, useState } from "react";
import type { LinkMetaResponse, VideoMeta } from "../../../api/src/types";
import MiddlePanelComponent from "../Components/MiddlePanelComponent";
import RightPanelComponent from "../Components/RightPanelComponent";
import LeftPanelComponent from "../Components/LeftPanelComponent";
import ModalComponent from "../Components/ModalComponent";

const AppView = () => {
  const [links, setLinks] = useState(
    "https://www.youtube.com/playlist?list=PLcSsTORVFETMHG88_Yl8MbmMja9G85uRW",
  );

  const [analyzedLinks, setAnalyzedLinks] =
    useState<Record<string, LinkMetaResponse>>();
  const analyzedLinksMap = useMemo(() => {
    if (!analyzedLinks) return {};

    const analyzedLinksMap: Record<string, VideoMeta> = {};
    for (const linkMeta of Object.values(analyzedLinks)) {
      if (linkMeta.type === "VIDEO") {
        analyzedLinksMap[linkMeta.videoDetails.uri] = linkMeta.videoDetails;
      } else if (linkMeta.type === "PLAYLIST") {
        for (const item of linkMeta.items) {
          analyzedLinksMap[item.uri] = item;
        }
      }
    }

    return analyzedLinksMap;
  }, [analyzedLinks]);
  const analyzedLinkMapSize = useMemo(
    () => Object.keys(analyzedLinksMap).length,
    [analyzedLinksMap],
  );

  const [isAnalyzeOngoing, setIsAnalyzeOngoing] = useState(false);
  const onAnalyze = async () => {
    if (isAnalyzeOngoing) return;

    setIsAnalyzeOngoing(true);
    const response = await axios
      .post<Record<string, LinkMetaResponse>>(
        `${import.meta.env.VITE_API_DOMAIN}/v1/video/analyze`,
        {
          links: links.split("\n"),
        },
      )
      .finally(() => {
        setIsAnalyzeOngoing(false);
      });
    setAnalyzedLinks(response.data);
  };

  const [selectedLinks, setSelectedLinks] = useState<Set<string>>(new Set());
  const onVideoElementListChecked = (id: string, checked: boolean) => {
    setSelectedLinks((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  };
  const onSelectAllVideoElements = () => {
    if (selectedLinks.size !== analyzedLinkMapSize) {
      setSelectedLinks(new Set(Object.keys(analyzedLinksMap)));
    } else {
      setSelectedLinks(new Set());
    }
  };

  const [identifiedSongsMap, setIdentifiedSongsMap] =
    useState<Record<string, LinkMetaResponse>>();
  const [isIdentifyOngoing, setIsIdentifyOngoing] = useState(false);
  const onIdentifySongs = async () => {
    if (isIdentifyOngoing) return;

    setIsIdentifyOngoing(true);
    const response = await axios
      .post<Record<string, LinkMetaResponse>>(
        `${import.meta.env.VITE_API_DOMAIN}/v1/video/identify`,
        {
          links: Array.from(selectedLinks),
          songMatchSources: ["YOUTUBE", "SHAZAM"],
        },
      )
      .finally(() => {
        setIsIdentifyOngoing(false);
      });
    setIdentifiedSongsMap(response.data);
  };

  return (
    <main className="w-full flex flex-row h-screen">
      <LeftPanelComponent
        className="w-3/12 flex flex-col items-center relative bg-primary-content h-full"
        links={links}
        onLinksChange={(e) => setLinks(e.target.value)}
        onButtonClick={onAnalyze}
        disableButton={isAnalyzeOngoing}
      />
      <MiddlePanelComponent
        className="w-5/12 flex flex-col bg-base-200 relative justify-between h-full"
        analyzedLinks={analyzedLinks}
        analyzedLinksMapSize={analyzedLinkMapSize}
        onSelectAll={onSelectAllVideoElements}
        onVideoElementChecked={onVideoElementListChecked}
        selectedLinks={selectedLinks}
        onIdentifySongs={onIdentifySongs}
        identifiedSongsMap={identifiedSongsMap}
        buttonDisabled={isIdentifyOngoing}
      />
      <RightPanelComponent
        className="w-4/12 flex flex-col overflow-scroll px-4 h-full"
        selectedLinks={selectedLinks}
        analyzedLinks={analyzedLinks}
        analyzedLinksMap={analyzedLinksMap}
        identifiedSongsMap={identifiedSongsMap}
      />
      <ModalComponent />
    </main>
  );
};

export default AppView;
