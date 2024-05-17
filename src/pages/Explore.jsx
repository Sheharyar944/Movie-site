import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";
import Grid from "../components/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Fade from "@mui/material/Fade";
import tick from "../assets/tick.png";
import expand from "../assets/expand.png";

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getMovieList } = useGetMovieLists();
  const [list, setList] = useState();
  const [genreList, setGenreList] = useState("");
  const [countryList, setCountryList] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE4, setAnchorE4] = useState(null);
  const [anchorE5, setAnchorE5] = useState(null);

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
      type: params.get("type") || "",
      genre: parseInt(params.get("genre")) || "",
      year: parseInt(params.get("year")) || "",
      sort: params.get("sort") || "",
      country: params.get("country") || "",
    };
  };
  const initialParams = getQueryParams();

  const filteredGenre =
    genreList &&
    genreList.genres.reduce(
      (accumulator, item) =>
        item.id === initialParams.genre ? item.name : accumulator,
      "Any"
    );

  const [genreName, setGenreName] = useState(filteredGenre);
  const [sortName, setSortName] = useState("Most Popular");
  // const [countryName, setCountryName] = useState("");
  const [typeName, setTypeName] = useState(
    initialParams.type === "tv" ? "Show" : initialParams.type
  );
  const [type, setType] = useState(initialParams.type);
  const [genre, setGenre] = useState(
    initialParams.genre ? initialParams.genre : "Any"
  );
  const [year, setYear] = useState(
    initialParams.year ? initialParams.year : "Any"
  );
  const [sort, setSort] = useState(
    initialParams.sort ? initialParams.sort : "popularity.desc"
  );
  const [country, setCountry] = useState(
    initialParams.country ? initialParams.country : "Any"
  );

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

    return `${location.pathname}?${params}`;
  };

  const constructApiUrl = () => {
    const baseUrl = "https://api.themoviedb.org/3/discover/";
    const params = new URLSearchParams({
      language: "en-US",
      page: "1",
    });
    if (genre && genre !== "Any") {
      params.append("with_genres", genre);
    }
    if (year && year !== "Any" && type === "tv") {
      params.append("first_air_date_year", year);
    } else if (year && year !== "Any") {
      params.append("primary_release_year", year);
    }
    if (sort) {
      params.append("sort_by", sort);
    }
    if (country && country !== "Any") {
      params.append("with_origin_country", country);
    }
    return `${baseUrl}${type}?${params}`;
  };

  useEffect(() => {
    console.log("yes please");
    const url = constructBrowserUrl();
    const apiUrl = constructApiUrl();
    navigate(url, { replace: true });
    getList(apiUrl, setList);
  }, [type, genre, year, sort, country]);

  useEffect(() => {
    const newType = getQueryParams();
    setType(newType.type);
    setTypeName(newType.type === "tv" ? "Show" : newType.type);
  }, [location.search]);

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

  const handleClick = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (setAnchor) => {
    setAnchor(null);
  };

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
    <Box sx={{ mt: "46px", mx: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Box>
            <Typography variant="body1" color="#fbfafb">
              TYPE
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
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
                <Typography variant="body1" color="#fbfafb">
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
                onClick={() => (
                  setType(item.id), setAnchorEl(null), setTypeName(item.name)
                )}
                sx={{
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
            <Typography variant="body1" color="#fbfafb">
              GENRE
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE2(event.currentTarget)}
              sx={{
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
                <Typography variant="body1" color="#fbfafb">
                  {filteredGenre || genreName}
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
            sx={{ maxHeight: 200, mt: "4px" }}
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
                      width: 248,
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
            <Typography variant="body1" color="#fbfafb">
              Year
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE3(event.currentTarget)}
              sx={{
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
                <Typography variant="body1" color="#fbfafb">
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
            sx={{ maxHeight: 200, mt: "4px" }}
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
                  width: 248,
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
            <Typography variant="body1" color="#fbfafb">
              SORT BY
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE4(event.currentTarget)}
              sx={{
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
                <Typography variant="body1" color="#fbfafb">
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
            sx={{ maxHeight: 200, mt: "4px" }}
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
                  width: 248,
                  fontSize: "14px",
                  color: sort === item.value ? "#49e4d7" : "#fbfafb", // Change text color
                  pl: sort === item.value ? "0px" : "44px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#272a34", // Change background color on hover
                    color: "#49e4d7", // Change text color on hover
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
            <Typography variant="body1" color="#fbfafb">
              COUNTRY
            </Typography>
            <Button
              variant="contained"
              onClick={(event) => setAnchorE5(event.currentTarget)}
              sx={{
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
                <Typography variant="body1" color="#fbfafb">
                  {country}
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
            anchorEl={anchorE5}
            open={Boolean(anchorE5)}
            onClose={() => setAnchorE5(null)}
            sx={{ maxHeight: 200, mt: "4px" }}
            PaperProps={{
              style: {
                backgroundColor: "#1b1f29",
              },
            }}
          >
            {countryList &&
              [{ english_name: "Any" }]
                .concat(countryList)
                .map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => (
                      setCountry(item.iso_3166_1),
                      setAnchorE5(null),
                      setCountryName(item.english_name)
                    )}
                    sx={{
                      width: 248,
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

        {/* <DropDownButton
          list={media}
          type="TYPE"
          onClick={(event) => setAnchorE2(event.currentTarget)}
          anchorEl={anchorE2}
          onClose={() => setAnchorE2(null)}
        /> */}
      </Box>
      {/* <SelectMenu /> */}
      <Grid data={list} />
    </Box>
  );
};

export default Explore;
