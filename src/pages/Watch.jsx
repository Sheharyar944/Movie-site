import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import { Box, Button, Typography, IconButton } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import leftVector from "../assets/leftVector.png";
import leftVectorCyan from "../assets/leftVectorCyan.png";
import rightVector from "../assets/rightVector.png";
import rightVectorCyan from "../assets/rightVectorCyan.png";
import episodes from "../assets/episodes.png";

const Watch = () => {
  const { getMovieList } = useGetMovieLists();
  const { type, id } = useParams();
  const [list, setList] = useState();
  const [position, setPosition] = useState(0);
  const [seasons, setSeasons] = useState();
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [backgroundImageUrlTv, setBackgroundImageUrlTv] = useState();
  const [refresh, setRefresh] = useState(true);
  const [disable, setDisable] = useState(false);
  const [goBack, setGoBack] = useState();

  const navigate = useNavigate();

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      `https://api.themoviedb.org/3/${type}/${id}?append_to_response=recommendations%2Ccredits%2Cgenre%2Cvideos%2Cseason/${
        selectedSeason + 1
      }&language=en-US`,
      setList
    );
  }, [refresh]);

  useEffect(() => {
    if (type === "tv") {
      const seasons = list?.seasons.filter((season) =>
        season.name.toLowerCase().includes("season")
      );
      setSeasons(seasons);
    }
  }, [list]);

  useEffect(() => {
    if (seasons) {
      const season = seasons[selectedSeason];
      setBackgroundImageUrlTv(
        `https://image.tmdb.org/t/p/original${season.poster_path}`
      );
    }
  }, [seasons, selectedSeason]);

  const RecommendationsGrid = () => (
    <Box sx={{ padding: "0 48px" }}>
      <Box sx={{ marginTop: "30px" }}>
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{
            fontSize: "25px",
          }}
        >
          You may also like
        </Typography>
      </Box>
      <Grid data={list?.recommendations} />
    </Box>
  );

  const MovieDetails = () => (
    <Box
      //   border={1}
      sx={{
        marginTop: "116px",
        display: "flex",
        ml: "52px",
        mr: "52px",
        borderColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${posterImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: 251,
          height: 378,
          borderRadius: "10px",
          marginRight: "28px",
        }}
      ></Box>

      <Box
        sx={{
          width: 880,
          height: 412,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          color="#fbfafb"
          sx={{
            fontWeight: 600,
            fontSize: "30px",
            // letterSpacing: "1px",
            opacity: 0.9,
          }}
        >
          {list?.title || list?.name}
        </Typography>

        <Box>
          {list?.genres.map((item, index) => (
            <Button
              onClick={() => navigate(`/explore?type=${type}&genre=${item.id}`)}
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
        <Box
          //   border={1}
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: 1,
            borderColor: "white",
            borderRadius: "8px",
          }}
        >
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
              fontSize: "13px",
            }}
          >
            {list?.overview}
          </Typography>
        </Box>
        <Box
          sx={{
            // display: "flex",
            alignItems: "center",
            margin: "11px 0px 15px 0px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                marginRight: "2px",
                opacity: "0.9",
                mr: 1,
                fontWeight: 300,
              }}
            >
              Date:
            </Typography>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{ marginRight: "15px", fontSize: "14px", opacity: "0.9" }}
            >
              {list?.release_date || list?.first_air_date}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                marginRight: "2px",
                opacity: "0.9",
                mr: 1,
                // fontWeight: "bold",
              }}
            >
              Rating:
            </Typography>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "12px",
                marginRight: "2px",
                opacity: "0.9",
              }}
            >
              {list && list.vote_average.toFixed(1)}
            </Typography>
          </Box>
          <Box
            // border={1}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              borderColor: "white",
            }}
          >
            <Typography
              variant="h5"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                opacity: "0.9",
                mr: 1,
                // fontWeight: "bold",
              }}
            >
              Cast:{" "}
            </Typography>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "12px",
                opacity: "0.9",
                letterSpacing: "1px",
              }}
            >
              {castList?.map((list) => list.name).join(", ")}
            </Typography>
          </Box>
        </Box>

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
          {castList?.map((item, index) => (
            <Box
              // border={1}
              key={index}
              sx={{
                height: 50,
                width: 50,
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

  const castList = list && list.credits.cast.slice(0, 5);
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${list?.backdrop_path}`;
  const posterImageUrl = `https://image.tmdb.org/t/p/w780${list?.poster_path}`;

  const trailer = list?.videos?.results?.reduce((acc, item) => {
    const normalizedItemName = item.name.toLowerCase().replace(/\s/g, "");
    const normalizedSearchTerm = "officialtrailer";
    if (normalizedItemName === normalizedSearchTerm || "trailer") {
      return item.key;
    }
    return acc;
  }, null);

  const handleLeftArrow = () => {
    if (position !== 0 && goBack) {
      setPosition((prev) => parseFloat((prev + goBack).toFixed(1)));
    } else if (position !== 0) {
      setPosition((prev) => parseFloat((prev + 68.8).toFixed(1)));
    }
    if (disable) {
      setDisable(false);
    }
  };
  const handleRightArrow = () => {
    const mod = (seasons.length - 4) % 4;
    const div = (seasons.length - 4) / 4;
    if (mod === 0 && position !== parseFloat((-68.8 * div).toFixed(1))) {
      setPosition((prev) => parseFloat((prev - 68.8).toFixed(1)));
    } else {
      setPosition((prev) => parseFloat((prev - 17.2 * mod).toFixed(1)));
      setDisable(true);
      setGoBack(parseFloat((17.2 * mod).toFixed(1)));
    }
  };
  console.log("list", list);

  // console.log("seasons", seasons);

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundImage:
            type === "movie"
              ? `url(${backgroundImageUrl})`
              : `url(${backgroundImageUrlTv})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "635px",
          width: "100%",
          zIndex: -1,
          filter: "blur(70px)",
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
      {type === "movie" ? (
        <Box
          sx={{
            backgroundColor: "black",
            height: "100vh",
            width: "auto",
            mt: 10,
            ml: "52px",
            mr: "52px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/embed/${trailer}`}
            width="100%"
            height="100%"
            controls={true}
          />
        </Box>
      ) : (
        <Box
          // border={1}
          sx={{
            display: "flex",
            mt: 10,
            ml: "52px",
            mr: "52px",
            // overflow: "hidden",
            height: "100vh",
            // width: "calc(100% - 104px)",
          }}
        >
          <Box
            // border={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(186, 186, 187, 0.2)",
              borderBottomLeftRadius: "10px",
              borderTopLeftRadius: "10px",
              width: "100%",
            }}
          >
            <Box
              // border={1}
              sx={{
                height: "10vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                color="#fbfafb"
                sx={{
                  ml: "1vw",
                  mr: "1vh",
                  fontSize: "16px",
                }}
              >
                Episodes
              </Typography>
              <img src={episodes} alt="" style={{ height: 25 }} />
            </Box>
            <Box
              // border={1}
              sx={{
                flex: 1,
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {list &&
                list[`season/${selectedSeason + 1}`]?.episodes.map(
                  (item, index) => (
                    <Button
                      onClick={() => setSelectedEpisode(index)}
                      key={index}
                      sx={{
                        width: "100%",
                        height: "8vh",
                        textTransform: "none",
                        borderRadius: 0,
                        backgroundColor:
                          index % 2 === 0 ? "rgba(186, 186, 187, 0.2)" : null,
                        "&:active": {
                          transform: "scale(0.98)",
                        },
                        "&:hover": {
                          background: "#464749",
                        },
                        // padding: 0,
                      }}
                      disableRipple
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          mr: 1,
                          fontSize: "14px",
                          color:
                            selectedEpisode === index ? "#00c1db" : "#fbfafb",
                        }}
                      >
                        {index + 1}.
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          mr: "auto",
                          fontSize: "14px",
                          color:
                            selectedEpisode === index ? "#00c1db" : "#fbfafb",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Button>
                  )
                )}
            </Box>
          </Box>
          <Box
            // border={1}
            sx={{
              width: "69vw",
              height: "100vh",
            }}
          >
            <Box
              sx={{
                backgroundColor: "black",
                height: "78vh",
                width: "100%",
                ml: "2px",
                borderTopRightRadius: "10px",
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/embed/${trailer}`}
                width="100%"
                height="100%"
                controls={true}
              />
            </Box>
            <Box
              sx={{
                ml: "2px",
                backgroundColor: "rgba(186, 186, 187, 0.2)",
                borderBottomRightRadius: "10px",
                mt: "4px",
                width: "69vw",
                height: "21.3vh",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                // border={1}
                sx={{
                  borderRadius: "12px",
                  position: "relative",
                  ml: "0.3vw",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  // maxWidth: "100%",
                  width: "62.3vw",
                  paddingRight: 10,
                }}
              >
                {position !== 0 && (
                  <IconButton
                    onClick={handleLeftArrow}
                    sx={{
                      position: "absolute",
                      height: "18vh",
                      borderRadius: 0,
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      width: "4vw",
                      zIndex: 100,
                      left: 0,
                      "&:hover": {
                        background:
                          "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.5))",
                      },
                      "& img": {
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover img": {
                        opacity: 1,
                      },
                    }}
                    disableRipple
                  >
                    <img
                      src={leftVector}
                      alt="left arrow"
                      style={{ height: 20, opacity: 1 }}
                    />
                    <img
                      src={leftVectorCyan}
                      alt="left arrow"
                      style={{ height: 20, position: "absolute" }}
                    />
                  </IconButton>
                )}
                {!disable && (
                  <IconButton
                    onClick={handleRightArrow}
                    sx={{
                      position: "absolute",
                      height: "18vh",
                      borderRadius: 0,
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                      width: "4vw",
                      zIndex: 100,
                      right: "0",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.5))",
                      },
                      "& img": {
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover img": {
                        opacity: 1,
                      },
                    }}
                    disableRipple
                  >
                    <img
                      src={rightVector}
                      alt="left arrow"
                      style={{ height: 20, opacity: 1 }}
                    />
                    <img
                      src={rightVectorCyan}
                      alt="left arrow"
                      style={{ height: 20, position: "absolute" }}
                    />
                  </IconButton>
                )}
                <Box
                  className="slideshowSlider"
                  style={{ transform: `translate3d(${position}vw, 0, 0)` }}
                >
                  {seasons &&
                    seasons.map((item, index) => (
                      <Button
                        onClick={() => (
                          setSelectedSeason(index), setRefresh(!refresh)
                        )}
                        key={index}
                        sx={{
                          display: "inline-block",
                          position: "relative",
                          height: "18vh",
                          width: "16.6vw",
                          borderRadius: "12px",
                          marginRight: "0.6vw",
                          backgroundImage: `url(https://image.tmdb.org/t/p/w342${item.poster_path})`,
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
                        disableRipple
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            height: "18vh",
                            width: "16.6vw",
                            top: 0,
                            left: 0,
                            backgroundColor:
                              index === selectedSeason
                                ? "rgba(0,0,0,0.7)"
                                : "rgba(0,0,0,0.3)",
                            borderRadius: "12px",
                            zIndex: 1,
                          }}
                        />

                        {/* <img
                            src={playWhite}
                            alt="play"
                            style={{ opacity: 1, height: 22, zIndex: 100 }}
                          />
                          <img
                            src={playWhiteFilled}
                            alt="play"
                            style={{ height: 28, zIndex: 100 }}
                          /> */}
                        <Box
                          sx={{
                            position: "absolute",
                            zIndex: 2,
                            top: 6,
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
                            }}
                          >
                            {item.name}
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
                              opacity: 0.7,
                            }}
                          >
                            Ep. {item.episode_count}
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <MovieDetails />
      <Box
        sx={{
          //   position: "absolute",
          top: 500,
          height: "1px",
          borderBottom: "0.5px solid",
          borderColor: "white",
          ml: "52px",
          mr: "52px",
          zIndex: 100,
          opacity: 0.1,
        }}
      />
      <RecommendationsGrid />
    </Box>
  );
};

export default Watch;
