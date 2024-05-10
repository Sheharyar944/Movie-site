import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import YouTube from "react-youtube";

class YouTubePlayer extends React.Component {
  render() {
    const { videoId } = this.props;
    const opts = {
      height: "780px", // Full height
      width: "100%",
      zIndex: -1, // Full width
      playerVars: {
        autoplay: 1, // Auto-play the video
        mute: 1,
        controls: 0, // Hide player controls
        modestbranding: 1, // Show minimal YouTube branding
        loop: 1, // Loop the video
        fs: 1, // Allow fullscreen button
        origin: "https://www.youtube.com/embed/",
      },
    };

    return <YouTube videoId={videoId} opts={opts} />;
  }
}

export default YouTubePlayer;
