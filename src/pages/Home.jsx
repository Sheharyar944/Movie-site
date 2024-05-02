import React from "react";
import MovieLists from "../components/MovieLists";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <MovieLists />
    </Box>
  );
};

export default Home;
