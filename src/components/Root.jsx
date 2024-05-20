import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import Link from "@mui/material/Link";
import heart from "../assets/heart.png";
import arrowLeftBlue from "../assets/arrowLeftBlue.png";
import line from "../assets/line.png";

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
      // height: 30,
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
          backgroundColor: pathname.startsWith("/info")
            ? "rgba(0, 0, 0, 0.3)"
            : "transparent",
          boxShadow: "none",
          zIndex: 1000,
        }}
      >
        <Toolbar variant="dense" style={{ padding: "0px", marginLeft: "70px" }}>
          {pathname.startsWith("/info") && (
            <Link to="/">
              <img
                src={arrowLeftBlue}
                alt="arrow left blue"
                style={{
                  width: 30,
                  marginTop: "7px",
                  marginRight: "20px",
                  textDecoration: "none",
                }}
              />
            </Link>
          )}
          <Link to="/" style={{ marginRight: "auto", textDecoration: "none" }}>
            <Typography variant="h5" color="#fbfafb" component="div">
              Flixer
            </Typography>
          </Link>
          <Button
            onClick={() => navigate("/")}
            sx={{
              marginRight: "30px",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .hoverBox": {
                position: "absolute",
                top: 34,
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: 3,
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
              marginRight: "30px",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .hoverBox": {
                position: "absolute",
                top: 34,
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: 3,
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
              marginRight: "30px",
              textDecoration: "none",
              textTransform: "capitalize",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "& .hoverBox": {
                position: "absolute",
                top: 34,
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "height 0.4s ease, opacity 0.4s ease",
              },
              "&:hover .hoverBox": {
                opacity: 1,
                zIndex: 100,
                height: 3,
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

          <Search sx={{ marginRight: "30px" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <IconButton sx={{ marginRight: "50px" }}>
            <img src={logo} alt="logo" style={{ width: "50px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
      <Box
        // border={1}
        sx={{
          margin: "80px 70px 10px 70px",
          paddingBottom: "18px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h5"
            color="#fbfafb"
            sx={{ fontSize: "18px", marginBottom: "8px", marginRight: "8px" }}
          >
            Welcome to Flixer
          </Typography>
          <img
            src={heart}
            alt="heart"
            style={{ height: "20px", marginTop: "2px" }}
          />
        </Box>
        <Typography
          variant="body1"
          color="#ababab"
          sx={{ fontSize: "12px", marginBottom: "8px" }}
        >
          This site does not store any files on our server, we only linked to
          the media which is hosted on 3rd party services.
        </Typography>
        <Typography variant="body1" color="#ababab" sx={{ fontSize: "12px" }}>
          Copyright ©Flixer 2024
        </Typography>
      </Box>
    </Box>
  );
};

export default Root;
