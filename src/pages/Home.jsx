import React, { useState, useEffect } from "react";
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
import ReactPlayer from "react-player";
import useGetMovieLists from "../hooks/useGetMovieLists";
import YouTubePlayer from "../components/YouTubePlayer";

const Home = () => {
  const navigate = useNavigate();
  const { getMovieList } = useGetMovieLists();
  const { nowPlayingMovie } = useGetTrending();
  const [movieTrailer, setMovieTrailer] = useState("");

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    if (nowPlayingMovie) {
      getList(
        `https://api.themoviedb.org/3/movie/${nowPlayingMovie.id}/videos?language=en-US`,
        setMovieTrailer
      );
    }
  }, [nowPlayingMovie]);

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
        onClick={() => navigate(`/info/movie/${trendingMovie.id}`)}
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
  //   movieTrailer.results.reduce((item) =>
  //     item && item.name === "Official Trailer" ? item.key : null
  //   );

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

  console.log("trailer", trailer);

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
          zIndex: -9999,
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
        // <Box
        //   border={1}
        //   sx={{
        //     position: "absolute",
        //     width: "100%",
        //     height: "100%",
        //     top: 0,
        //     left: 0,
        //     zIndex: -2,
        //     overflow: "hidden",
        //   }}
        // >
        //   <ReactPlayer
        //     url={`https://www.youtube.com/embed/${trailer}`}
        //     controls={false}
        //     playing={true}
        //     muted={true}
        //     width="100vw"
        //     height="100vh"
        //     style={{
        //       // position: "absolute",
        //       // top: "0",
        //       // left: "0",
        //       zIndex: -2,
        //       objectFit: "cover",
        //     }}
        //     // config={{
        //     //   youtube: {
        //     //     playerVars: {
        //     //       autoplay: 1, // Auto-play the video
        //     //       fs: 1, // Show fullscreen button
        //     //     },
        //     //   },
        //     // }}
        //   />
        // </Box>
        <Box
          // border={1}
          sx={{
            position: "absolute",
            top: -52,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: -1,
            // overflow: "hidden",
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
            }}
          />

          <YouTubePlayer videoId={trailer} />
        </Box>
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
