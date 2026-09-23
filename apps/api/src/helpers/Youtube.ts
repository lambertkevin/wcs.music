import fs from "node:fs";
import axios from "axios";
import path from "node:path";
import { YtDlp } from "ytdlp-nodejs";
import { escape } from "node:querystring";
import { VideoMeta, LinkMetaResponse, SongMatch } from "../types";
import { PrismaClient } from "../../generated/prisma/client";
import {
  YoutubePlaylistURIRegex,
  YoutubeVideoURIRegex,
} from "../validation/YoutubeSchema";
import {
  PurpleContent as PurpleContentPlaylist,
  YoutubePlaylistInitialData,
  FluffyContent as FluffyContentPlaylist,
} from "../types/youtube-playlist.types";
import {
  HorizontalCardListRendererCard as Card,
  StructuredDescriptionContentRendererItem,
  YoutubeInitialData,
  YoutubePlayerInitialResponse,
} from "../types/youtube-video.types";

export const downloadSong = async (
  videoURI: string,
): Promise<string | undefined> => {
  const yt = new YtDlp();

  const videoCode = getVideoCode(videoURI);
  console.log(`Start Downloading: ${videoCode}`);
  const { filePaths } = await yt.downloadAsync(videoURI, {
    output: path.join(path.resolve("./tmp"), `${videoCode}.%(ext)s`),
    format: { filter: "audioonly", type: "mp3", quality: 5 },
  });
  console.log("filePaths", filePaths);
  console.log(`Finished Downloading: ${videoCode}`);

  if (fs.existsSync(filePaths[0])) {
    return filePaths[0];
  }
  return;
};

export const getYoutubeLinkType = (videoURI: string): "VIDEO" | "PLAYLIST" => {
  if (YoutubePlaylistURIRegex.test(videoURI)) {
    return "PLAYLIST";
  }

  if (YoutubeVideoURIRegex.test(videoURI)) {
    return "VIDEO";
  }

  throw new Error("Unknown video URI format");
};

