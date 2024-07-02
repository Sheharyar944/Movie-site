import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import cross from "../assets/cross.png";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import useGetMovieLists from "../hooks/useGetMovieLists";

const SearchBar = () => {
  const navigate = useNavigate();
  const { getMovieList } = useGetMovieLists();
  const [list, setList] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(searchTerm);
  const [filteredList, setFilteredList] = useState();

  const getList = async (url, state) => {
    const list = await getMovieList(url);
    state(list);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedQuery) {
      getList(
        `https://api.themoviedb.org/3/search/multi?query=${searchTerm}`,
        setList
      );
    }
  }, [debouncedQuery]);

  useEffect(() => {
    const filteredList = list?.results?.filter(
      (item) => !item.hasOwnProperty("known_for")
    );
    setFilteredList(filteredList);
  }, [list]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 100,
      }}
    >
      {/* <Box
        // border={1}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 30,
          width: "100%",
          zIndex: 100,
          backgroundColor: "rgba(255,255,255,0.3)",

          //   filter: "blur(100px)",
        }}
      /> */}
      <img
        style={{
          position: "absolute",
          top: "50%",
          left: "0.7vw",
          height: "1.5vw",
          zIndex: 1,
          //   filter: "blur(10px)",
          transform: "translateY(-50%)",
        }}
        src={search}
        alt="search icon"
      />
      {searchTerm && isActive && (
        <IconButton
          onClick={(e) => {
            setSearchTerm("");
          }}
          sx={{
            position: "absolute",
            left: "22.7vw",
            height: "2.2vw",
            zIndex: 1000,
          }}
          disableRipple
        >
          <img src={cross} alt="clear Icon" style={{ height: "1.1vw" }} />
        </IconButton>
      )}
      <input
        style={{
          width: "19vw",
          height: "2.2vw",
          backgroundColor: "rgba(255,255,255,0.2)",
          borderRadius: "0.6vw",
          border: "none",
          outline: "none",
          paddingLeft: "2.9vw",
          paddingRight: "2.9vw",
          fontSize: "1vw",
        }}
        type="text"
        placeholder="Search Anything..."
        value={searchTerm}
        onChange={handleChange}
        onFocus={() => setIsActive(true)}
        onBlur={() => setTimeout(() => setIsActive(false), 300)}
      />

      {isActive && searchTerm && (
        <>
          {filteredList?.length > 0 ? (
            <Box
              //   border={1}
              sx={{
                pt: "1.1vh",
                borderRadius: "0.6vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "black",
                position: "absolute",
                maxHeight: "63vh",
                width: "100%",
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {filteredList?.map((item, index) => (
                <Box key={index}>
                  <Button
                    onClick={() =>
                      navigate(`info/${item.media_type}/${item.id}`)
                    }
                    sx={{
                      padding: "0px",
                      marginBottom: "1.1vh",
                      width: "23.4vw",
                      height: "11.6vh",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      backgroundColor: "#131416",
                      borderRadius: "0.7vw",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    {item.poster_path ||
                    (item &&
                      item.known_for &&
                      item.known_for[0] &&
                      item.known_for[0].poster_path) ? (
                      <img
                        style={{
                          borderRadius: "0.7vw",
                          width: "4.4vw",
                          height: "11.6vh",
                          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.4)",
                        }}
                        src={`https://image.tmdb.org/t/p/w185${
                          item.poster_path || item.known_for[0].poster_path
                        }`}
                        alt={`item Poster:${item.original_title}`}
                      />
                    ) : (
                      <Box
                        style={{
                          borderRadius: "0.7vw",
                          width: "4.4vw",
                          height: "11.6vh",
                          backgroundColor: "#2f3032",
                        }}
                      ></Box>
                    )}

                    <Box
                      // border={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "19.7vw",
                        padding: "0.7vw",
                        marginRight: "auto",
                      }}
                    >
                      <Typography
                        sx={{
                          padding: "0px",
                          fontSize: "1vw",
                          fontWeight: 500,
                          textAlign: "left",
                          opacity: "0.99",
                        }}
                        variant="body1"
                        color="#fbfafb"
                      >
                        {" "}
                        {item.title || item.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#00c1db"
                        sx={{
                          marginTop: "0.6vh",
                          padding: "0px",
                          fontSize: "0.8vw",
                          opacity: "0.6",
                          fontWeight: 100,
                        }}
                      >
                        {(
                          item.media_type || item.known_for.media_type
                        ).toUpperCase()}
                        <span
                          style={{ verticalAlign: "middle", margin: "0 5px" }}
                        >
                          •
                        </span>
                        HD
                        <span
                          style={{ verticalAlign: "middle", margin: "0 5px" }}
                        >
                          •
                        </span>
                        {(() => {
                          const date =
                            item.release_date ||
                            item.first_air_date ||
                            (item.known_for &&
                              item.known_for[0].first_air_date) ||
                            (item.known_for && item.known_for[0].release_date);
                          return date ? date.split("-")[0] : "NA";
                        })()}
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                height: "13.8vh",
                width: "100%",
                backgroundColor: "black",
                position: "absolute",
                borderRadius: "0.6vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                color="#fbfafb"
                sx={{
                  opacity: 0.6,
                  fontSize: "0.9vw",
                }}
              >
                No Result Found!
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchBar;
