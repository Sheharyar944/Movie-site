import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import useGetMovieLists from "../hooks/useGetMovieLists";
import { Box } from "@mui/material";
import date from "../assets/date.png";
import star from "../assets/star.png";
import useGetTrending from "../hooks/useGetTrending";

const TrendingMovie = () => {
  const { trendingMovie } = useGetTrending();

  console.log("trend", trendingMovie);
  return (
    <Box
      //   border={1}
      sx={{
        width: "600px",
        height: "120px",
        marginTop: "180px",
        marginBottom: "32px",
      }}
    >
      <Typography variant="h4" color="#fbfafb">
        {trendingMovie.original_title}
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
          {trendingMovie && trendingMovie.vote_average.toFixed(1)}
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
          {trendingMovie.release_date}
        </Typography>
        <Typography variant="body1" color="#fbfafb">
          {trendingMovie && trendingMovie.original_language.toUpperCase()}
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
        {trendingMovie.overview}
      </Typography>
    </Box>
  );
};

export default TrendingMovie;
