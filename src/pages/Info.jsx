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
import Grid from "../components/Grid";

const Info = () => {
  const { getMovieList } = useGetMovieLists();
  const { type, id } = useParams();
  const [list, setList] = useState();
  const [seasons, setSeasons] = useState();
  const [cast, setCast] = useState("");
  const [details, setDetails] = useState("");
  const [relatedVideos, setRelatedVideos] = useState();
  const [recommendations, setRecommendations] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [playIndex, setPlayIndex] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [position, setPosition] = useState(0);
  const [trending, setTrending] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      `https://api.themoviedb.org/3/${type}/${id}?append_to_response=season&language=en-US`,
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

    getList(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      setTrending
    );
  }, []);

  console.log("list", recommendations);

  useEffect(() => {
    if (type === "tv") {
      const seasons = list?.seasons.filter(
        (season) => !season.name.toLowerCase().includes("specials")
      );
      setSeasons(seasons);
    }
  }, [list]);

  useEffect(() => {
    if (prevLocation.current && prevLocation.current !== location.pathname) {
      window.location.reload();
    }
    prevLocation.current = location.pathname;
  }, [location.pathname]);

  const PlayAndAddToList = () => (
    <Box sx={{ marginTop: "20px" }}>
      <Button
        onClick={() => navigate(`/watch/${type}/${id}`)}
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
          {list?.title || list?.name}
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
            {list?.release_date || list?.first_air_date}
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
                onClick={() =>
                  navigate(`/explore?type=${type}&genre=${item.id}`)
                }
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
          {list?.overview}
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
      <Box
        // border={1}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
          {relatedVideos && relatedVideos?.results?.length > 4 && (
            <Box>
              <IconButton
                onClick={handleLeftArrow}
                onMouseEnter={() => setHovered(1)}
                onMouseLeave={() => setHovered(null)}
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
                  src={hovered === 1 ? arrowLeftBlue : arrowLeft}
                  alt="arrow left"
                />
              </IconButton>
              <IconButton
                onClick={handleRightArrow}
                onMouseEnter={() => setHovered(2)}
                onMouseLeave={() => setHovered(null)}
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
                  src={hovered === 2 ? rightArrowBlue : arrowRight}
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
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${list?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    textTransform: "none",
                    transition: "transform 0.3s ease",
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
                      zIndex: -100,
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
                  <img
                    src={playWhite}
                    alt="play"
                    style={{ opacity: 1, height: 22, zIndex: 100 }}
                  />
                  <img
                    src={playWhiteFilled}
                    alt="play"
                    style={{ height: 28, zIndex: 100 }}
                  />

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

  const RecommendationsGrid = () => (
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
      <Grid
        data={recommendations?.results?.length > 0 ? recommendations : trending}
      />
    </Box>
  );

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
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${list?.backdrop_path}`;
  const posterImageUrl = `https://image.tmdb.org/t/p/w780${list?.poster_path}`;

  return (
    <Box
      // border={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
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
        />
      </Box>
      <Box
        // border={1}
        sx={{ padding: "0 56px", borderColor: "white", width: 1240 }}
      >
        <MovieDetails />
      </Box>
      {type == "tv" && (
        <Box
          // border={1}
          sx={{
            mt: 12,
            p: 2,
            pr: 1.6,
            backgroundColor: "rgba(255,255 ,255,0.1)",
            borderRadius: "0.6vw",
            ml: "2.5vw",
            mr: "2.5vw",
            borderColor: "white",
            width: 1252,
          }}
        >
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: "20px",
              mb: 2,
              // ml: 1,
            }}
          >
            List of Seasons
          </Typography>
          <Box
            // border={1}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gridAutoRows: "auto",
              borderColor: "white",
              overflowY: "auto",
              maxHeight: 342,
              minHeight: 165,
              rowGap: 2,
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "0px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(186, 186, 187, 0)",
              },
            }}
          >
            {seasons?.map((season, index) => (
              <Button
                onClick={() =>
                  navigate(
                    `/watch/${type}/${id}?season=${season.season_number}`
                  )
                }
                key={index}
                sx={{
                  height: 160,
                  width: 300,
                  position: "relative",
                  borderRadius: "8px",
                  textTransform: "none",
                  transition: "transform 0.3s ease",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(https://image.tmdb.org/t/p/w780${season.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    opacity: 1,
                    transition: "transform 0.3s ease",
                  },
                  "&:hover::before": {
                    transform: "scale(1.1)",
                  },
                  "&:hover": {
                    border: "2px solid #2dd5fd",
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
                }}
              >
                <img
                  src={play}
                  alt="Overlay Image"
                  style={{ height: 15, zIndex: 1000 }}
                />
                <img src={circle} alt="Overlay Image" style={{ height: 38 }} />

                <Box
                  // border={1}
                  sx={{
                    position: "absolute",
                    width: 300,
                    height: 160,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      top: 6,
                      left: 6,
                      borderRadius: "6px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      padding: "2px 8px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="#FFFFFF"
                      sx={{
                        fontSize: "14px",
                        textAlign: "left",
                      }}
                    >
                      {season.season_number}. {season.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 2,
                      bottom: 6,
                      right: 6,
                      borderRadius: "6px",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      padding: "2px 8px",
                    }}
                  >
                    <Typography
                      variant="h4"
                      color="#fbfafb"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 100,
                        opacity: 0.8,
                      }}
                    >
                      Ep. {season.episode_count}
                    </Typography>
                  </Box>
                </Box>
              </Button>
            ))}
          </Box>
        </Box>
      )}
      <Box
        // border={1}
        sx={{ padding: "0 56px", borderColor: "white", width: 1240 }}
      >
        <RelatedVideosHeader />
        {relatedVideos && relatedVideos.results.length !== 0 && (
          <Box
            // border={1}
            // className="slideshow"
            sx={{
              borderRadius: "12px",
              height: 160,
              maxWidth: 1258,
              borderColor: "white",
              overflow: "hidden",
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
                          backgroundImage: `url(https://image.tmdb.org/t/p/original${list?.backdrop_path})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          textTransform: "none",
                          transition: "transform 0.3s ease",
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
                            zIndex: -100,
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
                        <img
                          src={playWhite}
                          alt="play"
                          style={{ opacity: 1, height: 22, zIndex: 100 }}
                        />
                        <img
                          src={playWhiteFilled}
                          alt="play"
                          style={{ height: 28, zIndex: 100 }}
                        />

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
          // <RelatedVideos />
        )}
      </Box>

      <RecommendationsGrid />
    </Box>
  );
};

export default Info;
