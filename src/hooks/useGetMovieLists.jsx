import React, { useState } from "react";
import axios from "axios";

const useGetMovieLists = () => {
  const [loading, setLoading] = useState(true);
  const getMovieList = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDdmMzRlNzFiNDFmNWMzMmI3OWZhMWJjOTg2OGY5YiIsInN1YiI6IjY2MzIwNWZlZDE4NTcyMDEyODMzYjk4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o_9utK7I9KvmExJgdL4E3te1LkyqialtSC-S0KX3tqk",
        },
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { getMovieList, loading };
};

export default useGetMovieLists;
