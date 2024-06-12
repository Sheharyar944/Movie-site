import React, { useState, useEffect, useRef } from "react";
import MovieLists from "../components/MovieLists";
import { Box, Button, Typography } from "@mui/material";
import TrendingMovie from "../components/TrendingMovie";
import SlideShow from "../components/SlideShow";
import play from "../assets/play.png";
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
    <Box
      // border={1}
      sx={{ marginBottom: "11vh" }}
    >
      <Button
        onClick={() => navigate(`/watch/movie/${nowPlayingMovie.id}`)}
        startIcon={<img src={play} alt="play" style={{ height: "1.3vw" }} />}
        variant="contained"
        sx={{
          width: "11.5vw",
          height: "6vh",
          marginRight: "0.7vw",
          textTransform: "none",
          backgroundColor: "#00c1db",
          borderRadius: "0.7vw",
          color: "black",
          "&:hover": {
            backgroundColor: "#009aaf",
          },
        }}
      >
        <Typography
          variant="body1"
          color="rgba(0,0,0,0.8)"
          sx={{ fontWeight: "bold", fontSize: "1.2vw" }}
        >
          Play Now
        </Typography>
      </Button>
      <Button
        onClick={() => navigate(`/info/movie/${nowPlayingMovie.id}`)}
        startIcon={
          <img src={whiteinfo} alt="info" style={{ height: "1.6vw" }} />
        }
        variant="contained"
        sx={{
          width: "11.5vw",
          height: "6vh",
          textTransform: "none",
          backgroundColor: "rgba(87, 76, 88, 0.6)",
          borderRadius: "0.7vw",
          // opacity: "0.6",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(52, 46, 53, 0.6)",
          },
        }}
      >
        <Typography
          variant="body1"
          color="rgba(255,255,255,0.8)"
          sx={{ fontWeight: "bold", fontSize: "1.2vw" }}
        >
          More Info
        </Typography>
      </Button>
    </Box>
  );

  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${nowPlayingMovie.backdrop_path}`;

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
          height: "100vh",
          width: "100%",
          zIndex: -1,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0,0.5)",
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
      <Box sx={{ padding: "0 5.1vw 0 5.1vw" }}>
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
