import { useState } from "react";
import classnames from "classnames";

type Props = {
  track: string;
};
const SpotifyIframeComponent = ({ track }: Props) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <div className="h-20 w-11/12 relative rounded-2xl overflow-hidden">
      <div
        className={classnames([
          "skeleton h-full w-full absolute transition-all transition-discrete",
          isIframeLoaded ? "hidden" : "block",
        ])}
      ></div>
      <iframe
        src={`https://open.spotify.com/embed/track/${track.split(":")[2]}?theme=0`}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media;"
        loading="lazy"
        onLoad={() => setIsIframeLoaded(true)}
      ></iframe>
    </div>
  );
};

export default SpotifyIframeComponent;
