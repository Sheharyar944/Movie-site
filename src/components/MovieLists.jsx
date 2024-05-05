import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetMovieLists from "../hooks/useGetMovieLists";
import movie1 from "../assets/movie1.png";
import flashy from "../assets/flashy.png";
import tv from "../assets/tv.png";
import MyIcon from "./MyIcon";

const MovieLists = () => {
  const { getMovieList } = useGetMovieLists();
  const [nowPlaying, setNowPlaying] = useState("");
  const [popular, setPopular] = useState("");
  const [topRated, setTopRated] = useState("");
  const [upcoming, setUpcoming] = useState("");
  const [trendingMovies, setTrendingMovies] = useState("");
  const [trendingTvShows, setTrendingTvShows] = useState("");
  const [airingToday, setAiringToday] = useState("");
  const [onTheAir, setOnTheAir] = useState("");
  const [popularTvShows, setPopularTvShows] = useState("");

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      setPopular
    );
    getList(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      setNowPlaying
    );
    getList(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      setTopRated
    );
    getList(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      setUpcoming
    );
    getList(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      setTrendingMovies
    );
    getList(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
      setTrendingTvShows
    );

    getList(
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
      setAiringToday
    );

    getList(
      "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
      setOnTheAir
    );

    getList(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      setPopularTvShows
    );
  }, []);

  const Lists = ({ list }) => (
    <Box
      border={1}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)", // 6 columns
        gridAutoRows: "auto", // Auto height rows
        gap: "10px",
        width: "870px",
        height: "650px",
        overflow: "hidden",
      }}
    >
      {Array.isArray(list.results) &&
        list.results.slice(0, 18).map((item, index) => (
          <Box key={index}>
            <Button sx={{ padding: 0, borderRadius: "10px" }}>
              {item.poster_path && (
                <img
                  style={{ borderRadius: "10px", width: 135, height: 202 }}
                  src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                  alt={`Movie Poster:${item.title || item.name}`}
                />
              )}
            </Button>
            {/* <Box
              border={1}
              sx={{
                width: 185,
              }}
            >
              <Button
                variant="text"
                sx={{
                  width: "100%",
                  padding: 0,
                  padding: "5px 0px",
                  color: "black",
                  "&:hover": {
                    color: "blue",
                    backgroundColor: "white",
                  },
                }}
              >
                {" "}
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.original_title}
                </Typography>
              </Button>
            </Box> */}
          </Box>
        ))}
    </Box>
  );

  const SideList = ({ list }) => (
    <Box border={1} sx={{ height: "650px" }}>
      {list &&
        list.results.slice(0, 8).map((movie, index) => (
          <Box key={index}>
            <Button
              sx={{
                padding: "0px",
                marginBottom: "7px",
                width: "320px",
                height: "74px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                backgroundColor: "#18191b",
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2f3032",
                },
              }}
            >
              <img
                style={{ borderRadius: "10px", width: 50, height: 74 }}
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={`Movie Poster:${movie.original_title}`}
              />
              <Box
                // border={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "270px",
                  padding: "10px",
                  marginRight: "auto",
                }}
              >
                <Typography
                  sx={{
                    padding: "0px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                  variant="body1"
                  color="#fbfafb"
                >
                  {" "}
                  {movie.title || movie.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    marginTop: "4px",
                    padding: "0px",
                    fontSize: "12px",
                  }}
                >
                  {movie.release_date || movie.first_air_date}
                  <span style={{ verticalAlign: "middle", margin: "0 5px" }}>
                    •
                  </span>
                  {movie.original_language.toUpperCase()}
                </Typography>
              </Box>
            </Button>
          </Box>
        ))}
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box>
          <MyIcon img={movie1} alt="movie" text="MOVIES" />
          <Lists list={trendingMovies} />
        </Box>
        <Box sx={{ marginLeft: "24px" }}>
          <MyIcon img={flashy} alt="movie" text="Top Movies" />

          <SideList list={nowPlaying} />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box>
          <MyIcon img={tv} alt="movie" text="TV SHOWS" />

          <Lists list={trendingTvShows} />
        </Box>
        <Box sx={{ marginLeft: "24px" }}>
          <MyIcon img={flashy} alt="movie" text="Popular shows" />

          <SideList list={popularTvShows} />
        </Box>
      </Box>

      <Typography variant="h5" color="#F0F0F0">
        Now Playing
      </Typography>

      <Lists list={nowPlaying} />
      <Typography variant="h5" color="#F0F0F0">
        Popular
      </Typography>
      <Lists list={popular} />
      <Typography variant="h5" color="#F0F0F0">
        Top Rated
      </Typography>
      <Lists list={topRated} />
      <Typography variant="h5" color="#F0F0F0">
        Upcoming
      </Typography>
      <Lists list={upcoming} />
    </Box>
  );
};

export default MovieLists;
