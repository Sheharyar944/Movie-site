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
      //   border={1}
      sx={{
        width: "600px",
        height: "120px",
        marginTop: "180px",
        marginBottom: "32px",
        // position: "absolute",
      }}
    >
      <Typography variant="h4" color="#fbfafb">
        {nowPlayingMovie.title || nowPlayingMovie.name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", margin: "10px 0px" }}>
        <img
          src={star}
          alt="star"
          style={{ height: "16px", paddingBottom: "3px", paddingRight: "2px" }}
        />
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{ marginRight: "15px" }}
        >
          {nowPlayingMovie && nowPlayingMovie.vote_average.toFixed(1)}
        </Typography>
        <img
          src={date}
          alt="date"
          style={{ height: "16px", paddingRight: "5px" }}
        />
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{ marginRight: "15px" }}
        >
          {nowPlayingMovie.release_date}
        </Typography>
        <Typography variant="body1" color="#fbfafb">
          {nowPlayingMovie && nowPlayingMovie.original_language.toUpperCase()}
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
        }}
      >
        {nowPlayingMovie.overview}
      </Typography>
    </Box>
  );
};

export default nowPlayingMovie;
