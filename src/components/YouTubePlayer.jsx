import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import mute from "../assets/mute.png";
import sound from "../assets/sound.png";

const YouTubePlayer = ({ videoId, videoLoaded, setVideoLoaded }) => {
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const calculateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const width = screenWidth * 1.4;
      const height = screenHeight * 1.4;
      setVideoDimensions({ width, height });
    };

    calculateDimensions();

    window.addEventListener("resize", calculateDimensions);
    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, []);

  console.log("video dim", videoDimensions.height);

  const opts = {
    height: `${videoDimensions.height}px`, // Full height
    width: `${videoDimensions.width}px`,
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
    if (event.data === YouTube.PlayerState.ENDED) {
      player.playVideo();
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      setVideoLoaded(true);
    }
  };

  useEffect(() => {
    if (player && videoId) {
      try {
        player.loadVideoById(videoId);
      } catch (error) {
        console.error("Failed to load video:", error);
      }
    }
  }, [videoId, player]);

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

  return (
    <Box>
      <Box
        // border={1}
        sx={{
          borderColor: "white",
          position: "absolute",
          top: "-19vh",
          left: 0,
          width: "100%",
          height: "130vh",
          zIndex: videoLoaded ? -1 : -3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
        <Box
          // border={1}
          sx={{
            borderColor: "white",
            position: "absolute",
            width: "100%",
            height: "16vh",
            backgroundColor: "rgba(0, 0, 0, 1)",
            top: "119vh",
            left: 0,
            zIndex: 2,
          }}
        />

        <YouTube
          videoId={videoId}
          opts={opts}
          onStateChange={onStateChange}
          onReady={onReady}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Box>

      <IconButton
        sx={{
          position: "absolute",
          top: "63vh",
          left: "91.5vw",
          height: "2.5vw",
          width: "2.5vw",
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
              height: "1.5vw",
              borderRadius: "50%",
            }}
          />
        ) : (
          <img
            src={sound}
            alt="sound"
            style={{
              height: "1.5vw",
              borderRadius: "50%",
            }}
          />
        )}
      </IconButton>
    </Box>
  );
};

export default YouTubePlayer;
