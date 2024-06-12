import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import logo from "../assets/logo.png";
import crab from "../assets/crab.png";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import heart from "../assets/heart.png";
import github from "../assets/github.png";
import whiteLeftArrow from "../assets/whiteLeftArrow.png";
import SearchBar from "./SearchBar";

const Root = () => {
  // search bar styling starts here
  const { pathname, search } = useLocation();
  const path = pathname + search;
  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "300px",
      height: 30,
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  // search bar styling ends here

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            pathname.startsWith("/info") || pathname.startsWith("/watch")
              ? "rgba(0, 0, 0, 0.3)"
              : "transparent",
          boxShadow: "none",
          zIndex: 1000,
          height: "10vh",
        }}
      >
        <Toolbar
          variant="dense"
          style={{ padding: "0px", marginLeft: "5.1vw", height: "10vh" }}
        >
          {!(pathname === "/") ? (
            <Link
              to="/"
              style={{
                marginRight: "auto",
                textDecoration: "none",
                display: "flex",
              }}
            >
              <img
                src={whiteLeftArrow}
                alt="arrow left blue"
                style={{
                  width: "2vw",
                  marginRight: "1.5vw",
                  textDecoration: "none",
                }}
              />
              <Typography
                // variant="h5"
                color="#fbfafb"
                component="div"
                sx={{ fontWeight: 800, fontSize: "1.7vw" }}
              >
                Flixer
              </Typography>
            </Link>
          ) : (
            <Link
              to="/"
              style={{ marginRight: "auto", textDecoration: "none" }}
            >
              <Typography
                // variant="h5"
                color="#fbfafb"
                component="div"
                sx={{ fontWeight: 800, fontSize: "1.7vw" }}
              >
                Flixer
              </Typography>
            </Link>
          )}
          <Button
            onClick={() => navigate("/")}
            sx={{
              marginRight: "2.2vw",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .hoverBox": {
                position: "absolute",
                top: "5.3vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: "0.5vh",
              },
            }}
            disableRipple
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: path === "/" ? "#00c1db" : "#fbfafb",
                  fontWeight: 700,
                  fontSize: "1.2vw",
                }}
              >
                Home
              </Typography>
              {!(path === "/") && (
                <Box
                  className="hoverBox"
                  sx={{
                    width: "80%",
                    height: 0,
                    backgroundColor: "#00c1db",
                  }}
                />
              )}
            </Box>
          </Button>
          <Button
            onClick={() => navigate("/explore?type=movie")}
            sx={{
              marginRight: "2.2vw",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .hoverBox": {
                position: "absolute",
                top: "5.3vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: "0.5vh",
              },
            }}
            disableRipple
          >
            <Box sx={{ overflow: "hidden" }}>
              <Typography
                variant="body1"
                sx={{
                  color: path.startsWith("/explore?type=movie")
                    ? "#00c1db"
                    : "#fbfafb",
                  fontWeight: 700,
                  fontSize: "1.2vw",
                }}
              >
                Movies
              </Typography>
              {!path.startsWith("/explore?type=movie") && (
                <Box
                  className="hoverBox"
                  sx={{
                    width: "80%",
                    height: 0,
                    backgroundColor: "#00c1db",
                  }}
                />
              )}
            </Box>
          </Button>
          <Button
            onClick={() => navigate("/explore?type=tv")}
            sx={{
              marginRight: "2.2vw",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .hoverBox": {
                position: "absolute",
                top: "5.3vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: "0.5vh",
              },
            }}
            disableRipple
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: path.startsWith("/explore?type=tv")
                    ? "#00c1db"
                    : "#fbfafb",
                  fontWeight: 700,
                  fontSize: "1.2vw",
                }}
              >
                Tv Shows
              </Typography>
              {!path.startsWith("/explore?type=tv") && (
                <Box
                  className="hoverBox"
                  sx={{
                    width: "80%",
                    height: 0,
                    backgroundColor: "#00c1db",
                  }}
                />
              )}
            </Box>
          </Button>
          <IconButton
            href="https://github.com/Sheharyar944"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              marginRight: "3.2vw",
              "& .hoverBox": {
                position: "absolute",
                top: "5.6vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: "0.5vh",
              },
            }}
            disableRipple
          >
            <img src={github} alt="logo" style={{ height: "1.8vw" }} />
            <Box
              className="hoverBox"
              sx={{
                width: "70%",
                height: 0,
                backgroundColor: "#00c1db",
              }}
            />
          </IconButton>
          <SearchBar />
          <IconButton sx={{ marginRight: "3.6vw", ml: "3.2vw" }}>
            <img src={crab} alt="logo" style={{ height: "3vw" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
      <Box
        // border={1}
        sx={{
          margin: "10.4vh 5.1vw 1.3vh 5.1vw",
          paddingBottom: "3vh",
          display: "flex",
          justifyContent: "space-between",
          borderColor: "white",
        }}
      >
        <Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h5"
              color="#fbfafb"
              sx={{
                fontSize: "2.5vh",
                marginBottom: "1vh",
                marginRight: "1vw",
              }}
            >
              Welcome to Flixer
            </Typography>
            <img
              src={heart}
              alt="heart"
              style={{ height: "3vh", marginTop: "0.2vh" }}
            />
          </Box>
          <Typography
            variant="body1"
            color="#ababab"
            sx={{ fontSize: "1.8vh", marginBottom: "1vh" }}
          >
            This site does not store any files on our server, we only linked to
            the media which is hosted on 3rd party services.
          </Typography>
          <Typography
            variant="body1"
            color="#ababab"
            sx={{ fontSize: "1.8vh" }}
          >
            Copyright ©Flixer 2024
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MuiLink
            href="https://github.com/Sheharyar944"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              fontSize: "2.5vh",
            }}
          >
            <img
              src={github}
              alt="github icon"
              style={{ height: "5vh", marginRight: "0.4vw" }}
            />
            GitHub
          </MuiLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Root;
