import React, { useState, useEffect, useRef } from "react";
import useGetTrending from "../hooks/useGetTrending";
import hoverPlay from "../assets/hoverPlay.png";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SlideShow = () => {
  const { trending } = useGetTrending();
  const navigate = useNavigate();

  const images =
    trending &&
    trending.results.map(
      (item) => `https://image.tmdb.org/t/p/w342${item.backdrop_path}`
    );

  const length = trending && trending.results.length - 4;

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
          prevIndex === -355 * length - 200
            ? 0
            : prevIndex === -355 * length
            ? -355 * length - 200
            : prevIndex - 355
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  console.log("trending", trending);

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
                borderRadius: "20px",
                marginRight: "10px",
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
                  borderRadius: "20px",
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
                  width: "345px",
                  height: "175px",
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))",
                  borderRadius: "20px",
                }}
              >
                <Box
                  // border={1}
                  sx={{
                    position: "absolute",
                    borderRadius: "20px",
                    width: "100%",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "0 20px 10px 20px",
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      // textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
                      zindex: 1,
                      fontSize: "15px",
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
                      marginTop: "4px",
                      padding: "0 20px",
                      fontSize: "12px",
                      textShadow: "2px 2px 12px rgba(0, 0, 0, 1)",
                    }}
                  >
                    Rating {item.vote_average.toFixed(1)}
                    <span style={{ verticalAlign: "middle", margin: "0 5px" }}>
                      •
                    </span>
                    {(item.release_date || item.first_air_date).split("-")[0]}
                    <span style={{ verticalAlign: "middle", margin: "0 5px" }}>
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
