import React from "react";
import { Box, Button, Typography } from "@mui/material";
import circle from "../assets/circle.png";
import circleGrey from "../assets/circleGrey.png";
import play from "../assets/play.png";
import starGold from "../assets/starGold.png";
import { useNavigate } from "react-router-dom";

const Grid = ({ data, type }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gridAutoRows: "auto",
        gap: "26px",
        marginTop: "12px",
        marginBottom: "100px",
      }}
    >
      {data &&
        data.results.map(
          (item, index) =>
            item.poster_path && (
              <Box key={index}>
                <Button
                  onClick={() =>
                    navigate(`/info/${item.media_type || type}/${item.id}`)
                  }
                  //   onMouseEnter={() => setHoveredIndex(index + 1000)}
                  //   onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    padding: 0,
                    borderRadius: "8px",
                    // backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.poster_path})`,
                    // backgroundSize: "cover",
                    // backgroundPosition: "center",
                    height: 330,
                    width: 230,
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
                      borderRadius: "8px",
                      opacity: 1,
                      transition: "transform 0.3s ease",
                    },
                    "&:hover::before": {
                      transform: "scale(1.1)",
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
                  <Box
                    sx={{
                      position: "absolute",
                      height: 330,
                      width: 230,
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
                      height: 45,
                    }}
                  />
                  <img
                    src={play}
                    alt="circled play"
                    style={{
                      height: 18,
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
                        marginLeft: 10,
                        paddingBottom: 2,
                        opacity: 1,
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="#fbfafb"
                      sx={{ fontSize: 12, marginLeft: "4px" }}
                    >
                      {item.vote_average !== 0
                        ? item.vote_average.toFixed(1)
                        : "0.0"}
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
                      {item &&
                        (item.release_date || item.first_air_date) &&
                        (item.release_date || item.first_air_date).split(
                          "-"
                        )[0]}

                      <span
                        style={{ verticalAlign: "middle", margin: "0 5px" }}
                      >
                        •
                      </span>
                      {item && item.original_language.toUpperCase()}
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
            )
        )}
    </Box>
  );
};

export default Grid;
