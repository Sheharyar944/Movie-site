import React, { useState, useEffect } from "react";
import MovieLists from "../components/MovieLists";
import { Box, Button, Typography } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import TrendingMovie from "../components/TrendingMovie";
import SlideShow from "../components/SlideShow";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import fire from "../assets/fire.png";
import fire1 from "../assets/fire1.png";
import fire2 from "../assets/fire2.png";
import movie from "../assets/movie.png";
import movie1 from "../assets/movie1.png";
import starblack1 from "../assets/starblack1.png";
import TopRated from "../components/TopRated";
import whiteinfo from "../assets/whiteinfo.png";
import MyIcon from "../components/MyIcon";
import useGetTrending from "../hooks/useGetTrending";

const Home = () => {
  const PlayAndMore = () => (
    <Box sx={{ marginBottom: "70px" }}>
      <Button
        startIcon={<PlayArrowIcon fontSize="large" />}
        variant="contained"
        sx={{
          width: "158px",
          height: "45px",
          marginRight: "10px",
          textTransform: "none",
          backgroundColor: "#00c1db",
          borderRadius: "10px",
          fontSize: "16px",

          color: "black",
          "&:hover": {
            backgroundColor: "#009aaf",
          },
        }}
      >
        {`Play Now`}
      </Button>
      <Button
        startIcon={
          <img src={whiteinfo} alt="info" style={{ height: "18px" }} />
        }
        variant="contained"
        sx={{
          width: "158px",
          height: "45px",
          textTransform: "none",
          backgroundColor: "rgba(87, 76, 88, 0.6)",
          borderRadius: "10px",
          // opacity: "0.6",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(52, 46, 53, 0.6)",
          },
        }}
      >
        More Info
      </Button>
    </Box>
  );

  const { trendingMovie } = useGetTrending();
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`;

  return (
    <Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          height: "635px",
          width: "100%",
          zIndex: -1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            background: "rgba(0, 0, 0, 0.4)",
            zindex: 0,
          },
        }}
      ></Box>
      <Box sx={{ padding: "0 70px 0 70px" }}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        />
        <TrendingMovie />
        <PlayAndMore />
        <MyIcon img={fire2} alt="fire" text="What's Trending Today" />
        <SlideShow />
        <MovieLists />
      </Box>

      <Box>
        <TopRated />
      </Box>
    </Box>
  );
};

export default Home;
