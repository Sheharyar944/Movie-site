import React, { useEffect, useState } from "react";
import useGetMovieLists from "../hooks/useGetMovieLists";

const TrendingMovies = () => {
  const { getMovieList } = useGetMovieLists();
  const [movies, setMovies] = useState("");

  useEffect(() => {
    getMovieList(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      setMovies
    );
  }, []);
  return <div></div>;
};

export default TrendingMovies;
