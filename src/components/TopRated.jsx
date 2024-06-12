import React, { useState, useEffect, useRef } from "react";
import useGetMovieLists from "../hooks/useGetMovieLists";
import star from "../assets/star.png";
import play from "../assets/play.png";
import whiteinfo from "../assets/whiteinfo.png";
import blackStar from "../assets/blackStar.png";
import MyIcon from "./MyIcon";
import { Box, Button, IconButton, Typography } from "@mui/material";
import leftArrow from "../assets/leftArrow.png";
import leftArrowCyan from "../assets/leftArrowCyan.png";
import rightArrow from "../assets/rightArrow.png";
import rightArrowCyan from "../assets/rightArrowCyan.png";

import { useNavigate } from "react-router-dom";

const TopRated = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [topRated, setTopRated] = useState("");
  const { getMovieList } = useGetMovieLists();
  const [checked, setChecked] = useState(true);
  const [position, setPosition] = useState(0);
  const [itemShowing, setItemShowing] = useState(0);
  const [windowPosition, setWindowPosition] = useState(0);

  const navigate = useNavigate();

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex === -93 * 19 ? 0 : prevIndex - 93));
      setItemShowing((prev) => (prev === 19 ? 0 : prev + 1));
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [index]);

  useEffect(() => {
    if (itemShowing - 7 >= windowPosition) {
      const diff = 20 - itemShowing;
      if (diff > 7) {
        setPosition((prev) => prev - 13.2 * 7);
        setWindowPosition((prev) => prev + 7);
      } else {
        setPosition((prev) => prev - 13.2 * diff);
        setWindowPosition((prev) => prev + diff);
      }
    } else if (itemShowing < windowPosition) {
      const diff = windowPosition - itemShowing;
      setPosition((prev) => prev + 13.2 * diff);
      setWindowPosition((prev) => prev - diff);
    }
  }, [index]);

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    if (checked) {
      getList(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        setTopRated
      );
    } else {
      getList(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        setTopRated
      );
    }
  }, [checked]);

  const WatchNowAndMore = ({ id }) => (
    <Box
      // border={1}

      sx={{ marginBottom: "70px" }}
    >
      <Button
        onClick={() => navigate(`/watch/${checked ? "tv" : "movie"}/${id}`)}
        startIcon={<img src={play} alt="play" style={{ height: "3vh" }} />}
        variant="contained"
        sx={{
          width: "12.8vw",
          height: "6vh",
          marginRight: "0.9vw",
          textTransform: "none",
          backgroundColor: "#00c1db",
          borderRadius: "100vh",
          fontSize: "2.4vh",
          fontWeight: "bold",
          color: "rgba(0,0,0,0.8)",
          "&:hover": {
            backgroundColor: "#009aaf",
          },
        }}
      >
        {`Watch Now`}
      </Button>
      <Button
        onClick={() => navigate(`/info/${checked ? "tv" : "movie"}/${id}`)}
        startIcon={
          <img src={whiteinfo} alt="info" style={{ height: "3.5vh" }} />
        }
        variant="contained"
        sx={{
          width: "12.8vw",
          height: "6vh",
          textTransform: "none",
          backgroundColor: "rgba(87, 76, 88, 0.6)",
          borderRadius: "100vh",
          // opacity: "0.6",
          fontSize: "2.4vh",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "rgba(52, 46, 53, 0.6)",
          },
        }}
      >
        Details
      </Button>
    </Box>
  );

  const TopRatedAndToggle = () => (
    <Box
      // border={1}
      sx={{
        margin: "0px 5.1vw",
        position: "relative",
        borderColor: "white",
      }}
    >
      <Box
        // border={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderColor: "white",
        }}
      >
        <MyIcon img={blackStar} alt="fire" text="Top Rated" />

        <Box sx={{ marginTop: "50px", display: "flex", gap: "10px" }}>
          {checked ? (
            <Button
              onClick={() => setChecked(false)}
              variant="outlined"
              sx={{
                height: "6vh",
                width: "8.6vw",
                color: "#fbfafb",
                borderRadius: "100vh",
                borderColor: "#fbfafb",
                fontSize: "2.2vh",
              }}
            >
              {" "}
              Movies
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                height: "6vh",
                width: "8.6vw",
                color: "#fbfafb",
                borderRadius: "100vh",
                borderColor: "#fbfafb",
                fontSize: "2.2vh",
              }}
            >
              {" "}
              Movies
            </Button>
          )}

          {checked ? (
            <Button
              variant="contained"
              sx={{
                height: "6vh",
                width: "8.6vw",
                borderRadius: "100vh",
                color: "#fbfafb",
                borderColor: "#fbfafb",
                fontSize: "2.2vh",
              }}
            >
              Tv Shows
            </Button>
          ) : (
            <Button
              onClick={() => setChecked(true)}
              variant="outlined"
              sx={{
                height: "6vh",
                width: "8.6vw",
                borderRadius: "100vh",
                color: "#fbfafb",
                borderColor: "#fbfafb",
                fontSize: "2.2vh",
              }}
            >
              Tv Shows
            </Button>
          )}
        </Box>
      </Box>
      <Typography
        variant="body1"
        color="#fbfafb"
        sx={{
          fontSize: "2.2vh",
          position: "absolute",
          bottom: -4,
          opacity: 0.7,
        }}
      >
        Movies and TV Series highly rated by users
      </Typography>
    </Box>
  );

  const handleLeftArrow = (event) => {
    if (position !== 0) {
      setPosition((prev) => prev + 13.2);
      setWindowPosition((prev) => prev - 1);
    }
  };
  const handleRightArrow = (event) => {
    if (position !== -13.2 * 13) {
      setPosition((prev) => prev - 13.2);
      setWindowPosition((prev) => prev + 1);
    }
  };

  const handlePosterClick = (index) => {
    setIndex(index * -1260);
  };

  return (
    <Box
      // border={1}
      sx={{ height: "141vh", position: "relative", borderColor: "white" }}
    >
      <TopRatedAndToggle />
      <IconButton
        onClick={handleLeftArrow}
        disabled={position === 0}
        sx={{
          height: "41vh",
          width: "5vw",
          position: "absolute",
          borderRadius: "10px",
          backgroundImage:
            "linear-gradient(to left, rgba(2,2,8,0),  rgba(2,2,8,0.7))",
          top: "98vh",
          left: "3.6vw",
          zIndex: 2,
          "& img": {
            opacity: 0,
            transition: "opacity 0.3 ease",
          },
          "&:hover img": {
            opacity: 1,
          },
        }}
        disableRipple
      >
        <img
          src={leftArrow}
          alt="left arrow icon"
          style={{ height: "30px", opacity: 1, position: "absolute" }}
        />
        <img
          src={leftArrowCyan}
          alt="left arrow icon"
          style={{ height: "30px", position: "absolute", zIndex: 5 }}
        />
      </IconButton>
      <IconButton
        onClick={handleRightArrow}
        disabled={position === -180.5 * 13}
        sx={{
          position: "absolute",
          borderRadius: "10px",
          height: "41vh",
          width: "5vw",
          top: "98vh",
          right: "3.6vw",
          zIndex: 2,
          backgroundImage:
            "linear-gradient(to right, rgba(2,2,8,0),  rgba(2,2,8,0.7))",
          "& img": {
            opacity: 0,
            transition: "opacity 0.3 ease",
          },
          "&:hover img": {
            opacity: 1,
          },
        }}
        disableRipple
      >
        <img
          src={rightArrow}
          alt="info"
          style={{ height: "30px", opacity: 1 }}
        />
        <img
          src={leftArrowCyan}
          alt="info"
          style={{
            height: "30px",
            transform: "rotate(180deg)",
            position: "absolute",
          }}
        />
      </IconButton>
      <Box
        // border={1}
        sx={{
          overflow: "hidden",
          maxWidth: "92vw",
          height: "41vh",
          position: "absolute",
          borderRadius: "10px",
          borderColor: "white",
          top: "98vh",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <Box
          // border={1}
          sx={{
            transform: `translate3d(${position}vw, 0, 0)`,
            whiteSpace: "nowrap",
            transition: "ease 1000ms",
            borderRadius: "50px",
            width: "100vw",
            borderColor: "white",
          }}
        >
          {topRated &&
            topRated.results.map((item, i) => (
              <Button
                key={i}
                // border={1}
                onClick={() => {
                  setIndex(i * -93), setItemShowing(i);
                }}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  height: "41vh",
                  width: "12.6vw",
                  marginRight: "0.6vw",
                  borderRadius: "10px",
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!(i * -93 === index) && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "12.6vw",
                      height: "41vh",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: "10px",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </Button>
            ))}
        </Box>
      </Box>

      <Box
        // border={1}
        //   className="slideshow"
        sx={{
          borderRadius: "20px",
          // margin: "1.8vh 3.8vw",
          mt: "1.8vh",
          overflow: "hidden",
          maxWidth: "92vw",
          borderColor: "white",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <Box
          // className="slideshowSlider"
          sx={{
            transform: `translate3d(${index}vw, 0, 0)`,
            whiteSpace: "nowrap",
            transition: "ease 1000ms",
            borderRadius: "50px",
          }}
        >
          {topRated &&
            topRated.results.map((item, index) => (
              <Box
                // border={1}
                key={index}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  height: "110vh",
                  width: "92vw",
                  marginRight: "1vw",
                  borderColor: "white",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(80px)",
                    zIndex: 0,
                  }}
                />
                <Box
                  // border={1}
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "110vh",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    filter: "blur(100px)",
                    left: "50%",
                    transform: "translate(-50%)",
                    borderColor: "white",
                  }}
                />
                <Box
                  // border={1}
                  sx={{
                    width: "38vw",
                    height: "51vh",
                    position: "absolute",
                    left: "7.3vw",
                    top: "13vh",
                  }}
                >
                  <Box
                    // border={1}
                    sx={{
                      padding: "5vh 0.7vw",
                      width: "32vw",
                      height: "50vh",
                    }}
                  >
                    <Box
                      // border={1}
                      sx={{ width: "22vw" }}
                    >
                      <Typography
                        // variant="h4"
                        color="#fbfafb"
                        sx={{
                          textWrap: "wrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          fontSize: "2.5vw",
                          fontWeight: "600",
                        }}
                      >
                        {item.title || item.name}
                      </Typography>
                    </Box>
                    <Box
                      // border={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "3vh 0px",
                      }}
                    >
                      <img
                        src={star}
                        alt="star"
                        style={{
                          height: "2vh",
                          paddingBottom: "0.2vh",
                          paddingRight: "0.15vw",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ marginRight: "1.1vw", fontSize: "0.9vw" }}
                      >
                        {item && item.vote_average.toFixed(1)}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ marginRight: "1.1vw", fontSize: "0.9vw" }}
                      >
                        {item.release_date || item.first_air_date}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ marginRight: "1.1vw", fontSize: "0.9vw" }}
                      >
                        {item && item.original_language.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ fontSize: "0.9vw" }}
                      >
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
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        textWrap: "wrap",
                        fontSize: "0.9vw",
                        marginBottom: "3vh",
                        fontFamily: "",
                        letterSpacing: "0.1vh",
                      }}
                    >
                      {item.overview}
                    </Typography>
                    <WatchNowAndMore id={item.id} />
                  </Box>
                </Box>
                <Box
                  // border={1}
                  sx={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "38vw",
                    height: "51vh",
                    position: "absolute",
                    borderRadius: "20px",
                    right: "7.3vw",
                    top: "13vh",
                  }}
                >
                  {" "}
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TopRated;