export const getLinkMeta = async (
  prismaClient: PrismaClient,
  videoURI: string,
): Promise<LinkMetaResponse> => {
  const linkType = getYoutubeLinkType(videoURI);
  if (linkType === "PLAYLIST") {
    const alreadyExistingPlaylistMeta =
      await prismaClient.playlistMeta.findUnique({
        where: {
          uri: videoURI,
        },
        include: {
          items: {
            include: {
              songMatches: true,
            },
          },
        },
      });

    if (alreadyExistingPlaylistMeta) {
      return {
        type: "PLAYLIST",
        uri: alreadyExistingPlaylistMeta.uri,
        title: alreadyExistingPlaylistMeta.title,
        items:
          alreadyExistingPlaylistMeta?.items?.map(
            ({
              uri,
              videoId,
              title,
              lengthSeconds,
              thumbnails,
              songMatches,
            }) => ({
              uri,
              videoId,
              title,
              lengthSeconds,
              thumbnails: thumbnails as VideoMeta["thumbnails"],
              songMatches: songMatches.map((match) => ({
                source: match.source,
                artist: match.artist,
                title: match.title,
                bpm: match.bpm ?? undefined,
              })),
            }),
          ) || [],
      };
    }

    const initialData = await axios
      .get<string>(`${videoURI}&hl=en`)
      .then(({ data }) => {
        const initialData = data.match(
          /var ytInitialData\s*=\s*(\{.*?\});\s*<\/script>/s,
        );

        return initialData;
      })
      .then((data) => {
        const initialData = JSON.parse(
          data?.[1] || "{}",
        ) as YoutubePlaylistInitialData;

        return initialData;
      });
    const items = extractVideoInfoFromPlaylistInitialData(initialData);

    await prismaClient.playlistMeta.create({
      data: {
        uri: videoURI,
        title:
          initialData?.microformat?.microformatDataRenderer?.title || "Unknown",
        playlistId: YoutubePlaylistURIRegex.exec(videoURI)?.[1] || videoURI,
        items: {
          connectOrCreate: items.map((item) => ({
            where: { uri: item.uri },
            create: {
              uri: item.uri,
              videoId: YoutubeVideoURIRegex.exec(item.uri)?.[1] || item.uri,
              title: item.title,
              lengthSeconds: item.lengthSeconds,
              thumbnails: item.thumbnails,
            },
          })),
        },
      },
    });

    return {
      type: "PLAYLIST",
      uri: videoURI,
      title:
        initialData?.microformat?.microformatDataRenderer?.title || "Unknown",
      items,
    };
  }

  if (linkType === "VIDEO") {
    const alreadyExistingVideoMeta = await prismaClient.videoMeta.findUnique({
      where: {
        uri: videoURI,
      },
      include: {
        songMatches: true,
      },
    });
    if (alreadyExistingVideoMeta?.songMatches?.length) {
      return {
        type: "VIDEO",
        videoDetails: {
          uri: alreadyExistingVideoMeta.uri,
          videoId: alreadyExistingVideoMeta.videoId,
          title: alreadyExistingVideoMeta.title,
          lengthSeconds: alreadyExistingVideoMeta.lengthSeconds,
          thumbnails:
            alreadyExistingVideoMeta.thumbnails as VideoMeta["thumbnails"],
          songMatches: alreadyExistingVideoMeta.songMatches.length
            ? alreadyExistingVideoMeta.songMatches.map((match) => ({
                source: match.source,
                title: match.title,
                artist: match.artist,
                bpm: match.bpm ?? undefined,
              }))
            : undefined,
        },
      };
    }

    const { initialData, initialPlayerResponse } = await axios
      .get<string>(`${videoURI}&hl=en`)
      .then(({ data }) => {
        const initialDataMatch = data.match(
          /var ytInitialData\s*=\s*(\{.*?\});\s*<\/script>/s,
        );
        const initialPlayerResponseMatch = data.match(
          /var ytInitialPlayerResponse\s*=\s*(\{.*?\});\s*<\/script>/s,
        );

        return {
          initialDataMatch,
          initialPlayerResponseMatch,
        };
      })
      .then(({ initialDataMatch, initialPlayerResponseMatch }) => {
        const initialData = JSON.parse(
          initialDataMatch?.[1] || "{}",
        ) as YoutubeInitialData;

        const initialPlayerResponse = JSON.parse(
          initialPlayerResponseMatch?.[1] || "{}",
        ) as YoutubePlayerInitialResponse;

        return {
          initialData,
          initialPlayerResponse,
        };
      });

    const videoDetails = extractVideoInfoFromVideoInitialPlayerReponse(
      initialPlayerResponse,
    );
    const songMatches = extractSongMatchesFromInitialData(initialData);

    await prismaClient.videoMeta.upsert({
      where: { uri: videoURI },
      create: {
        uri: videoURI,
        videoId: YoutubeVideoURIRegex.exec(videoURI)?.[1] || videoURI,
        title: videoDetails.title,
        lengthSeconds: videoDetails.lengthSeconds,
        thumbnails: videoDetails.thumbnails,
        songMatches: {
          create: songMatches,
        },
      },
      update: {
        uri: videoURI,
        videoId: videoURI.replace("https://youtube.com/watch?v=", ""),
        title: videoDetails.title,
        lengthSeconds: videoDetails.lengthSeconds,
        thumbnails: videoDetails.thumbnails,
        songMatches: {
          create: songMatches,
        },
      },
    });

    return {
      type: "VIDEO",
      videoDetails: {
        ...videoDetails,
        songMatches: songMatches.map((match) => ({
          source: match.source,
          title: match.title,
          artist: match.artist,
        })),
      },
    };
  }

  throw new Error("Unknown youtube link type");
};

export const extractSongMatchesFromInitialData = (
  initalData: YoutubeInitialData,
): SongMatch[] => {
  if (!initalData.engagementPanels || !initalData.engagementPanels.length)
    return [];

  const { engagementPanels } = initalData;
  if (!engagementPanels || !engagementPanels.length) return [];

  const allItems: StructuredDescriptionContentRendererItem[] = [];
  for (const engagementPanel of engagementPanels) {
    const { items } =
      engagementPanel?.engagementPanelSectionListRenderer?.content
        ?.structuredDescriptionContentRenderer || {};

    if (items) {
      allItems.push(...items);
    }
  }
  if (!allItems.length) return [];

  const musicCards: Card[] = [];
  for (const item of allItems) {
    if (
      item?.horizontalCardListRenderer?.footerButton?.buttonViewModel
        ?.iconName === "MUSIC"
    ) {
      musicCards.push(...(item?.horizontalCardListRenderer?.cards || []));
    }
  }

  if (!musicCards) return [];

  const songInfos: SongMatch[] = [];
  for (const card of musicCards) {
    if (
      card?.videoAttributeViewModel?.title &&
      card?.videoAttributeViewModel?.subtitle
    ) {
      songInfos.push({
        source: "YOUTUBE",
        title: card.videoAttributeViewModel.title,
        artist: card.videoAttributeViewModel.subtitle,
      });
    }
  }

  return songInfos;
};

