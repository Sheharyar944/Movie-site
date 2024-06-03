import React, { useState, useEffect } from "react";
import useGetMovieLists from "./useGetMovieLists";

const useGetTrending = () => {
  const { getMovieList } = useGetMovieLists();
  const [trending, setTrending] = useState("");
  const [nowPlayingMovies, setNowPlayingMovies] = useState("");
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % 20);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const nowPlayingMovie =
    nowPlayingMovies && nowPlayingMovies.results[currentMovieIndex];

  return { trending, nowPlayingMovie, nowPlayingMovies };
};

export default useGetTrending;
