import React from "react";
import { Box, Typography } from "@mui/material";

const MyIcon = ({ img, alt, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "2.5vh",
        marginTop: "6vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "1.9vw",
          height: "1.9vw",
          backgroundColor: "#00c1db",
          borderRadius: "0.4vw",
          marginRight: "0.7vw",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={img} alt={alt} style={{ height: "3vh" }} />
      </Box>
      <Typography
        variant="body1"
        color="#fbfafb"
        sx={{
          fontSize: "3.5vh",
        }}
      >
        {" "}
        {text}
      </Typography>
    </Box>
  );
};

export default MyIcon;
