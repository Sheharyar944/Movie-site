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
      setIndex((prevIndex) =>
        prevIndex === -1260 * 19 ? 0 : prevIndex - 1260
      );
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
        setPosition((prev) => prev - 180.5 * 7);
        setWindowPosition((prev) => prev + 7);
      } else {
        setPosition((prev) => prev - 180.5 * diff);
        setWindowPosition((prev) => prev + diff);
      }
    } else if (itemShowing < windowPosition) {
      const diff = windowPosition - itemShowing;
      setPosition((prev) => prev + 180.5 * diff);
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
    <Box sx={{ marginBottom: "70px" }}>
      <Button
        onClick={() => navigate(`/watch/${checked ? "tv" : "movie"}/${id}`)}
        startIcon={<img src={play} alt="play" style={{ height: 18 }} />}
        variant="contained"
        sx={{
          width: "176px",
          height: "45px",
          marginRight: "12px",
          textTransform: "none",
          backgroundColor: "#00c1db",
          borderRadius: "100px",
          fontSize: "16px",
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
          <img src={whiteinfo} alt="info" style={{ height: "20px" }} />
        }
        variant="contained"
        sx={{
          width: "176px",
          height: "45px",
          textTransform: "none",
          backgroundColor: "rgba(87, 76, 88, 0.6)",
          borderRadius: "100px",
          // opacity: "0.6",
          fontSize: "16px",
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
      sx={{
        margin: "0px 70px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MyIcon img={blackStar} alt="fire" text="Top Rated" />

        <Box sx={{ marginTop: "50px", display: "flex", gap: "10px" }}>
          {checked ? (
            <Button
              onClick={() => setChecked(false)}
              variant="outlined"
              sx={{
                height: "40px",
                width: "116px",
                color: "#fbfafb",
                borderRadius: "20px",
                borderColor: "#fbfafb",
              }}
            >
              {" "}
              Movies
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                height: "40px",
                width: "116px",
                color: "#fbfafb",
                borderRadius: "20px",
                borderColor: "#fbfafb",
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
                height: "40px",
                width: "116px",
                borderRadius: "20px",
                color: "#fbfafb",
                borderColor: "#fbfafb",
              }}
            >
              Tv Shows
            </Button>
          ) : (
            <Button
              onClick={() => setChecked(true)}
              variant="outlined"
              sx={{
                height: "40px",
                width: "116px",
                borderRadius: "20px",
                color: "#fbfafb",
                borderColor: "#fbfafb",
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
          fontSize: "14px",
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
      setPosition((prev) => prev + 180.5);
      setWindowPosition((prev) => prev - 1);
    }
  };
  const handleRightArrow = (event) => {
    if (position !== -180.5 * 13) {
      setPosition((prev) => prev - 180.5);
      setWindowPosition((prev) => prev + 1);
    }
  };

  const handlePosterClick = (index) => {
    setIndex(index * -1260);
  };

  return (
    <Box
      // border={1}
      sx={{ height: "900px", position: "relative" }}
    >
      <TopRatedAndToggle />
      <IconButton
        onClick={handleLeftArrow}
        disabled={position === 0}
        sx={{
          height: "258px",
          width: "5vw",
          position: "absolute",
          borderRadius: "10px",
          backgroundImage:
            "linear-gradient(to left, rgba(2,2,8,0),  rgba(2,2,8,0.7))",
          top: 620,
          left: 50,
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
          height: "258px",
          position: "absolute",
          borderRadius: "10px",
          width: "5vw",

          top: 620,
          left: 1244,
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
          maxWidth: "1256px",
          height: "258px",
          position: "absolute",
          borderRadius: "10px",
          borderColor: "white",
          top: 620,
          left: 52,
          zIndex: 1,
        }}
      >
        <Box
          // border={1}
          sx={{
            transform: `translate3d(${position}px, 0, 0)`,
            whiteSpace: "nowrap",
            transition: "ease 1000ms",
            borderRadius: "50px",
            width: "1260px",
          }}
        >
          {topRated &&
            topRated.results.map((item, i) => (
              <Button
                key={i}
                // border={1}
                onClick={() => {
                  setIndex(i * -1260), setItemShowing(i);
                }}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  height: "258px",
                  width: "172px",
                  marginRight: "8.5px",
                  borderRadius: "10px",
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.poster_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!(i * -1260 === index) && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "172px",
                      height: "258px",
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
          margin: "14px 52px",
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        <Box
          // className="slideshowSlider"
          sx={{
            transform: `translate3d(${index}px, 0, 0)`,
            whiteSpace: "nowrap",
            transition: "ease 1000ms",
            borderRadius: "50px",
          }}
        >
          {topRated &&
            topRated.results.map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  display: "inline-block",
                  height: "690px",
                  width: "1250px",
                  marginRight: "10px",
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
                  sx={{
                    position: "absolute",
                    width: "1260px",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    filter: "blur(100px)",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                />
                <Box
                  // border={1}
                  sx={{
                    width: "520px",
                    height: "326px",
                    position: "absolute",
                    left: 100,
                    top: 83,
                  }}
                >
                  <Box
                    //   border={1}
                    sx={{
                      padding: "30px 10px",
                      width: "440px",
                      height: "326px",
                    }}
                  >
                    <Box
                      //   border={1}
                      sx={{ width: "300px" }}
                    >
                      <Typography
                        variant="h4"
                        color="#fbfafb"
                        sx={{
                          textWrap: "wrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.title || item.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        margin: "16px 0px",
                      }}
                    >
                      <img
                        src={star}
                        alt="star"
                        style={{
                          height: "14px",
                          paddingBottom: "2px",
                          paddingRight: "2px",
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ marginRight: "15px", fontSize: "12px" }}
                      >
                        {item && item.vote_average.toFixed(1)}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ marginRight: "15px", fontSize: "12px" }}
                      >
                        {item.release_date || item.first_air_date}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ marginRight: "15px", fontSize: "12px" }}
                      >
                        {item && item.original_language.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#fbfafb"
                        sx={{ fontSize: "12px" }}
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
                        fontSize: "12px",
                        marginBottom: "16px",
                        fontFamily: "",
                        letterSpacing: "1px",
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
                    width: "520px",
                    height: "326px",
                    position: "absolute",
                    borderRadius: "20px",
                    right: 100,
                    top: 83,
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
