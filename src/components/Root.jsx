import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Link from "@mui/material/Link";
import useGetMovieLists from "../hooks/useGetMovieLists";
import useGetTrending from "../hooks/useGetTrending";
import heart from "../assets/heart.png";

const Root = () => {
  // search bar styling starts here
  const location = useLocation();

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
      width: "auto",
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

  // Trending Movie starts here
  const { trendingMovie } = useGetTrending();
  const backgroundImageUrl = `https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`;

  console.log("poster", backgroundImageUrl);

  // Trending Movie ends here

  return (
    <Box
    // border={1}
    // sx={{
    //   position: "absolute",
    //   top: 0,
    //   left: 0,
    //   backgroundImage: `url(${backgroundImageUrl})`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundPosition: "center",
    //   backgroundSize: "cover",
    //   height: "100vh",
    //   width: "100%",
    // }}
    >
      {" "}
      <div
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 1)", // Semi-transparent black overlay
        }}
      />
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          zIndex: 1000,
        }}
      >
        <Toolbar variant="dense" style={{ padding: "0px", marginLeft: "70px" }}>
          <Typography
            variant="h5"
            color="#fbfafb"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Flixer
          </Typography>
          <Link href="/" underline="none" sx={{ marginRight: "30px" }}>
            <Typography variant="body1" color="#fbfafb">
              Home
            </Typography>
          </Link>
          <Link href="/" underline="none" sx={{ marginRight: "30px" }}>
            <Typography variant="body1" color="#fbfafb">
              Movies
            </Typography>
          </Link>
          <Link href="/" underline="none" sx={{ marginRight: "30px" }}>
            <Typography variant="body1" color="#fbfafb">
              Tv Shows
            </Typography>
          </Link>

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
          margin: "80px 70px",
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