export const extractVideoInfoFromVideoInitialPlayerReponse = (
  initialPlayerResponse: YoutubePlayerInitialResponse,
): VideoMeta => {
  if (!initialPlayerResponse?.videoDetails)
    throw new Error("No video details in initialPlayerReponse");

  const { videoDetails } = initialPlayerResponse;
  return {
    uri: `https://youtube.com/watch?v=${videoDetails?.videoId}`,
    videoId: videoDetails?.videoId || "",
    title: videoDetails?.title || "",
    lengthSeconds: videoDetails?.lengthSeconds || "",
    thumbnails: videoDetails?.thumbnail?.thumbnails || [],
  };
};

export const extractVideoInfoFromPlaylistInitialData = (
  initialData: YoutubePlaylistInitialData,
): VideoMeta[] => {
  if (!initialData?.contents?.twoColumnBrowseResultsRenderer?.tabs) return [];
  const { tabs } = initialData.contents.twoColumnBrowseResultsRenderer;
  const sectionListRendererContents: PurpleContentPlaylist[] = [];
  for (const tab of tabs) {
    if (tab?.tabRenderer?.content?.sectionListRenderer?.contents) {
      sectionListRendererContents.push(
        ...tab.tabRenderer.content.sectionListRenderer.contents,
      );
    }
  }
  if (!sectionListRendererContents.length) return [];

  const itemSectionRendererContents: FluffyContentPlaylist[] = [];
  for (const content of sectionListRendererContents) {
    if (content?.itemSectionRenderer?.contents) {
      itemSectionRendererContents.push(...content.itemSectionRenderer.contents);
    }
  }
  if (!itemSectionRendererContents.length) return [];

  const playlistContent: VideoMeta[] = [];
  for (const content of itemSectionRendererContents) {
    if (content?.playlistVideoListRenderer?.contents) {
      playlistContent.push(
        ...content.playlistVideoListRenderer.contents.map((element) => ({
          uri: `https://youtube.com/watch?v=${element?.playlistVideoRenderer?.videoId}`,
          videoId: element?.playlistVideoRenderer?.videoId || "",
          title: element?.playlistVideoRenderer?.title?.runs?.[0]?.text || "",
          lengthSeconds: element?.playlistVideoRenderer?.lengthSeconds || "0",
          thumbnails:
            element?.playlistVideoRenderer?.thumbnail?.thumbnails || [],
        })),
      );
    } else if (content?.lockupViewModel) {
      const { lockupViewModel } = content;

      playlistContent.push({
        uri: `https://youtube.com/watch?v=${lockupViewModel.contentId}`,
        videoId: `https://youtube.com/watch?v=${lockupViewModel.contentId}`,
        title:
          lockupViewModel.metadata?.lockupMetadataViewModel?.title?.content ||
          "",
        lengthSeconds:
          extractLengthInSecondsFromLockupViewModel(lockupViewModel),
        thumbnails:
          lockupViewModel.contentImage?.thumbnailViewModel?.image?.sources ||
          [],
      });
    }
  }

  return playlistContent;
};

export const getVideoCode = (uri: string): string =>
  escape(uri.match(YoutubeVideoURIRegex)?.[1] || "");

const youtubeTimerLengthRegex = new RegExp(
  /(?:([0-9]{1,2}):)?([0-9]{1,2}):([0-9]{2})/s,
);

const extractLengthInSecondsFromLockupViewModel = (
  lockupViewModel: FluffyContentPlaylist["lockupViewModel"],
): string => {
  const { overlays } = lockupViewModel?.contentImage?.thumbnailViewModel || {};
  if (!overlays) {
    return "0";
  }

  const badges = overlays.flatMap(
    (overlay) => overlay.thumbnailBottomOverlayViewModel?.badges,
  );

  for (const badge of badges) {
    if (!badge) continue;

    const { text } = badge.thumbnailBadgeViewModel || {};
    if (!text) continue;

    if (youtubeTimerLengthRegex.test(text)) {
      const [, hours = "0", minutes = "0", seconds = "0"] =
        youtubeTimerLengthRegex.exec(text) || [];

      return (
        parseInt(hours) * 360 +
        parseInt(minutes) * 60 +
        parseInt(seconds)
      ).toString();
    }
  }

  return "0";
};
