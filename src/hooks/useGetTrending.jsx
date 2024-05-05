import React, { useState, useEffect } from "react";
import useGetMovieLists from "./useGetMovieLists";

const useGetTrending = () => {
  const { getMovieList } = useGetMovieLists();
  const [trending, setTrending] = useState("");

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      setTrending
    );
  }, []);

  const trendingMovie =
    Array.isArray(trending.results) &&
    trending.results.reduce((prev, current) =>
      prev.popularity > current.popularity ? prev : current
    );

  return { trending, trendingMovie };
};

export default useGetTrending;
