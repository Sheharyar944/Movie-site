import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import mute from "../assets/mute.png";
import sound from "../assets/sound.png";

const YouTubePlayer = ({ videoId, videoLoaded, setVideoLoaded }) => {
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const opts = {
    height: "780px", // Full height
    width: "100%",
    zIndex: -2, // Full width
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

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onStateChange = (event) => {
    console.log("Player state changed:", event.data);
    if (event.data === YouTube.PlayerState.ENDED) {
      player.playVideo();
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      console.log("Video is now playing.");
      setVideoLoaded(true);
    }
  };

  useEffect(() => {
    if (player && videoId) {
      player.loadVideoById(videoId);
    }
  }, [videoId]);

  const handleToggleSound = () => {
    if (player) {
      const currentVolume = player.isMuted();
      if (currentVolume) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };
  console.log("video", videoLoaded);

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: -55,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: videoLoaded ? -1 : -3,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "116vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100px",
            backgroundColor: "rgba(0, 0, 0, 1)",
            top: 690,
            left: 0,
            zIndex: 1,
          }}
        />

        <YouTube
          videoId={videoId}
          opts={opts}
          onStateChange={onStateChange}
          onReady={onReady}
        />
      </Box>

      <IconButton
        sx={{
          position: "absolute",
          top: 400,
          left: 1250,
          height: 35,
          width: 35,
          zIndex: videoLoaded ? 0 : -3,
          backgroundColor: " rgba(255,255,255,0.1)",
          "&:hover": {
            backgroundColor: " rgba(255,255,255,0.2)",
          },
        }}
        onClick={handleToggleSound}
      >
        {isMuted ? (
          <img
            src={mute}
            alt="mute"
            style={{
              height: 20,
              borderRadius: "50%",
            }}
          />
        ) : (
          <img
            src={sound}
            alt="sound"
            style={{
              height: 20,
              borderRadius: "50%",
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default YouTubePlayer;
