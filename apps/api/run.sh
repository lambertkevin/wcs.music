apt-get update && apt-get -y install ffmpeg git python3 python3-pip python-is-python3
pip install yt-dlp --break-system-packages
pip install deeprhythm --break-system-packages
pip install -U yt-dlp-ejs --break-system-packages

# YouTube now requires a PO token to serve audio/video URLs; without a
# provider yt-dlp falls back to clients whose URLs get 403'd. Script mode
# needs no persistent server, just this companion script built once.
pip install -U bgutil-ytdlp-pot-provider --break-system-packages
if [ ! -d ~/bgutil-ytdlp-pot-provider/server/build ]; then
  rm -rf ~/bgutil-ytdlp-pot-provider
  git clone --single-branch --branch 2.0.0 https://github.com/Brainicism/bgutil-ytdlp-pot-provider.git ~/bgutil-ytdlp-pot-provider
  (cd ~/bgutil-ytdlp-pot-provider/server && npm ci && npx tsc)
fi

npm i
npx prisma generate
npm run dev