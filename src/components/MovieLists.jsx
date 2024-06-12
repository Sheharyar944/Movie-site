import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import movie from "../assets/movie.png";
import shine from "../assets/shine.png";
import rightVector from "../assets/rightVector.png";
import tv from "../assets/tv.png";
import MyIcon from "./MyIcon";
import starGold from "../assets/starGold.png";
import { useNavigate } from "react-router-dom";
import circle from "../assets/circle.png";
import play from "../assets/play.png";

const MovieLists = () => {
  const { getMovieList } = useGetMovieLists();
  const [nowPlaying, setNowPlaying] = useState("");
  const [trendingMovies, setTrendingMovies] = useState("");
  const [trendingTvShows, setTrendingTvShows] = useState("");
  const [popularTvShows, setPopularTvShows] = useState("");
  const navigate = useNavigate();

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      setNowPlaying
    );
    getList(
      "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
      setTrendingMovies
    );
    getList(
      "https://api.themoviedb.org/3/trending/tv/week?language=en-US",
      setTrendingTvShows
    );
    getList(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      setPopularTvShows
    );
  }, []);

  const Lists = ({ list, mediaType }) => (
    <Box
      border={1}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridAutoRows: "auto",
        gap: "1.8vh",
        width: "63.6vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {Array.isArray(list.results) &&
        list.results.slice(0, 18).map((item, index) => (
          <Box key={index}>
            <Button
              disableRipple
              onClick={() => navigate(`/info/${mediaType}/${item.id}`)}
              sx={{
                padding: 0,
                borderRadius: "0.6vw",
                height: "31.8vh",
                width: "9.5vw",
                position: "relative",
                textTransform: "none",
                transition: "0.5s ease",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "0.6vw",
                  opacity: 1,
                  transition: "transform 0.3s ease",
                },
                "&:hover::before": {
                  transform: "scale(1.05)",
                },
                "& img": {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                },
                "&:hover img": {
                  opacity: 1,
                  zIndex: 100,
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
                "& .hoverBox": {
                  opacity: 0,
                },
                "&:hover .hoverBox": {
                  opacity: 1,
                },
              }}
            >
              <Box
                className="hoverBox"
                sx={{
                  position: "absolute",
                  height: "31.8vh",
                  width: "9.9vw",
                  top: 0,
                  left: 0,
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))",
                  borderRadius: "0.6vw",
                  zIndex: 0,
                }}
              />
              <img
                src={circle}
                alt="circled play"
                style={{
                  height: 40,
                }}
              />
              <img
                src={play}
                alt="circled play"
                style={{
                  height: 16,
                }}
              />
              <Box
                // border={1}
                sx={{
                  position: "absolute",
                  top: "0.6vh",
                  right: 0,
                  height: "3.1vh",
                  width: "2.9vw",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0,0.6)",
                  borderTopLeftRadius: "0.3vw",
                  borderBottomLeftRadius: "0.3vw",
                }}
              >
                <Box
                  // border={1}
                  sx={{
                    position: "relative",
                    height: "3.1vh",
                    width: "3.1vh",
                    diplay: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={starGold}
                    alt="star"
                    style={{
                      height: "0.9vw",
                      padding: 0,
                      opacity: 1,
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{ fontSize: "0.9vw" }}
                >
                  {item.vote_average.toFixed(1)}
                </Typography>
              </Box>
              <Box
                // border={1}
                className="hoverBox"
                sx={{
                  position: "absolute",
                  width: "9.3vw",
                  paddingBottom: "0.8vh",
                  zIndex: 1,
                  bottom: 0,
                }}
              >
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    fontSize: "0.9vw",
                    opacity: "0.8",
                    textAlign: "center",
                    fontWeight: 100,
                  }}
                >
                  {item &&
                    (item.release_date || item.first_air_date) &&
                    (item.release_date || item.first_air_date).split("-")[0]}
                  <span style={{ verticalAlign: "middle", margin: "0 0.3vw" }}>
                    •
                  </span>
                  {item && item.original_language.toUpperCase()}
                  <span style={{ verticalAlign: "middle", margin: "0 0.3vw" }}>
                    •
                  </span>
                  HD
                </Typography>

                <Typography
                  variant="body1"
                  color="#FFFFFF"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    opacity: "1",
                    fontWeight: 600,
                    fontSize: "1vw",
                    // letterSpacing: "1px",
                    textAlign: "center",

                    // whiteSpace: "nowrap",
                  }}
                >
                  {item.title || item.name}
                </Typography>
              </Box>
            </Button>
          </Box>
        ))}
    </Box>
  );

  const SideList = ({ list, mediaType }) => (
    <Box
      //  border={1}
      sx={{ height: "100vh" }}
    >
      {list &&
        list.results.slice(0, 10).map((movie, index) => (
          <Box key={index}>
            <Button
              onClick={() => navigate(`info/${mediaType}/${movie.id}`)}
              sx={{
                padding: "0px",
                marginBottom: "1.1vh",
                width: "23.4vw",
                height: "9vh",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                backgroundColor: "#131416",
                borderRadius: "0.6vw",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <img
                style={{
                  borderRadius: "0.6vw",
                  width: "3.66vw",
                  height: "9vh",
                }}
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={`Movie Poster:${movie.original_title}`}
              />
              <Box
                // border={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "23.4vw",
                  height: "9vh",
                  padding: "10px",
                  marginRight: "auto",
                  borderColor: "white",
                }}
              >
                <Typography
                  sx={{
                    padding: "0px",
                    fontSize: "1vw",
                    fontWeight: 500,
                    textAlign: "left",
                    letterSpacing: "1px",
                    opacity: "0.99",
                  }}
                  variant="body1"
                  color="#fbfafb"
                >
                  {" "}
                  {movie.title || movie.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    marginTop: "0.6vh",
                    padding: "0px",
                    fontSize: "0.9vw",
                    opacity: "0.6",
                    fontWeight: 100,
                  }}
                >
                  {movie.release_date || movie.first_air_date}
                  <span style={{ verticalAlign: "middle", margin: "0 0.3vw" }}>
                    •
                  </span>
                  {movie.original_language.toUpperCase()}
                  <span style={{ verticalAlign: "middle", margin: "0 0.3vw" }}>
                    •
                  </span>
                  HD
                </Typography>
              </Box>
            </Button>
          </Box>
        ))}
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box>
          <Box
            // border={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderColor: "white",
              alignItems: "center",
            }}
          >
            <MyIcon img={movie} alt="movie" text="MOVIES" />

            <Button
              onClick={() => navigate("/explore?type=movie")}
              variant="text"
              sx={{
                color: "#fbfafb",
                textTransform: "none",
                height: "3vh",
                mt: "6vh",
                opacity: 0.8,
              }}
              endIcon={
                <img
                  src={rightVector}
                  alt="arrow icon"
                  style={{ height: "1.8vh", transform: "rotate(-45deg)" }}
                />
              }
            >
              {" "}
              View All
            </Button>
          </Box>
          <Lists list={trendingMovies} mediaType={"movie"} />
        </Box>
        <Box sx={{ marginLeft: "24px" }}>
          <MyIcon img={shine} alt="movie" text="Top Movies" />
          <SideList list={nowPlaying} mediaType={"movie"} />
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MyIcon img={tv} alt="movie" text="TV SHOWS" />
            <Button
              onClick={() => navigate("/explore?type=tv")}
              variant="text"
              sx={{
                color: "#fbfafb",
                textTransform: "none",
                height: "3vh",
                mt: "6vh",
                opacity: 0.8,
              }}
              endIcon={
                <img
                  src={rightVector}
                  alt="arrow icon"
                  style={{ height: "1.8vh", transform: "rotate(-45deg)" }}
                />
              }
            >
              {" "}
              View All
            </Button>
          </Box>
          <Lists list={trendingTvShows} mediaType={"tv"} />
        </Box>
        <Box sx={{ marginLeft: "24px" }}>
          <MyIcon img={shine} alt="movie" text="Popular shows" />
          <SideList list={popularTvShows} mediaType={"tv"} />
        </Box>
      </Box>
    </Box>
  );
};

export default MovieLists;
