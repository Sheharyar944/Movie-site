import React, { useState, useEffect, useRef } from "react";
import useGetMovieLists from "../hooks/useGetMovieLists";
import star from "../assets/star.png";
import play from "../assets/play.png";
import whiteinfo from "../assets/whiteinfo.png";
import blackStar from "../assets/blackStar.png";
import MyIcon from "./MyIcon";
import { Box, Button, Typography } from "@mui/material";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import { useNavigate } from "react-router-dom";

const TopRated = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [topRated, setTopRated] = useState("");
  const { getMovieList } = useGetMovieLists();
  const [checked, setChecked] = useState(true);
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === -1260 * 19 ? 0 : prevIndex - 1260
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
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

  const PlayAndMore = ({ id }) => (
    <Box sx={{ marginBottom: "70px" }}>
      <Button
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
        display: "flex",
        justifyContent: "space-between",
        margin: "0px 70px",
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
  );

  const handleLeftArrow = (event) => {
    if (position !== 0) {
      setPosition((prev) => prev + 180.5);
    }
  };
  const handleRightArrow = (event) => {
    if (position !== -180.5 * 13) {
      setPosition((prev) => prev - 180.5);
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
      <Button
        onClick={handleLeftArrow}
        disabled={position === 0}
        sx={{
          height: "258px",
          position: "absolute",
          // borderRadius: "10px",
          backgroundImage:
            "linear-gradient(to left, rgba(2,2,8,0),  rgba(2,2,8,0.5))",
          top: 620,
          left: 50,
          zIndex: 2,
        }}
        endIcon={<img src={leftArrow} alt="info" style={{ height: "30px" }} />}
      ></Button>
      <Button
        onClick={handleRightArrow}
        disabled={position === -180.5 * 13}
        sx={{
          height: "258px",
          position: "absolute",
          // borderRadius: "10px",
          top: 620,
          left: 1244,
          zIndex: 2,
          backgroundImage:
            "linear-gradient(to right, rgba(2,2,8,0),  rgba(2,2,8,0.5))",
        }}
        startIcon={
          <img src={rightArrow} alt="info" style={{ height: "30px" }} />
        }
      ></Button>
      <Box
        // border={1}
        sx={{
          overflow: "hidden",
          maxWidth: "100%",
          height: "300px",
          position: "absolute",
          top: 620,
          left: 52,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            transform: `translate3d(${position}px, 0, 0)`,
            whiteSpace: "nowrap",
            transition: "ease 1000ms",
            borderRadius: "50px",
            width: "1260px",
          }}
        >
          {topRated &&
            topRated.results.map((item, index) => (
              <Button
                key={index}
                // border={1}
                onClick={() => setIndex(index * -1260)}
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
                ></Box>
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
                    <PlayAndMore id={item.id} />
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
