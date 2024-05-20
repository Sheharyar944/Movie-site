import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import Grid from "../components/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Fade from "@mui/material/Fade";
import tick from "../assets/tick.png";
import expand from "../assets/expand.png";
import deleteIcon from "../assets/deleteIcon.png";
import leftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";
import doubleLeftArrow from "../assets/doubleLeftArrow.png";
import doubleRightArrow from "../assets/doubleRightArrow.png";
import doubleLeftArrowCyan from "../assets/doubleLeftArrowCyan.png";
import doubleRightArrowCyan from "../assets/doubleRightArrowCyan.png";
import leftArrowCyan from "../assets/leftArrowCyan.png";
import rightArrowCyan from "../assets/rightArrowCyan.png";

const Explore = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { getMovieList } = useGetMovieLists();
  const [list, setList] = useState();
  const [genreList, setGenreList] = useState("");
  const [countryList, setCountryList] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE4, setAnchorE4] = useState(null);
  const [anchorE5, setAnchorE5] = useState(null);
  const [hover, setHover] = useState(null);

  const media = [
    { name: "movie", id: "movie" },
    { name: "show", id: "tv" },
  ];
  const getYears = () => {
    const yearsArray = ["Any"];
    for (let year = 2024; year >= 1940; year--) {
      yearsArray.push(year);
    }
    return yearsArray;
  };
  const sortList = [
    { name: "Most Popular", value: "popularity.desc" },
    { name: "Latest Release", value: "primary_release_date.desc" },
    { name: "Oldest Release", value: "primary_release_date.asc" },
    { name: "Title Asc", value: "title.asc" },
    { name: "Title Desc", value: "title.desc" },
    { name: "High Rated", value: "vote_average.desc" },
    { name: "Low Rated", value: "vote_average.asc" },
  ];

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      type: params.get("type"),
      genre: parseInt(params.get("genre")) || "Any",
      year: parseInt(params.get("year")) || "Any",
      sort: params.get("sort") || "popularity.desc",
      country: params.get("country") || "Any",
      page: params.get("page") || 1,
    };
  };
  const [initialParams, setInitialParams] = useState(getQueryParams());

  const filteredGenre =
    genreList &&
    genreList.genres.reduce(
      (accumulator, item) =>
        item.id === initialParams.genre ? item.name : accumulator,
      "Any"
    );

  const filteredSortName =
    sortList &&
    sortList.reduce(
      (accumulator, item) =>
        item.value === initialParams.sort ? item.name : accumulator,
      "Most Popular"
    );

  const [genreName, setGenreName] = useState(filteredGenre);
  const [sortName, setSortName] = useState(filteredSortName);
  const [typeName, setTypeName] = useState(
    initialParams.type === "tv" ? "Show" : initialParams.type
  );
  const [type, setType] = useState(initialParams.type);
  const [genre, setGenre] = useState(initialParams.genre);
  const [year, setYear] = useState(initialParams.year);
  const [sort, setSort] = useState(initialParams.sort);
  const [country, setCountry] = useState(initialParams.country);
  const [page, setPage] = useState(initialParams.page);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setInitialParams(getQueryParams());
    setType(getQueryParams().type);
    setGenre(getQueryParams().genre);
    setYear(getQueryParams().year);
    setSort(getQueryParams().sort);
    setCountry(getQueryParams().country);
    setPage(getQueryParams().page);
  }, [location.search]);

  const constructParams = () => {
    const newParams = {};
    if (type) {
      newParams["type"] = type;
    }
    if (genre !== "Any") {
      newParams["genre"] = genre;
    }
    if (year !== "Any") {
      newParams["year"] = year;
    }
    if (sort !== "Any") {
      newParams["sort"] = sort;
    }
    if (country !== "Any") {
      newParams["country"] = country;
    }
    if (page) {
      newParams["page"] = page;
    }
    return newParams;
  };

  const constructBrowserUrl = () => {
    const params = new URLSearchParams();
    if (type) {
      params.append("type", type);
    }
    if (genre !== "Any") {
      params.append("genre", genre);
    }
    if (year !== "Any") {
      params.append("year", year);
    }
    if (sort !== "Any") {
      params.append("sort", sort);
    }
    if (country !== "Any") {
      params.append("country", country);
    }
    params.append("page", page);

    return `${location.pathname}?${params}`;
  };

  const constructApiUrl = () => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const params = new URLSearchParams({
      language: "en-US",
      page: page,
    });
    if (genre && genre !== "Any") {
      params.append("with_genres", genre);
    }
    if (year && year !== "Any" && type === "tv") {
      params.append("first_air_date_year", year);
    } else if (year && year !== "Any") {
      params.append("primary_release_year", year);
    }
    if (sort && sort !== "Any") {
      params.append("sort_by", sort);
    }
    if (country && country !== "Any") {
      params.append("with_origin_country", country);
    }
    return `${baseUrl}${type}?${params}`;
  };

  useEffect(() => {
    // const url = constructBrowserUrl();
    console.log("I am dumb thats why i am working", genre);
    const newParams = constructParams();
    setSearchParams(newParams);
    const apiUrl = constructApiUrl();
    // navigate(url, { replace: true });
    getList(apiUrl, setList);
  }, [type, genre, year, sort, country, page]);

  // useEffect(() => {
  //   const apiUrl = constructApiUrl();
  //   console.log("apiUrl:", apiUrl);
  //   getList(apiUrl, setList);
  // }, [type]);

  useEffect(() => {
    setGenre("Any");
    setGenreName("Any");
    setSortName("Most Popular");
    setTypeName(type === "tv" ? "Show" : type);
  }, [type]);

  // useEffect(() => {
  //   const newType = getQueryParams();
  //   setType(newType.type);
  //   setTypeName(newType.type === "tv" ? "Show" : newType.type);
  // }, [location.search]);

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    getList(
      `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
      setGenreList
    );
  }, [type]);

  useEffect(() => {
    getList(
      ` https://api.themoviedb.org/3/configuration/countries?language=en-US`,
      setCountryList
    );
  }, []);

  // const DropDownButton = ({ list, type, onClick, anchorEl, onClose }) => (
  //   <>
  //     <Box>
  //       <Typography variant="body1" color="#fbfafb">
  //         {type}
  //       </Typography>
  //       <Button
  //         variant="contained"
  //         onClick={onClick}
  //         sx={{
  //           borderRadius: "8px",
  //           width: 248,
  //           height: 36,
  //           backgroundColor: "#1b1f29",
  //           transition: "transform 1s ease",
  //           "&:hover": {
  //             backgroundColor: "#1b1f29",
  //           },
  //           "&:active": {
  //             transform: "scale(0.98)",
  //           },
  //         }}
  //         disableRipple
  //       >
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "space-between",
  //             alignItems: "center",
  //             width: "100%",
  //             textTransform: "capitalize",
  //           }}
  //         >
  //           <Typography variant="body1" color="#fbfafb">
  //             {mediaType}
  //           </Typography>
  //           <img
  //             src={expand}
  //             alt="play"
  //             style={{ height: 16, transform: "rotate(90deg)" }}
  //           />
  //         </Box>
  //       </Button>
  //     </Box>
  //     <Menu
  //       TransitionComponent={Fade}
  //       transitionDuration={200}
  //       anchorEl={anchorEl}
  //       open={Boolean(anchorEl)}
  //       onClose={onClose}
  //       sx={{ maxHeight: 200, mt: "4px" }}
  //       PaperProps={{
  //         style: {
  //           backgroundColor: "#1b1f29",
  //         },
  //       }}
  //     >
  //       {list.map((item, index) => (
  //         <MenuItem
  //           key={index}
  //           onClick={() => handleSelect(item)}
  //           sx={{
  //             width: 248,
  //             fontSize: "14px",
  //             color: mediaType === item ? "#49e4d7" : "#fbfafb", // Change text color
  //             pl: mediaType === item ? "0px" : "44px",
  //             textTransform: "capitalize",
  //             "&:hover": {
  //               backgroundColor: "#272a34", // Change background color on hover
  //               color: "#49e4d7", // Change text color on hover
  //             },
  //           }}
  //         >
  //           {mediaType === item && (
  //             <img
  //               src={tick}
  //               alt="tick"
  //               style={{ height: 20, marginRight: 10, marginLeft: "14px" }}
  //             />
  //           )}
  //           {item}
  //         </MenuItem>
  //       ))}
  //     </Menu>
  //   </>
  // );

  return (
    <Box sx={{ mt: "50px", mx: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "50px",
        }}
      >
        <Box>
          <Box>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                opacity: 0.7,
              }}
            >
              TYPE
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                padding: 1,
                borderRadius: "8px",
                width: 248,
                height: 36,
                backgroundColor: "#1b1f29",
                transition: "transform 1s ease",
                "&:hover": {
                  backgroundColor: "#1b1f29",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              disableRipple
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    fontSize: "14px",
                    opacity: 0.9,
                  }}
                >
                  {typeName}
                </Typography>
                <img
                  src={expand}
                  alt="play"
                  style={{ height: 16, transform: "rotate(90deg)" }}
                />
              </Box>
            </Button>
          </Box>
          <Menu
            TransitionComponent={Fade}
            transitionDuration={200}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            sx={{ maxHeight: 200, mt: "4px" }}
            PaperProps={{
              style: {
                backgroundColor: "#1b1f29",
              },
            }}
          >
            {media.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  setType(item.id);
                  setAnchorEl(null);
                  setTypeName(item.name);
                  // navigate(`/explore?${item.id}`);
                  if (type !== item.id) {
                    setGenre("Any");
                  }
                }}
                sx={{
                  opacity: 0.7,
                  width: 248,
                  fontSize: "14px",
                  color: type === item.id ? "#49e4d7" : "#fbfafb", // Change text color
                  pl: type === item.id ? "0px" : "44px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#272a34", // Change background color on hover
                    color: "#49e4d7", // Change text color on hover
                  },
                }}
              >
                {type === item.id && (
                  <img
                    src={tick}
                    alt="tick"
                    style={{ height: 20, marginRight: 10, marginLeft: "14px" }}
                  />
                )}
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box>
          <Box>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                opacity: 0.7,
              }}
            >
              GENRE
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE2(event.currentTarget)}
              sx={{
                padding: 1,

                borderRadius: "8px",
                width: 248,
                height: 36,
                backgroundColor: "#1b1f29",
                transition: "transform 1s ease",
                "&:hover": {
                  backgroundColor: "#1b1f29",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              disableRipple
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    fontSize: "14px",
                    opacity: 0.9,
                  }}
                >
                  {genreName || filteredGenre}
                </Typography>
                <img
                  src={expand}
                  alt="play"
                  style={{ height: 16, transform: "rotate(90deg)" }}
                />
              </Box>
            </Button>
          </Box>
          <Menu
            TransitionComponent={Fade}
            transitionDuration={200}
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={() => setAnchorE2(null)}
            sx={{ maxHeight: 350, mt: "4px" }}
            PaperProps={{
              style: {
                backgroundColor: "#1b1f29",
              },
            }}
          >
            {genreList &&
              [{ name: "Any", id: "Any" }]
                .concat(genreList.genres)
                .map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => (
                      setGenre(item.id),
                      setAnchorE2(null),
                      setGenreName(item.name)
                    )}
                    sx={{
                      opacity: 0.7,
                      width: 241,
                      fontSize: "14px",
                      color: genre === item.id ? "#49e4d7" : "#fbfafb", // Change text color
                      pl: genre === item.id ? "0px" : "44px",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#272a34", // Change background color on hover
                        color: "#49e4d7", // Change text color on hover
                      },
                    }}
                  >
                    {genre === item.id && (
                      <img
                        src={tick}
                        alt="tick"
                        style={{
                          height: 20,
                          marginRight: 10,
                          marginLeft: "14px",
                        }}
                      />
                    )}
                    {item.name}
                  </MenuItem>
                ))}
          </Menu>
        </Box>

        <Box>
          <Box>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                opacity: 0.7,
              }}
            >
              Year
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE3(event.currentTarget)}
              sx={{
                padding: 1,

                borderRadius: "8px",
                width: 248,
                height: 36,
                backgroundColor: "#1b1f29",
                transition: "transform 1s ease",
                "&:hover": {
                  backgroundColor: "#1b1f29",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              disableRipple
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    fontSize: "14px",
                    opacity: 0.9,
                  }}
                >
                  {year}
                </Typography>
                <img
                  src={expand}
                  alt="play"
                  style={{ height: 16, transform: "rotate(90deg)" }}
                />
              </Box>
            </Button>
          </Box>
          <Menu
            TransitionComponent={Fade}
            transitionDuration={200}
            anchorEl={anchorE3}
            open={Boolean(anchorE3)}
            onClose={() => setAnchorE3(null)}
            sx={{ maxHeight: 350, mt: "4px" }}
            PaperProps={{
              style: {
                backgroundColor: "#1b1f29",
              },
            }}
          >
            {getYears().map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => (setYear(item), setAnchorE3(null))}
                sx={{
                  opacity: 0.7,
                  width: 241,
                  fontSize: "14px",
                  color: year === item ? "#49e4d7" : "#fbfafb", // Change text color
                  pl: year === item ? "0px" : "44px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#272a34", // Change background color on hover
                    color: "#49e4d7", // Change text color on hover
                  },
                }}
              >
                {year === item && (
                  <img
                    src={tick}
                    alt="tick"
                    style={{ height: 20, marginRight: 10, marginLeft: "14px" }}
                  />
                )}
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box>
          <Box>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                opacity: 0.7,
              }}
            >
              SORT BY
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE4(event.currentTarget)}
              sx={{
                padding: 1,
                borderRadius: "8px",
                width: 248,
                height: 36,
                backgroundColor: "#1b1f29",
                transition: "transform 1s ease",
                "&:hover": {
                  backgroundColor: "#1b1f29",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              disableRipple
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    fontSize: "14px",
                    opacity: 0.9,
                  }}
                >
                  {sortName}
                </Typography>
                <img
                  src={expand}
                  alt="play"
                  style={{ height: 16, transform: "rotate(90deg)" }}
                />
              </Box>
            </Button>
          </Box>
          <Menu
            TransitionComponent={Fade}
            transitionDuration={200}
            anchorEl={anchorE4}
            open={Boolean(anchorE4)}
            onClose={() => setAnchorE4(null)}
            sx={{ maxHeight: 350, mt: "4px" }}
            PaperProps={{
              style: {
                backgroundColor: "#1b1f29",
              },
            }}
          >
            {sortList.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => (
                  setSort(item.value), setAnchorE4(null), setSortName(item.name)
                )}
                sx={{
                  opacity: 0.7,
                  width: 248,
                  fontSize: "14px",
                  color: sort === item.value ? "#49e4d7" : "#fbfafb",
                  pl: sort === item.value ? "0px" : "44px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#272a34",
                    color: "#49e4d7",
                  },
                }}
              >
                {sort === item.value && (
                  <img
                    src={tick}
                    alt="tick"
                    style={{ height: 20, marginRight: 10, marginLeft: "14px" }}
                  />
                )}
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box>
          <Box>
            <Typography
              variant="body1"
              color="#fbfafb"
              sx={{
                fontSize: "14px",
                opacity: 0.7,
              }}
            >
              COUNTRY
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE5(event.currentTarget)}
              sx={{
                padding: 1,
                borderRadius: "8px",
                width: 248,
                height: 36,
                backgroundColor: "#1b1f29",
                transition: "transform 1s ease",
                "&:hover": {
                  backgroundColor: "#1b1f29",
                },
                "&:active": {
                  transform: "scale(0.98)",
                },
              }}
              disableRipple
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  textTransform: "capitalize",
                }}
              >
                <Typography
                  variant="body1"
                  color="#fbfafb"
                  sx={{
                    fontSize: "14px",
                    opacity: 0.9,
                  }}
                >
                  {country}
                </Typography>
                <img
                  src={expand}
                  alt="play"
                  style={{
                    height: 16,
                    width: 16,
                    transform: "rotate(90deg)",
                  }}
                />
              </Box>
            </Button>
          </Box>
          <Menu
            TransitionComponent={Fade}
            transitionDuration={200}
            anchorEl={anchorE5}
            open={Boolean(anchorE5)}
            onClose={() => setAnchorE5(null)}
            sx={{ maxHeight: 350, mt: "4px" }}
            PaperProps={{
              style: {
                backgroundColor: "#1b1f29",
              },
            }}
          >
            {countryList &&
              [{ iso_3166_1: "Any", english_name: "Any" }]
                .concat(countryList)
                .map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => (
                      setCountry(item.iso_3166_1), setAnchorE5(null)
                    )}
                    sx={{
                      opacity: 0.7,
                      width: 241,
                      fontSize: "14px",
                      color:
                        country === item.english_name ? "#49e4d7" : "#fbfafb", // Change text color
                      pl: country === item.english_name ? "0px" : "44px",
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: "#272a34", // Change background color on hover
                        color: "#49e4d7", // Change text color on hover
                      },
                    }}
                  >
                    {country === item.english_name && (
                      <img
                        src={tick}
                        alt="tick"
                        style={{
                          height: 20,
                          marginRight: 10,
                          marginLeft: "14px",
                        }}
                      />
                    )}
                    {item.english_name}
                  </MenuItem>
                ))}
          </Menu>
        </Box>

        <IconButton
          onClick={() => (
            setGenre("Any"),
            setYear("Any"),
            setCountry("Any"),
            setSort("popularity.desc"),
            setSortName("Most popular")
          )}
          sx={{
            backgroundColor: "#1b1f29",
            borderRadius: "8px",
            height: 36,
            marginTop: "auto",
            "&:hover": {
              backgroundColor: "#1b1f29",
            },
          }}
        >
          <img src={deleteIcon} alt="delete" style={{ height: "20px" }} />
        </IconButton>
      </Box>

      <Grid data={list} type={getQueryParams().type} />
      <Box sx={{ display: "flex", justifyContent: "center", gap: "1px" }}>
        <IconButton
          onMouseEnter={() => setHover(1)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setPage(1)}
          disabled={page === 1}
          sx={{
            backgroundColor: "#1b1f29",
            borderRadius: "0px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
            height: 40,
            width: 50,
            "&:hover": {
              backgroundColor: "rgba(27, 31, 41, 0.5)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(27, 31, 41, 0.4)",
            },
          }}
        >
          <img
            src={hover === 1 ? doubleLeftArrowCyan : doubleLeftArrow}
            alt="double left arrow"
            style={{ height: 20 }}
          />
        </IconButton>
        <IconButton
          onClick={() => setPage(page - 1)}
          onMouseEnter={() => setHover(2)}
          onMouseLeave={() => setHover(null)}
          disabled={page === 1}
          sx={{
            backgroundColor: "#1b1f29",
            borderRadius: "0px",
            height: 40,
            width: 50,
            "&:hover": {
              backgroundColor: "rgba(27, 31, 41, 0.5)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(27, 31, 41, 0.4)",
            },
          }}
        >
          <img
            src={hover === 2 ? leftArrowCyan : leftArrow}
            alt="double left arrow"
            style={{ height: 20 }}
          />
        </IconButton>

        <Box
          sx={{
            width: 50,
            height: 40,
            backgroundColor: "#1b1f29",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" color="#fbfafb" fontSize={20}>
            {page}
          </Typography>
        </Box>

        <IconButton
          onClick={() => setPage(parseInt(page) + 1)}
          onMouseEnter={() => setHover(3)}
          onMouseLeave={() => setHover(null)}
          disabled={page === 500 || (list && list.total_pages === page)}
          sx={{
            backgroundColor: "#1b1f29",
            borderRadius: "0px",
            height: 40,
            width: 50,
            "&:hover": {
              backgroundColor: "rgba(27, 31, 41, 0.5)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(27, 31, 41, 0.4)",
            },
          }}
        >
          <img
            src={hover === 3 ? rightArrowCyan : rightArrow}
            alt="double left arrow"
            style={{ height: 20 }}
          />
        </IconButton>
        <IconButton
          onClick={() =>
            setPage(list.total_pages > 500 ? 500 : list.total_pages)
          }
          onMouseEnter={() => setHover(4)}
          onMouseLeave={() => setHover(null)}
          disabled={page === 500 || (list && list.total_pages === page)}
          sx={{
            backgroundColor: "#1b1f29",
            borderRadius: "0px",
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
            height: 40,
            width: 50,
            "&:hover": {
              backgroundColor: "rgba(27, 31, 41, 0.5)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(27, 31, 41, 0.4)",
            },
          }}
        >
          <img
            src={hover === 4 ? doubleRightArrowCyan : doubleRightArrow}
            alt="double left arrow"
            style={{ height: 20 }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Explore;
