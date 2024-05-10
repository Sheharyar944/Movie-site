import React, { useEffect, useState, useRef } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import starGold from "../assets/starGold.png";
import heartWhite from "../assets/heartWhite.png";
import play from "../assets/play.png";
import movieWhite from "../assets/movieWhite.png";
import playWhite from "../assets/playWhite.png";
import playWhiteFilled from "../assets/playWhiteFilled.png";
import ReactPlayer from "react-player";
import arrowLeft from "../assets/arrowLeft.png";
import arrowLeftBlue from "../assets/arrowLeftBlue.png";
import rightArrowBlue from "../assets/rightArrowBlue.png";
import arrowRight from "../assets/arrowRight.png";
import circle from "../assets/circle.png";

const Info = () => {
  const { getMovieList } = useGetMovieLists();
  const { type, id } = useParams();
  const [list, setList] = useState("");
  const [cast, setCast] = useState("");
  const [details, setDetails] = useState("");
  const [relatedVideos, setRelatedVideos] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playIndex, setPlayIndex] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [position, setPosition] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = useRef();

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
      setList
    );
    getList(
      `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US`,
      setCast
    );
    getList(
      `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
      setDetails
    );
    getList(
      `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`,
      setRelatedVideos
    );
    getList(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`,
      setRecommendations
    );
  }, []);

  useEffect(() => {
    if (prevLocation.current && prevLocation.current !== location.pathname) {
      window.location.reload();
    }
    prevLocation.current = location.pathname;
  }, [location.pathname]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const PlayAndAddToList = () => (
    <Box sx={{ marginTop: "20px" }}>
      <Button
        startIcon={<img src={play} alt="play" style={{ height: "18px" }} />}
        variant="contained"
        sx={{
          width: "161px",
          height: "42px",
          marginRight: "10px",
          textTransform: "none",
          backgroundColor: "#fbfafb",
          borderRadius: "10px",
          fontSize: "16px",
          color: "black",
          "&:hover": {
            backgroundColor: "rgba(251, 250, 251, 0.7)",
          },
        }}
      >
        <Typography variant="body1" color="initial" sx={{ fontWeight: 500 }}>
          Play Now
        </Typography>
      </Button>
      <Button
        startIcon={
          <img src={heartWhite} alt="info" style={{ height: "18px" }} />
        }
        variant="outlined"
        sx={{
          width: "194px",
          height: "43px",
          textTransform: "none",
          background: "transparent",
          borderRadius: "10px",
          color: "#fbfafb",
          borderColor: "#fbfafb",
          "&:hover": {
            backgroundColor: "rgba(52, 46, 53, 0.6)",
            borderColor: "#fbfafb",
          },
        }}
      >
        Add To List
      </Button>
    </Box>
  );

  const MovieDetails = () => (
    <Box sx={{ marginTop: "116px", display: "flex" }}>
      <Box
        sx={{
          backgroundImage: `url(${posterImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: 275,
          height: 412,
          borderRadius: "10px",
          marginRight: "36px",
        }}
      ></Box>

      <Box
        sx={{
          width: 710,
          height: 412,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          color="#fbfafb"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "30px",
            letterSpacing: "1px",
          }}
        >
          {list.title || list.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "11px 0px 15px 0px",
          }}
        >
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{ marginRight: "15px", fontSize: "14px", opacity: "0.7" }}
          >
            {list.release_date || list.first_air_date}
          </Typography>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "rgba(255, 255,255,0.1)",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "15px",
              width: 50,
              height: 23,
              borderRadius: "5px",
            }}
          >
            <img
              src={starGold}
              alt="star"
              style={{
                paddingBottom: "2px",
                paddingRight: "4px",
                height: "14px",
              }}
            />
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{ fontSize: "12px", marginRight: "2px", opacity: "0.7" }}
            >
              {list && list.vote_average.toFixed(1)}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{ fontSize: "14px", opacity: "0.7" }}
          >
            {list && list.original_language.toUpperCase()}
          </Typography>
        </Box>
        <Box>
          {details &&
            details.genres.map((item, index) => (
              <Button
                key={index}
                variant="text"
                sx={{
                  backgroundColor: "rgba(0, 193, 219, 0.2)",
                  textTransform: "none",
                  height: 32,
                  color: "#00c1db",
                  marginRight: "10px",
                  marginBottom: "13px",

                  "&:hover": {
                    backgroundColor: "rgba(0, 193, 219, 0.4)",
                    color: "#00c1db",
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
        </Box>
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            opacity: "0.7",
          }}
        >
          {list.overview}
        </Typography>
        <PlayAndAddToList />
        <Box
          // border={1}
          sx={{
            display: "flex",
            width: 800,
            height: 76,
            marginTop: "20px",
            paddingBottom: "6px",
          }}
        >
          {castList &&
            castList.map((item, index) => (
              <Box
                // border={1}
                key={index}
                sx={{
                  height: 76,
                  width: 76,
                  borderRadius: "50px",
                  overflow: "hidden",
                  position: "relative",
                  marginRight: "12px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                {item.profile_path !== null && (
                  <img
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={`https://image.tmdb.org/t/p/w92${item.profile_path}`}
                    alt={`${item.name} image`}
                  />
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );

  const RelatedVideosHeader = () => (
    <Box sx={{ marginTop: "100px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: "25px",
              // fontWeight: "bold",
            }}
          >
            Related Videos
          </Typography>
          <img src={movieWhite} alt="movie image" style={{ height: 30 }} />
        </Box>
        <Box sx={{ display: "flex" }}>
          {relatedVideos && relatedVideos.results.length > 4 && (
            <Box>
              <IconButton
                onClick={handleLeftArrow}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                // disabled={position === 0}
                sx={{
                  width: 40,
                  height: 35,
                  marginRight: "2px",
                  backgroundColor: "rgba(180, 177, 176,0.2)",
                  borderRadius: 0,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,

                  "&:hover": {
                    backgroundColor: "rgba(180, 177, 176,0.3)",
                  },
                }}
              >
                <img
                  src={hovered ? arrowLeftBlue : arrowLeft}
                  alt="arrow left"
                />
              </IconButton>
              <IconButton
                onClick={handleRightArrow}
                onMouseEnter={() => setHovered1(true)}
                onMouseLeave={() => setHovered1(false)}
                sx={{
                  width: 40,
                  height: 35,
                  backgroundColor: "rgba(180, 177, 176,0.2)",
                  borderRadius: 0,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  "&:hover": {
                    backgroundColor: "rgba(180, 177, 176,0.3)",
                  },
                }}
              >
                <img
                  src={hovered1 ? rightArrowBlue : arrowRight}
                  alt="arrow left"
                />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
  // not working properly if I use this component
  const RelatedVideos = () => (
    <Box
      // border={1}
      className="slideshow"
      sx={{
        borderRadius: "12px",
        // height: 160,
      }}
    >
      <Box
        className="slideshowSlider"
        style={{ transform: `translate3d(${position}px, 0, 0)` }}
      >
        {relatedVideos &&
          relatedVideos.results.map((item, index) => (
            <Box
              className="slide"
              key={index}
              // border={1}
              sx={{
                display: "inline-block",
                position: "relative",
                height: 160,
                width: 300,
                backgroundColor: "rgba(0, 0, 0,1)",
                borderRadius: "12px",
                marginRight: "16px",
                overflow: "hidden",
              }}
            >
              {playIndex === index ? (
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${item.key}`}
                  width="300px"
                  height="160px"
                  controls={true}
                />
              ) : (
                <Button
                  onClick={() => setPlayIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    // display: "inline-block",
                    position: "absolute",
                    height: 160,
                    width: 300,
                    borderRadius: "12px",
                    marginRight: "16px",
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${list.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    textTransform: "none",
                    // transition: "transform 0.3s ease",
                    "& img": {
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: 1,
                      transition: "opacity 0.3s ease",
                    },
                    "&:hover img": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* <img src={play} alt="Overlay Image" /> */}
                  <Box
                    sx={{
                      position: "absolute",
                      height: 160,
                      width: 300,
                      top: 0,
                      left: 0,
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))",
                      borderRadius: "12px",
                      zIndex: 1,
                    }}
                  ></Box>
                  <Box
                    // border={1}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      width: hoveredIndex === index ? 45 : 40,
                      height: hoveredIndex === index ? 45 : 40,
                      backgroundColor:
                        hoveredIndex === index
                          ? "rgba(180, 177, 176,0.5)"
                          : "rgba(180, 177, 176,0.4)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <img
                      src={hoveredIndex === index ? playWhiteFilled : playWhite}
                      alt="play image"
                      style={{
                        height: hoveredIndex === index ? "22px" : "30px",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      position: "absolute",
                      width: "280px",
                      bottom: 0,
                      paddingBottom: "10px",
                      paddingLeft: "3px",
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="#FFFFFF"
                      sx={{
                        fontSize: "14px",
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        whiteSpace: "wrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="h4"
                      color="#fbfafb"
                      sx={{
                        fontSize: "12px",
                        fontWeight: 100,
                        textAlign: "left",
                        opacity: 0.7,
                      }}
                    >
                      {item.type}
                    </Typography>
                  </Box>
                </Button>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
  //////////////////////////////////////////////

  const handleLeftArrow = () => {
    if (position !== 0) {
      setPosition((prev) => prev + 316);
    }
  };
  const handleRightArrow = () => {
    const length = relatedVideos.results.length;
    if (position !== -316 * (length - 4)) {
      setPosition((prev) => prev - 316);
    }
  };

  const castList = cast && cast.cast.slice(0, 5);
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${list.backdrop_path}`;
  const posterImageUrl = `https://image.tmdb.org/t/p/w780${list.poster_path}`;

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "635px",
          width: "100%",
          zIndex: -1,
          filter: "blur(8px)",
        }}
      >
        {" "}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        ></Box>
      </Box>

      <Box sx={{ padding: "0 56px" }}>
        <MovieDetails />
        <RelatedVideosHeader />
        {relatedVideos && relatedVideos.results.length !== 0 && (
          <Box
            // border={1}
            className="slideshow"
            sx={{
              borderRadius: "12px",
              height: 160,
            }}
          >
            <Box
              className="slideshowSlider"
              style={{ transform: `translate3d(${position}px, 0, 0)` }}
            >
              {relatedVideos &&
                relatedVideos.results.map((item, index) => (
                  <Box
                    className="slide"
                    key={index}
                    // border={1}
                    sx={{
                      display: "inline-block",
                      position: "relative",
                      height: 160,
                      width: 300,
                      backgroundColor: "rgba(0, 0, 0,1)",
                      borderRadius: "12px",
                      marginRight: "16px",
                      overflow: "hidden",
                    }}
                  >
                    {playIndex === index ? (
                      <ReactPlayer
                        url={`https://www.youtube.com/embed/${item.key}`}
                        width="300px"
                        height="160px"
                        controls={true}
                      />
                    ) : (
                      <Button
                        onClick={() => setPlayIndex(index)}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        sx={{
                          // display: "inline-block",
                          position: "absolute",
                          height: 160,
                          width: 300,
                          borderRadius: "12px",
                          marginRight: "16px",
                          backgroundImage: `url(https://image.tmdb.org/t/p/original${list.backdrop_path})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          textTransform: "none",
                          transition: "transform 0.3s ease",
                          "& img": {
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            opacity: 1,
                            transition: "opacity 0.3s ease",
                          },
                          "&:hover img": {
                            opacity: 1,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            height: 160,
                            width: 300,
                            top: 0,
                            left: 0,
                            backgroundImage:
                              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))",
                            borderRadius: "12px",
                            zIndex: 1,
                          }}
                        ></Box>
                        <Box
                          // border={1}
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            width: hoveredIndex === index ? 45 : 40,
                            height: hoveredIndex === index ? 45 : 40,
                            backgroundColor:
                              hoveredIndex === index
                                ? "rgba(180, 177, 176,0.5)"
                                : "rgba(180, 177, 176,0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 2,
                          }}
                        >
                          <img
                            src={
                              hoveredIndex === index
                                ? playWhiteFilled
                                : playWhite
                            }
                            alt="play image"
                            style={{
                              height: hoveredIndex === index ? "22px" : "30px",
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            position: "absolute",
                            width: "280px",
                            bottom: 0,
                            paddingBottom: "10px",
                            paddingLeft: "3px",
                            zIndex: 2,
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="#FFFFFF"
                            sx={{
                              fontSize: "14px",
                              textAlign: "left",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              whiteSpace: "wrap",
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="h4"
                            color="#fbfafb"
                            sx={{
                              fontSize: "12px",
                              fontWeight: 100,
                              textAlign: "left",
                              opacity: 0.7,
                            }}
                          >
                            {item.type}
                          </Typography>
                        </Box>
                      </Button>
                    )}
                  </Box>
                ))}
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ padding: "0 48px" }}>
        <Box sx={{ marginTop: "100px" }}>
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: "25px",
              // fontWeight: "bold",
            }}
          >
            You may also like
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "auto",
            gap: "12px",
            marginTop: "12px",
            marginBottom: "100px",
          }}
        >
          {recommendations &&
            recommendations.results.map((item, index) => (
              <Box key={index}>
                <Button
                  onClick={() =>
                    navigate(`/info/${item.media_type}/${item.id}`)
                  }
                  onMouseEnter={() => setHoveredIndex(index + 1000)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    padding: 0,
                    borderRadius: "8px",
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 296,
                    width: 197,
                    position: "relative",
                    textTransform: "none",
                    transition: "0.5s ease",
                    "&:hover": {
                      backgroundSize: "105%",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      height: 296,
                      width: 197,
                      top: 0,
                      left: 0,
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))",
                      borderRadius: "8px",
                      zIndex: 0,
                    }}
                  ></Box>
                  <img
                    src={circle}
                    alt="circled play"
                    style={{
                      position: "absolute",
                      height: 45,
                      zIndex: 1,
                      opacity: hoveredIndex === index + 1000 ? 1 : 0,
                      transition: "opacity 0.1s ease",
                    }}
                  />
                  <img
                    src={play}
                    alt="circled play"
                    style={{
                      position: "absolute",
                      height: 18,
                      zIndex: 1,
                      opacity: hoveredIndex === index + 1000 ? 1 : 0,
                      // transition: "opacity 0.1s ease",
                    }}
                  />
                  <Box
                    // border={1}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 0,
                      height: 20,
                      width: 40,
                      display: "flex",
                      backgroundColor: "rgba(0, 0, 0,0.6)",
                      alignItems: "center",
                      borderTopLeftRadius: "4px",
                      borderBottomLeftRadius: "4px",
                    }}
                  >
                    <img
                      src={starGold}
                      alt="star"
                      style={{
                        height: 14,
                        marginLeft: 4,
                        marginBottom: 2,
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="#fbfafb"
                      sx={{ fontSize: 12, marginLeft: "2px" }}
                    >
                      {item.vote_average.toFixed(1)}
                    </Typography>
                  </Box>
                  <Box
                    // border={1}
                    sx={{
                      position: "absolute",
                      width: 185,
                      paddingBottom: "5px",
                      zIndex: 1,
                      bottom: 0,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="#FFFFFF"
                      sx={{
                        fontSize: "12px",
                        opacity: "0.7",
                        textAlign: "center",
                      }}
                    >
                      {list &&
                        (list.release_date || list.first_air_date).split(
                          "-"
                        )[0]}

                      <span
                        style={{ verticalAlign: "middle", margin: "0 5px" }}
                      >
                        •
                      </span>
                      {list && list.original_language.toUpperCase()}
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
                        opacity: "0.9",
                        fontweight: "bold",
                        fontSize: "16px",
                        letterSpacing: "1px",
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
      </Box>
    </Box>
  );
};

export default Info;
