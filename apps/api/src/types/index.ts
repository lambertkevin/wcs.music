import { Shazam } from "node-shazam";
import { ThumbnailElement } from "./youtube-video.types";

export * from "./spotify.types";
export * from "./api.types";

export type VideoMeta = {
  uri: string;
  videoId: string;
  title: string;
  lengthSeconds: string;
  thumbnails: ThumbnailElement[];
  songMatches?: SongMatch[] | undefined;
};
export type VideoMetaWithSongMatches = VideoMeta & {
  songMatches: SongMatch[];
};

export type SongMatchSource = "SHAZAM" | "YOUTUBE";

export type SongMatch = {
  source: SongMatchSource;
  title: string;
  artist: string;
  bpm?: number | undefined;
};

export type SearchError = {
  message: string;
};

export type ShazamRecognized = ReturnType<Shazam["recognise"]>;

export type ErrorMetaResponse = {
  type: "ERROR";
  message: string;
};
export type VideoMetaResponse = {
  type: "VIDEO";
  videoDetails: VideoMeta;
};
export type VideoMetaResponseWithSongMatches = VideoMetaResponse & {
  videoDetails: VideoMetaWithSongMatches;
};
export type PlaylistMetaResponse = {
  type: "PLAYLIST";
  uri: string;
  title: string;
  items: VideoMeta[];
};
export type PlaylistMetaResponseWithSongMatches = PlaylistMetaResponse & {
  items: VideoMetaWithSongMatches;
};
export type LinkMetaResponse =
  | VideoMetaResponse
  | PlaylistMetaResponse
  | ErrorMetaResponse;
export type LinkMetaResponseWithVideoMetaSongMatches =
  | VideoMetaResponseWithSongMatches
  | PlaylistMetaResponse
  | ErrorMetaResponse;
export type LinkMetaResponseWithSongMatches =
  | VideoMetaResponseWithSongMatches
  | PlaylistMetaResponseWithSongMatches
  | ErrorMetaResponse;
