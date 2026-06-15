-- CreateEnum
CREATE TYPE "SongMatchSource" AS ENUM ('SHAZAM', 'YOUTUBE');

-- CreateTable
CREATE TABLE "SongMatch" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "source" "SongMatchSource" NOT NULL,
    "chunkStart" INTEGER,
    "chunkEnd" INTEGER,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "videoMetaId" TEXT NOT NULL,

    CONSTRAINT "SongMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoMeta" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lengthSeconds" TEXT NOT NULL,
    "thumbnails" JSONB NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistMeta" (
    "id" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "PlaylistMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpotifyResult" (
    "id" TEXT NOT NULL,
    "searchTerm" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpotifyResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaylistMetaToVideoMeta" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PlaylistMetaToVideoMeta_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoMeta_uri_key" ON "VideoMeta"("uri");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistMeta_uri_key" ON "PlaylistMeta"("uri");

-- CreateIndex
CREATE INDEX "_PlaylistMetaToVideoMeta_B_index" ON "_PlaylistMetaToVideoMeta"("B");

-- AddForeignKey
ALTER TABLE "SongMatch" ADD CONSTRAINT "SongMatch_videoMetaId_fkey" FOREIGN KEY ("videoMetaId") REFERENCES "VideoMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistMetaToVideoMeta" ADD CONSTRAINT "_PlaylistMetaToVideoMeta_A_fkey" FOREIGN KEY ("A") REFERENCES "PlaylistMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistMetaToVideoMeta" ADD CONSTRAINT "_PlaylistMetaToVideoMeta_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoMeta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
