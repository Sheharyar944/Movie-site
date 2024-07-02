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
