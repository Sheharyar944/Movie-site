import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import date from "../assets/date.png";
import star from "../assets/star.png";
import useGetTrending from "../hooks/useGetTrending";
import { Box } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";

const nowPlayingMovie = () => {
  const { getMovieList } = useGetMovieLists();
  const { nowPlayingMovie } = useGetTrending();
  const [trendingList, setTrendingList] = useState("");

  return (
    <Box
      // border={1}
      sx={{
        width: "44vw",
        height: "19vh",
        marginTop: "28.3vh",
        marginBottom: "5vh",
        // position: "absolute",
      }}
    >
      <Typography
        variant="h4"
        color="#fbfafb"
        sx={{
          fontSize: "2.3vw",
          fontWeight: "bold",
        }}
      >
        {nowPlayingMovie.title || nowPlayingMovie.name}
      </Typography>
      <Box
        // border={1}
        sx={{ display: "flex", alignItems: "center", margin: "1.5vh 0px" }}
      >
        <img
          src={star}
          alt="star"
          style={{
            height: "1vw",
            marginBottom: "0.1vw",
            marginRight: "0.1vw",
          }}
        />
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{ marginRight: "1.1vw", fontSize: "0.9vw" }}
        >
          {nowPlayingMovie && nowPlayingMovie.vote_average.toFixed(1)}
        </Typography>
        <img
          src={date}
          alt="date"
          style={{ height: "1vw", marginRight: "0.3vw" }}
        />
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{ marginRight: "1.1vw", fontSize: "0.9vw" }}
        >
          {nowPlayingMovie.release_date}
        </Typography>
        <Typography variant="body1" color="#fbfafb" sx={{ fontSize: "0.9vw" }}>
          {nowPlayingMovie && nowPlayingMovie.original_language.toUpperCase()}
          <span
            style={{
              verticalAlign: "middle",
              margin: "0 5px",
              color: "fbfafb",
            }}
          >
            •
          </span>
          HD
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="#fbfafb"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          fontSize: "1.1vw",
        }}
      >
        {nowPlayingMovie.overview}
      </Typography>
    </Box>
  );
};

export default nowPlayingMovie;
