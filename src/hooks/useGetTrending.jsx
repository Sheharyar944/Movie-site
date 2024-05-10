import React, { useState, useEffect } from "react";
import useGetMovieLists from "./useGetMovieLists";

const useGetTrending = () => {
  const { getMovieList } = useGetMovieLists();
  const [trending, setTrending] = useState("");
  const [nowPlayingMovies, setNowPlayingMovies] = useState("");

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      setTrending
    );
    getList(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      setNowPlayingMovies
    );
  }, []);

  const nowPlayingMovie =
    nowPlayingMovies &&
    nowPlayingMovies.results.reduce((prev, current) =>
      prev.popularity > current.popularity ? prev : current
    );

  return { trending, nowPlayingMovie };
};

export default useGetTrending;
