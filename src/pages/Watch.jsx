import React, { useEffect, useState, useRef } from "react";
import Grid from "../components/Grid";
import { Box, Button, Typography, IconButton, Link } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import leftVector from "../assets/leftVector.png";
import leftVectorCyan from "../assets/leftVectorCyan.png";
import rightVector from "../assets/rightVector.png";
import rightVectorCyan from "../assets/rightVectorCyan.png";
import episodes from "../assets/episodes.png";
import play from "../assets/play.png";
import circle from "../assets/circle.png";
import ToolTip from "../components/ToolTip";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import exclamation from "../assets/exclamation.png";

const Watch = () => {
  const { getMovieList } = useGetMovieLists();
  const { type, id } = useParams();
  const [list, setList] = useState();
  const [position, setPosition] = useState(0);
  const [seasons, setSeasons] = useState();
  const [backgroundImageUrlTv, setBackgroundImageUrlTv] = useState();
  const [refresh, setRefresh] = useState(true);
  const [disable, setDisable] = useState(false);
  const [goBack, setGoBack] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSeason, setSelectedSeason] = useState(
    searchParams.get("season") || 1
  );
  const [selectedEpisode, setSelectedEpisode] = useState(
    searchParams.get("ep") || 1
  );
  const [videoNumber, setVideoNumber] = useState(0);
  const [stop, setStop] = useState(true);
  const ref = useRef(0);

  const navigate = useNavigate();

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  const updateSearchParams = (object) => {
    const params = new URLSearchParams(searchParams);
    for (const key in object) {
      params.set(key, object[key]);
    }
    setSearchParams(params);
  };

  useEffect(() => {
    getList(
      `https://api.themoviedb.org/3/${type}/${id}?append_to_response=recommendations%2Ccredits%2Cgenre%2Cvideos%2Cseason/${selectedSeason}&language=en-US`,
      setList
    );
  }, [refresh]);

  // useEffect(() => {
  //   if (type === "tv") {
  //     const seasons = list?.seasons.filter(
  //       (season) =>
  //         season.name.toLowerCase().includes("season") ||
  //         season.name.toLowerCase().includes("series") ||
  //         season.name.toLowerCase().includes("miniseries")
  //     );
  //     setSeasons(seasons);
  //   }
  // }, [list]);

  useEffect(() => {
    if (type === "tv") {
      const seasons = list?.seasons.filter(
        (season) => !season.name.toLowerCase().includes("specials")
      );
      setSeasons(seasons);
    }
  }, [list]);

  useEffect(() => {
    if (seasons && stop) {
      const mod = seasons?.length % 4;
      if (
        selectedSeason > seasons?.length - mod &&
        mod !== 0 &&
        selectedSeason > 4 &&
        selectedSeason <= seasons?.length
      ) {
        const div = (seasons?.length - 4) / 4;
        setPosition(parseFloat((-938 * div).toFixed(1)));
        setDisable(true);
        setGoBack(parseFloat((234.5 * mod).toFixed(1)));
      } else if (selectedSeason > 4 && selectedSeason <= seasons?.length) {
        const div = Math.ceil((selectedSeason - 4) / 4);
        setPosition(parseFloat((-938 * div).toFixed(1)));
        if (selectedSeason > seasons?.length - 4 + mod) {
          setDisable(true);
        }
      }
      setStop(false);
    }
  }, [seasons]);

  console.log("list", list);

  useEffect(() => {
    if (seasons) {
      const season = seasons[selectedSeason - 1];
      setBackgroundImageUrlTv(
        `https://image.tmdb.org/t/p/original${season?.poster_path}`
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
      // border={1}
      sx={{
        marginTop: "116px",
        display: "flex",
        // ml: "52px",
        // mr: "52px",
        borderColor: "white",
        width: 1254,
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
        // border={1}
        sx={{
          width: 880,
          height: 425,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          color="#fbfafb"
          sx={{
            fontWeight: 600,
            fontSize: 30,
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
                fontSize: 14,
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
          // border={1}
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
          // border={1}
          sx={{
            // display: "flex",
            alignItems: "center",
            margin: "11px 0px 15px 0px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              sx={{
                marginRight: "15px",
                fontSize: "14px",
                opacity: "0.7",
              }}
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
                opacity: "0.7",
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
                opacity: "0.7",
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
                borderRadius: "500px",
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

  // const trailer = list?.videos?.results?.reduce((acc, item) => {
  //   const normalizedItemName = item.name.toLowerCase().replace(/\s/g, "");
  //   const normalizedSearchTerm = "officialtrailer";
  //   if (normalizedItemName === normalizedSearchTerm || "trailer") {
  //     return item.key;
  //   }
  //   return acc;
  // }, null);

  const trailer =
    list?.videos?.results.length > 0
      ? list?.videos?.results[videoNumber].key
      : null;

  const handleLeftArrow = () => {
    if (position !== 0 && goBack) {
      setPosition((prev) => parseFloat((prev + goBack).toFixed(1)));
      setGoBack(null);
    } else if (position !== 0) {
      setPosition((prev) => parseFloat((prev + 938).toFixed(1)));
      ref.current--;
    }
    if (disable) {
      setDisable(false);
    }
  };
  const handleRightArrow = () => {
    const mod = (seasons.length - 4) % 4;
    const div = Math.floor((seasons.length - 4) / 4);
    if (
      div !== 0 &&
      ref.current !== div &&
      position !== parseFloat((-938 * div).toFixed(1))
    ) {
      setPosition((prev) => parseFloat((prev - 938).toFixed(1)));
      ref.current++;
      console.log("ref", ref.current);
      if (ref.current === div && mod === 0) {
        setDisable(true);
        ref.current = 0;
      }
    } else {
      setPosition((prev) => parseFloat((prev - 234.5 * mod).toFixed(1)));
      setDisable(true);
      setGoBack(parseFloat((234.5 * mod).toFixed(1)));
    }
  };

  return (
    <Box
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
          backgroundImage:
            type === "movie"
              ? `url(${backgroundImageUrl})`
              : `url(${backgroundImageUrlTv})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
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
      <Box
        // border={1}
        sx={{
          display: "flex",
          ml: "52px",
          mr: "52px",
          color: "#fbfafb",
          height: "8vh",
          alignItems: "center",
          pl: "2px",
          width: 1254,
        }}
      >
        <Link href="/" underline="hover" color="#fbfafb" sx={{ mr: 1 }}>
          <Typography variant="body1" color="#fbfafb">
            Home
          </Typography>
        </Link>
        /
        <Link
          href={`/explore?type=${type}`}
          underline="hover"
          color="#fbfafb"
          sx={{ mr: 1, ml: 1 }}
        >
          <Typography variant="body1" color="#fbfafb">
            {type === "movie" ? "Movie" : "Show"}
          </Typography>
        </Link>
        /
        <Link
          href={`/info/${type}/${id}`}
          underline="hover"
          color="#00c1db"
          sx={{ mr: 1, ml: 1 }}
        >
          <Typography variant="body1" color="#00c1db">
            {list?.name || list?.title}
          </Typography>
        </Link>
      </Box>
      {type === "movie" ? (
        <Box
          sx={{
            backgroundColor: "black",
            height: "635px",
            width: "1254px",
            // mt: 10,
            ml: "52px",
            mr: "52px",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {trailer ? (
            <ReactPlayer
              url={`https://www.youtube.com/embed/${trailer}`}
              width="1260px"
              height="640px"
              controls={true}
            />
          ) : (
            <>
              <img
                src={exclamation}
                alt="exclamation mark icon"
                style={{ height: 30, marginRight: 10 }}
              />
              <Typography variant="body1" color="#fbfafb" sx={{ fontSize: 25 }}>
                No Video
              </Typography>
            </>
          )}
        </Box>
      ) : (
        <Box
          // border={1}
          sx={{
            display: "flex",
            ml: "52px",
            mr: "52px",
            height: "635px",
            maxWidth: "1254px",
          }}
        >
          <Box
            // border={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              borderBottomLeftRadius: "10px",
              borderTopLeftRadius: "10px",
              width: "388px",
              overflow: "hidden",
              // backgroundColor: "rgba(186, 186, 187, 0.1)",
            }}
          >
            <Box
              // border={1}
              sx={{
                height: "63px",
                // width: "31vw",
                display: "flex",
                alignItems: "center",
                marginBottom: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <Typography
                variant="body1"
                color="#fbfafb"
                sx={{
                  ml: "12px",
                  mr: "10px",
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
                position: "relative",
                flex: 1,
                overflowY: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                // scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  width: "2px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "0px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&:hover": {
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                },
              }}
            >
              {list &&
                list[`season/${selectedSeason}`]?.episodes.map(
                  (item, index) => (
                    <ToolTip
                      key={index}
                      title={item.name}
                      sx={{
                        color: "rgba(255, 255, 255, 1)",
                        borderRadius: "0px",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setSelectedEpisode(index + 1),
                            updateSearchParams({ ep: item.episode_number });
                        }}
                        sx={{
                          width: "100%",
                          height: "52px",
                          textTransform: "none",
                          borderRadius: 0,
                          backgroundColor:
                            index % 2 === 0
                              ? null
                              : "rgba(255, 255, 255, 0.05)",
                          "&:active": {
                            transform: "scale(0.98)",
                          },
                          "&:hover": {
                            background: "#464749",
                          },
                        }}
                        disableRipple
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              textAlign: "left",
                              mr: 1,
                              fontSize: "14px",
                              color:
                                selectedEpisode - 1 === index
                                  ? "#00c1db"
                                  : "#fbfafb",
                            }}
                          >
                            {item.episode_number}.
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              mr: "auto",
                              fontSize: "14px",
                              color:
                                selectedEpisode - 1 === index
                                  ? "#00c1db"
                                  : "#fbfafb",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.name}
                          </Typography>
                          {selectedEpisode - 1 == index && (
                            <>
                              <img
                                src={circle}
                                alt="circle icon"
                                style={{
                                  height: 20,
                                }}
                              />
                              <img
                                src={play}
                                alt="play icon"
                                style={{
                                  position: "absolute",
                                  right: 4,
                                  height: 12,
                                  top: 4,
                                }}
                              />
                            </>
                          )}
                        </Box>
                      </Button>
                    </ToolTip>
                  )
                )}
            </Box>
          </Box>
          <Box
            // border={1}
            sx={{
              maxWidth: "942px",
              height: "635px",
            }}
          >
            <Box
              // border={1}
              sx={{
                position: "relative",
                backgroundColor: "black",
                height: "496px",
                width: "942px",
                ml: "2px",
                borderTopRightRadius: "10px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {trailer && videoNumber !== 0 && (
                <IconButton
                  onClick={() => setVideoNumber((prev) => prev - 1)}
                  sx={{
                    position: "absolute",
                    // top: "50%",
                    left: 0,
                  }}
                >
                  <img src={leftArrow} alt="left arrow" />
                </IconButton>
              )}
              {trailer && videoNumber !== list?.videos?.results?.length - 1 && (
                <IconButton
                  onClick={() => setVideoNumber((prev) => prev + 1)}
                  sx={{
                    position: "absolute",
                    // top: "50%",
                    right: 0,
                  }}
                >
                  <img src={rightArrow} alt="right arrow" />
                </IconButton>
              )}
              {trailer ? (
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${trailer}`}
                  width="100%"
                  height="100%"
                  controls={true}
                />
              ) : (
                <>
                  <img
                    src={exclamation}
                    alt="exclamation mark icon"
                    style={{ height: 30, marginRight: 10 }}
                  />
                  <Typography
                    variant="body1"
                    color="#fbfafb"
                    sx={{ fontSize: 25 }}
                  >
                    No Video
                  </Typography>
                </>
              )}
            </Box>
            <Box
              // border={1}
              sx={{
                ml: "2px",
                backgroundColor: "rgba(186, 186, 187, 0.1)",
                borderBottomRightRadius: "10px",
                mt: "2px",
                width: "942px",
                height: "137px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                // border={1}
                sx={{
                  borderRadius: "12px",
                  position: "relative",
                  ml: "4px",
                  display: "flex",
                  alignItems: "center",
                  // maxWidth: "100%",
                  width: "848px",
                  paddingRight: 10,
                  overflow: "hidden",
                }}
              >
                {position !== 0 && (
                  <IconButton
                    onClick={handleLeftArrow}
                    sx={{
                      position: "absolute",
                      height: "114px",
                      borderRadius: 0,
                      borderTopLeftRadius: "12px",
                      borderBottomLeftRadius: "12px",
                      width: "54px",
                      zIndex: 100,
                      left: 0,
                      background:
                        "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.8))",
                      "&:hover": {
                        background:
                          "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.9))",
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
                {!disable && seasons?.length > 4 && (
                  <IconButton
                    onClick={handleRightArrow}
                    sx={{
                      position: "absolute",
                      height: "114px",
                      borderRadius: 0,
                      borderTopRightRadius: "12px",
                      borderBottomRightRadius: "12px",
                      width: "54px",
                      zIndex: 100,
                      right: 0,
                      background:
                        "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.8))",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.9))",
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
                  style={{ transform: `translate3d(${position}px, 0, 0)` }}
                >
                  {seasons?.map((item, index) => (
                    <Button
                      onClick={() => (
                        setSelectedSeason(index + 1),
                        setSelectedEpisode(1),
                        setRefresh(!refresh),
                        setSearchParams({ season: item.season_number })
                      )}
                      key={index}
                      sx={{
                        display: "inline-block",
                        position: "relative",
                        height: "114px",
                        width: "226.5px",
                        borderRadius: "12px",
                        marginRight: "8px",
                        backgroundImage: `url(https://image.tmdb.org/t/p/w342${item.poster_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        textTransform: "none",
                      }}
                      disableRipple
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          height: "114px",
                          width: "226.5px",
                          top: 0,
                          left: 0,
                          backgroundColor:
                            index === selectedSeason - 1
                              ? "rgba(0,0,0,0.7)"
                              : "rgba(0,0,0,0.3)",
                          borderRadius: "12px",
                          zIndex: 1,
                        }}
                      />
                      {index === selectedSeason - 1 && (
                        <>
                          <img
                            src={circle}
                            alt="circle icon"
                            style={{
                              position: "absolute",
                              // transform: "translate(-50%, -50%)",
                              height: 30,
                              top: 6,
                              right: 6,
                              zIndex: 100,
                            }}
                          />
                          <img
                            src={play}
                            alt="play icon"
                            style={{
                              position: "absolute",
                              // transform: "translate(-50%, -50%)",
                              height: 16,
                              top: 13,
                              right: 12,
                              zIndex: 200,
                            }}
                          />
                        </>
                      )}

                      <Box
                        sx={{
                          position: "absolute",
                          maxWidth: "14.5vw",
                          zIndex: 2,
                          top: 6,
                          borderRadius: "6px",
                          backgroundColor: "rgba(0,0,0,0.6)",
                          padding: "2px 8px",
                          textWrap: "wrap",
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
                          {item.season_number}. {item.name}
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
          // position: "absolute",
          top: 500,
          // width: "100%",
          height: "1px",
          borderBottom: "0.5px solid",
          borderColor: "white",
          width: 1254,
          zIndex: 100,
          opacity: 0.1,
        }}
      />
      <RecommendationsGrid />
    </Box>
  );
};

export default Watch;
