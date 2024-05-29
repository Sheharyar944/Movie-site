import React, { useEffect, useState } from "react";
import Grid from "../components/Grid";
import { Box, Button, Typography } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const Watch = () => {
  const { getMovieList } = useGetMovieLists();
  const { type, id } = useParams();
  const [list, setList] = useState();
  const navigate = useNavigate();

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      `https://api.themoviedb.org/3/${type}/${id}?append_to_response=recommendations%2Ccredits%2Cgenre%2Cvideos&language=en-US`,
      setList
    );
  }, []);

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
  console.log("list", list);

  console.log("key", trailer);

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
          filter: "blur(40px)",
        }}
      >
        {" "}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        ></Box>
      </Box>

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
