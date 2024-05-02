import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetMovieLists from "../hooks/useGetMovieLists";

const MovieLists = () => {
  const { getMovieList } = useGetMovieLists();
  const [nowPlaying, setNowPlaying] = useState("");
  const [popular, setPopular] = useState("");
  const [topRated, setTopRated] = useState("");
  const [upcoming, setUpcoming] = useState("");

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
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
  }, []);

  const Lists = ({ list }) => (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {Array.isArray(list.results) &&
        list.results.map((item, index) => (
          <Box key={index} margin={1}>
            <Button sx={{ padding: 0, borderRadius: "10px" }}>
              {item.poster_path && (
                <img
                  style={{ borderRadius: "10px", width: 185, height: 278 }}
                  src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                  alt={`Movie Poster:${item.original_title}`}
                />
              )}
            </Button>
            <Box
              // border={1}
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
            </Box>
          </Box>
        ))}
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" color="white">
        Now Playing
      </Typography>
      {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {Array.isArray(nowPlaying.results) &&
          nowPlaying.results.map((item, index) => (
            <Box key={index} margin={1}>
              <Button sx={{ padding: 0, borderRadius: "10px" }}>
                {item.poster_path && (
                  <img
                    style={{ borderRadius: "10px", width: 185, height: 278 }}
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    alt={`Movie Poster:${item.original_title}`}
                  />
                )}
              </Button>
              <Box
                sx={{
                  width: 185,
                  // textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <Button
                  variant="text"
                  sx={{
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
                  {item.original_title}
                </Button>
              </Box>
            </Box>
          ))}
      </Box> */}
      <Lists list={nowPlaying} />
      <Typography variant="h5" color="#F0F0F0">
        Popular
      </Typography>
      <Lists list={popular} />
      <Typography variant="h5" color="white">
        Top Rated
      </Typography>
      <Lists list={topRated} />
      <Typography variant="h5" color="white">
        Upcoming
      </Typography>
      <Lists list={upcoming} />
    </Box>
  );
};

export default MovieLists;
