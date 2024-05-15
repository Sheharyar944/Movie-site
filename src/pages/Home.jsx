import React, { useState, useEffect, useRef } from "react";
import MovieLists from "../components/MovieLists";
import { Box, Button, Typography } from "@mui/material";
import TrendingMovie from "../components/TrendingMovie";
import SlideShow from "../components/SlideShow";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import fire2 from "../assets/fire2.png";
import TopRated from "../components/TopRated";
import whiteinfo from "../assets/whiteinfo.png";
import MyIcon from "../components/MyIcon";
import useGetTrending from "../hooks/useGetTrending";
import { useNavigate } from "react-router-dom";
import YouTubePlayer from "../components/YouTubePlayer";
import useGetMovieLists from "../hooks/useGetMovieLists";

const Home = () => {
  const navigate = useNavigate();
  const { getMovieList } = useGetMovieLists();
  const { nowPlayingMovie, nowPlayingMovies } = useGetTrending();
  const [movieTrailer, setMovieTrailer] = useState("");
  const [trailer, setTrailer] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  // const nowPlayingMovie = nowPlayingMovies && nowPlayingMovies.results[0];

  useEffect(() => {
    setVideoLoaded(false);
    if (nowPlayingMovie) {
      getList(
        `https://api.themoviedb.org/3/movie/${nowPlayingMovie.id}/videos?language=en-US`,
        setMovieTrailer
      );
    }
  }, [nowPlayingMovie]);

  useEffect(() => {
    if (movieTrailer !== "") {
      const trailer =
        movieTrailer &&
        movieTrailer.results.reduce((acc, item) => {
          const normalizedItemName = item.name.toLowerCase().replace(/\s/g, "");
          const normalizedSearchTerm = "officialtrailer";

          if (normalizedItemName === normalizedSearchTerm) {
            return item.key;
          }
          return acc;
        }, null);
      setTrailer(trailer);
    }
  }, [movieTrailer]);

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
        onClick={() => navigate(`/info/movie/${nowPlayingMovie.id}`)}
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

  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${nowPlayingMovie.backdrop_path}`;

  // const trailer =
  //   movieTrailer &&
  //   movieTrailer.results.reduce((acc, item) => {
  //     const normalizedItemName = item.name.toLowerCase().replace(/\s/g, "");
  //     const normalizedSearchTerm = "officialtrailer";

  //     if (normalizedItemName === normalizedSearchTerm) {
  //       return item.key;
  //     }
  //     return acc;
  //   }, null);

  console.log("trailer", trailer);
  console.log("now", nowPlayingMovie);

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
            background: "rgba(0, 0, 0,0.4)",
          },
        }}
      ></Box>
      {trailer !== null && (
        <YouTubePlayer
          videoId={trailer}
          videoLoaded={videoLoaded}
          setVideoLoaded={setVideoLoaded}
        />
      )}
      <Box sx={{ padding: "0 70px 0 70px" }}>
        {/* <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        /> */}
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
