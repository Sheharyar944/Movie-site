import React, { useState, useEffect, useRef } from "react";
import useGetTrending from "../hooks/useGetTrending";
import hoverPlay from "../assets/hoverPlay.png";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SlideShow = () => {
  const { trending } = useGetTrending();
  const navigate = useNavigate();

  const length = trending && trending.results.length - 4;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  // const resetTimeout = () => {
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //   }
  // };

  useEffect(() => {
    let timerId = null;
    if (length) {
      timerId = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === parseFloat((-25.7 * length).toFixed(1)) - 13
              ? 0
              : prevIndex === parseFloat((-25.7 * length).toFixed(1))
              ? parseFloat((-25.7 * length).toFixed(1)) - 13
              : parseFloat((prevIndex - 25.7).toFixed(1))
          ),
        5000
      );
    }

    return () => clearTimeout(timerId);
  }, [index, length]);

  return (
    <Box
      className="slideshow"
      sx={{
        borderRadius: "20px",
      }}
    >
      <Box
        className="slideshowSlider"
        style={{ transform: `translate3d(${index}vw, 0, 0)` }}
      >
        {trending &&
          trending.results.map((item, index) => (
            <Button
              className="slide"
              onClick={() => navigate(`/info/${item.media_type}/${item.id}`)}
              key={index}
              sx={{
                position: "relative",
                // backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.backdrop_path})`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                width: "25vw",
                height: "27vh",
                borderRadius: "20px",
                marginRight: "0.7vw",
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
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780${item.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "1.5vw",
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
              <img src={hoverPlay} alt="Overlay Image" />
              <Box
                // border={1}
                sx={{
                  position: "absolute",
                  width: "25vw",
                  height: "27vh",
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))",
                  borderRadius: "1.5vw",
                }}
              >
                <Box
                  // border={1}
                  sx={{
                    position: "absolute",
                    borderRadius: "1.5vw",
                    width: "100%",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "0 1.5vw 0.7vw 1.5vw",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      // textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                      zindex: 1,
                      fontSize: "1.1vw",
                      textWrap: "wrap",
                    }}
                    variant="body1"
                    color="#FFFFFF"
                  >
                    {" "}
                    {item.title || item.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="#2dd5fd"
                    sx={{
                      marginTop: "0.2vw",
                      padding: "0 1.5vw",
                      fontSize: "0.9vw",
                      textShadow: "2px 2px 12px rgba(0, 0, 0, 1)",
                    }}
                  >
                    Rating: {item.vote_average.toFixed(1)}
                    <span
                      style={{ verticalAlign: "middle", margin: "0 0.3vw" }}
                    >
                      •
                    </span>
                    {(item.release_date || item.first_air_date).split("-")[0]}
                    <span
                      style={{ verticalAlign: "middle", margin: "0 0.3vw" }}
                    >
                      •
                    </span>
                    {item.original_language.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default SlideShow;
