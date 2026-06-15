const SpotifyAuthView = () => {
  const searchParams = new URLSearchParams(location.search);
  const channel = new BroadcastChannel("spotify-auth");
  channel.postMessage({ code: searchParams.get("code") });

  channel.onmessage = (e: MessageEvent<{ type: "close" }>) => {
    if (e.data.type === "close") {
      channel.close();
      window.close();
    }
  };

  return <>Test</>;
};

export default SpotifyAuthView;
