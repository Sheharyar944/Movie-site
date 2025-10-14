<Box sx={{ display: "flex", width: "calc(100% - 104px)" }}>
  <Box></Box>
  <Box sx={{ width: "69vw" }}></Box>
</Box>;

const MovieDetails = () => (
  <Box
    // border={1}
    sx={{
      marginTop: "116px",
      display: "flex",
      // ml: "52px",
      // mr: "52px",
      borderColor: "white",
      width: type === "tv" ? "94vw" : 1254,
    }}
  >
    <Box
      sx={{
        backgroundImage: `url(${posterImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: type === "tv" ? "18.4vw" : 251,
        height: type === "tv" ? "59.5vh" : 378,
        borderRadius: type === "tv" ? "0.8vw" : "10px",
        marginRight: type === "tv" ? "2vw" : "28px",
      }}
    ></Box>

    <Box
      // border={1}
      sx={{
        width: type === "tv" ? "64vw" : 880,
        height: type === "tv" ? "67vh" : 425,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h6"
        color="#fbfafb"
        sx={{
          fontWeight: 600,
          fontSize: type === "tv" ? "2.2vw" : 30,
          opacity: 0.9,
        }}
      >
        {list?.title || list?.name}
      </Typography>

      <Box>
        {list?.genres.map((item, index) => (
          <Button
            onClick={() => navigate(`/explore?type=${type}&genre=${item.id}`)}
            key={index}
            variant="text"
            sx={{
              backgroundColor: "rgba(0, 193, 219, 0.2)",
              textTransform: "none",
              height: type === "tv" ? "5vh" : 32,
              fontSize: type === "tv" ? "1vw" : 14,
              color: "#00c1db",
              marginRight: type === "tv" ? "0.8vw" : "10px",
              marginBottom: type === "tv" ? "2vh" : "13px",

              "&:hover": {
                backgroundColor: "rgba(0, 193, 219, 0.4)",
                color: "#00c1db",
              },
            }}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Box
        // border={1}
        sx={{
          backgroundColor: "rgba(255,255,255,0.1)",
          padding: 1,
          borderColor: "white",
          borderRadius: type === "tv" ? "0.6vw" : "8px",
        }}
      >
        <Typography
          variant="body1"
          color="#fbfafb"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            opacity: "0.7",
            fontSize: type === "tv" ? "1vw" : "13px",
          }}
        >
          {list?.overview}
        </Typography>
      </Box>
      <Box
        // border={1}
        sx={{
          // display: "flex",
          alignItems: "center",
          margin: type === "tv" ? "1.7vh 0px 2.3vh 0px" : "11px 0px 15px 0px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: type === "tv" ? "1vw" : "14px",
              marginRight: "2px",
              opacity: "0.9",
              mr: 1,
              fontWeight: 300,
            }}
          >
            Date:
          </Typography>
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              marginRight: "15px",
              fontSize: type === "tv" ? "1vw" : "14px",
              opacity: "0.7",
            }}
          >
            {list?.release_date || list?.first_air_date}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: type === "tv" ? "1vw" : "14px",
              marginRight: "2px",
              opacity: "0.9",
              mr: 1,
              // fontWeight: "bold",
            }}
          >
            Rating:
          </Typography>
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: type === "tv" ? "1vw" : "12px",
              marginRight: "2px",
              opacity: "0.7",
            }}
          >
            {list && list.vote_average.toFixed(1)}
          </Typography>
        </Box>
        <Box
          // border={1}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            borderColor: "white",
          }}
        >
          <Typography
            variant="h5"
            color="#fbfafb"
            sx={{
              fontSize: type === "tv" ? "1vw" : "14px",
              opacity: "0.9",
              mr: 1,
              // fontWeight: "bold",
            }}
          >
            Cast:{" "}
          </Typography>
          <Typography
            variant="body1"
            color="#fbfafb"
            sx={{
              fontSize: type === "tv" ? "0.9vw" : "12px",
              opacity: "0.7",
              letterSpacing: "1px",
            }}
          >
            {castList?.map((list) => list.name).join(", ")}
          </Typography>
        </Box>
      </Box>

      <Box
        // border={1}
        sx={{
          display: "flex",
          width: type === "tv" ? "59vw" : 800,
          height: type === "tv" ? "12vh" : 76,
          marginTop: type === "tv" ? "3vh" : "20px",
          paddingBottom: type === "tv" ? "0.9vh" : "6px",
        }}
      >
        {castList?.map((item, index) => (
          <Box
            // border={1}
            key={index}
            sx={{
              height: type === "tv" ? "3.6vw" : 50,
              width: type === "tv" ? "3.6vw" : 50,
              borderRadius: "500px",
              overflow: "hidden",
              position: "relative",
              marginRight: type === "tv" ? "0.9vw" : "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          >
            {item.profile_path !== null && (
              <img
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={`https://image.tmdb.org/t/p/w92${item.profile_path}`}
                alt={`${item.name} image`}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

<Box
  // border={1}
  sx={{
    display: "flex",
    ml: "52px",
    mr: "52px",
    height: "100vh",
    maxWidth: "calc(100% - 104px)",
  }}
>
  <Box
    // border={1}
    sx={{
      display: "flex",
      flexDirection: "column",
      borderBottomLeftRadius: "10px",
      borderTopLeftRadius: "10px",
      width: "31vw",
      overflow: "hidden",
      // backgroundColor: "rgba(186, 186, 187, 0.1)",
    }}
  >
    <Box
      // border={1}
      sx={{
        height: "10vh",
        // width: "31vw",
        display: "flex",
        alignItems: "center",
        marginBottom: "2px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <Typography
        variant="body1"
        color="#fbfafb"
        sx={{
          ml: "1vw",
          mr: "1vh",
          fontSize: "16px",
        }}
      >
        Episodes
      </Typography>
      <img src={episodes} alt="" style={{ height: 25 }} />
    </Box>
    <Box
      // border={1}
      sx={{
        position: "relative",
        flex: 1,
        overflowY: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        // scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          width: "2px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "0px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        "&:hover": {
          "&::-webkit-scrollbar": {
            width: "6px",
          },
        },
      }}
    >
      {list &&
        list[`season/${selectedSeason}`]?.episodes.map((item, index) => (
          <ToolTip
            key={index}
            title={item.name}
            sx={{
              color: "rgba(255, 255, 255, 1)",
              borderRadius: "0px",
            }}
          >
            <Button
              onClick={() => {
                setSelectedEpisode(index + 1),
                  updateSearchParams({ ep: item.episode_number });
              }}
              sx={{
                width: "100%",
                height: "8.2vh",
                textTransform: "none",
                borderRadius: 0,
                backgroundColor:
                  index % 2 === 0 ? null : "rgba(255, 255, 255, 0.05)",
                "&:active": {
                  transform: "scale(0.98)",
                },
                "&:hover": {
                  background: "#464749",
                },
              }}
              disableRipple
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    mr: 1,
                    fontSize: "14px",
                    color:
                      selectedEpisode - 1 === index ? "#00c1db" : "#fbfafb",
                  }}
                >
                  {item.episode_number}.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mr: "auto",
                    fontSize: "14px",
                    color:
                      selectedEpisode - 1 === index ? "#00c1db" : "#fbfafb",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </Typography>
                {selectedEpisode - 1 == index && (
                  <>
                    <img
                      src={circle}
                      alt="circle icon"
                      style={{
                        height: 20,
                      }}
                    />
                    <img
                      src={play}
                      alt="play icon"
                      style={{
                        position: "absolute",
                        right: 4,
                        height: 12,
                        top: 4,
                      }}
                    />
                  </>
                )}
              </Box>
            </Button>
          </ToolTip>
        ))}
    </Box>
  </Box>
  <Box
    // border={1}
    sx={{
      maxWidth: "69vw",
      height: "100vh",
    }}
  >
    <Box
      sx={{
        Position: "relative",
        backgroundColor: "black",
        height: "78vh",
        width: "69vw",
        ml: "2px",
        borderTopRightRadius: "10px",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {trailer && videoNumber !== 0 && (
        <IconButton
          onClick={() => setVideoNumber((prev) => prev - 1)}
          sx={{
            position: "absolute",
            top: "50%",
          }}
        >
          <img src={leftArrow} alt="left arrow" />
        </IconButton>
      )}
      {trailer && videoNumber !== list?.videos?.results?.length - 1 && (
        <IconButton
          onClick={() => setVideoNumber((prev) => prev + 1)}
          sx={{
            position: "absolute",
            top: "50%",
            right: 50,
          }}
        >
          <img src={rightArrow} alt="right arrow" />
        </IconButton>
      )}
      {trailer ? (
        <ReactPlayer
          url={`https://www.youtube.com/embed/${trailer}`}
          width="100%"
          height="100%"
          controls={true}
        />
      ) : (
        <>
          <img
            src={exclamation}
            alt="exclamation mark icon"
            style={{ height: 30, marginRight: 10 }}
          />
          <Typography variant="body1" color="#fbfafb" sx={{ fontSize: 25 }}>
            No Video
          </Typography>
        </>
      )}
    </Box>
    <Box
      // border={1}
      sx={{
        ml: "2px",
        backgroundColor: "rgba(186, 186, 187, 0.1)",
        borderBottomRightRadius: "10px",
        mt: "2px",
        width: "69vw",
        height: "21.7vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        // border={1}
        sx={{
          borderRadius: "12px",
          position: "relative",
          ml: "0.3vw",
          display: "flex",
          alignItems: "center",
          // maxWidth: "100%",
          width: "62.3vw",
          paddingRight: 10,
          overflow: "hidden",
        }}
      >
        {position !== 0 && (
          <IconButton
            onClick={handleLeftArrow}
            sx={{
              position: "absolute",
              height: "18vh",
              borderRadius: 0,
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
              width: "4vw",
              zIndex: 100,
              left: 0,
              background:
                "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.8))",
              "&:hover": {
                background:
                  "linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.9))",
              },
              "& img": {
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "&:hover img": {
                opacity: 1,
              },
            }}
            disableRipple
          >
            <img
              src={leftVector}
              alt="left arrow"
              style={{ height: 20, opacity: 1 }}
            />
            <img
              src={leftVectorCyan}
              alt="left arrow"
              style={{ height: 20, position: "absolute" }}
            />
          </IconButton>
        )}
        {!disable && seasons?.length > 4 && (
          <IconButton
            onClick={handleRightArrow}
            sx={{
              position: "absolute",
              height: "18vh",
              borderRadius: 0,
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
              width: "4vw",
              zIndex: 100,
              right: "0",
              background:
                "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.8))",
              "&:hover": {
                background:
                  "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.9))",
              },
              "& img": {
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "&:hover img": {
                opacity: 1,
              },
            }}
            disableRipple
          >
            <img
              src={rightVector}
              alt="left arrow"
              style={{ height: 20, opacity: 1 }}
            />
            <img
              src={rightVectorCyan}
              alt="left arrow"
              style={{ height: 20, position: "absolute" }}
            />
          </IconButton>
        )}
        <Box
          className="slideshowSlider"
          style={{ transform: `translate3d(${position}vw, 0, 0)` }}
        >
          {seasons?.map((item, index) => (
            <Button
              onClick={() => (
                setSelectedSeason(index + 1),
                setSelectedEpisode(1),
                setRefresh(!refresh),
                setSearchParams({ season: item.season_number })
              )}
              key={index}
              sx={{
                display: "inline-block",
                position: "relative",
                height: "18vh",
                width: "16.6vw",
                borderRadius: "12px",
                marginRight: "0.6vw",
                backgroundImage: `url(https://image.tmdb.org/t/p/w342${item.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                textTransform: "none",
              }}
              disableRipple
            >
              <Box
                sx={{
                  position: "absolute",
                  height: "18vh",
                  width: "16.6vw",
                  top: 0,
                  left: 0,
                  backgroundColor:
                    index === selectedSeason - 1
                      ? "rgba(0,0,0,0.7)"
                      : "rgba(0,0,0,0.3)",
                  borderRadius: "12px",
                  zIndex: 1,
                }}
              />
              {index === selectedSeason - 1 && (
                <>
                  <img
                    src={circle}
                    alt="circle icon"
                    style={{
                      position: "absolute",
                      // transform: "translate(-50%, -50%)",
                      height: 30,
                      top: 6,
                      right: 6,
                      zIndex: 100,
                    }}
                  />
                  <img
                    src={play}
                    alt="play icon"
                    style={{
                      position: "absolute",
                      // transform: "translate(-50%, -50%)",
                      height: 16,
                      top: 13,
                      right: 12,
                      zIndex: 200,
                    }}
                  />
                </>
              )}

              <Box
                sx={{
                  position: "absolute",
                  maxWidth: "14.5vw",
                  zIndex: 2,
                  top: 6,
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "2px 8px",
                  textWrap: "wrap",
                }}
              >
                <Typography
                  variant="body1"
                  color="#FFFFFF"
                  sx={{
                    fontSize: "14px",
                    textAlign: "left",
                  }}
                >
                  {item.season_number}. {item.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  bottom: 6,
                  right: 6,
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  padding: "2px 8px",
                }}
              >
                <Typography
                  variant="h4"
                  color="#fbfafb"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 100,
                    opacity: 0.7,
                  }}
                >
                  Ep. {item.episode_count}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
</Box>;
