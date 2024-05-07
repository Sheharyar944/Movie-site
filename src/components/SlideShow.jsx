import React, { useState, useEffect, useRef } from "react";
import useGetTrending from "../hooks/useGetTrending";
import hoverPlay from "../assets/hoverPlay.png";
import { Box, Button, Typography } from "@mui/material";

const SlideShow = () => {
  const { trending } = useGetTrending();

  const images =
    trending &&
    trending.results.map(
      (item) => `https://image.tmdb.org/t/p/w342${item.backdrop_path}`
    );

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === -355 * 16 - 200
            ? 0
            : prevIndex === -355 * 16
            ? -355 * 16 - 200
            : prevIndex - 355
        ),
      5000
    );
    console.log("index", index);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <Box
      className="slideshow"
      sx={{
        borderRadius: "20px",
      }}
    >
      <Box
        className="slideshowSlider"
        style={{ transform: `translate3d(${index}px, 0, 0)` }}
      >
        {trending &&
          trending.results.map((movie, index) => (
            <Button
              className="slide"
              key={index}
              sx={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "20px",
                marginRight: "10px",
                textTransform: "none",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: "20px",
                  background: "rgba(0, 0, 0, 0.3)",
                  zindex: 0,
                },
                "&:hover": {
                  border: "2px solid #2dd5fd",
                  backgroundSize: "105%",
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
                },
              }}
            >
              <img src={hoverPlay} alt="Overlay Image" />
              <Box
                sx={{
                  position: "absolute",
                  width: "345px",
                  height: "175px",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "20px",
                }}
              >
                <Typography
                  sx={{
                    marginTop: "120px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    padding: "0 20px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                    zindex: 1,
                  }}
                  variant="body1"
                  color="#FFFFFF"
                >
                  {" "}
                  {movie.title || movie.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="#2dd5fd"
                  sx={{
                    marginTop: "4px",
                    padding: "0 20px",
                    fontSize: "12px",
                    textShadow: "2px 2px 12px rgba(0, 0, 0, 1)",
                  }}
                >
                  Rating {movie.vote_average.toFixed(1)}
                  <span style={{ verticalAlign: "middle", margin: "0 5px" }}>
                    •
                  </span>
                  {(movie.release_date || movie.first_air_date).split("-")[0]}
                  <span style={{ verticalAlign: "middle", margin: "0 5px" }}>
                    •
                  </span>
                  {movie.original_language.toUpperCase()}
                </Typography>
              </Box>
            </Button>
          ))}
      </Box>
    </Box>
  );
};

export default SlideShow;
