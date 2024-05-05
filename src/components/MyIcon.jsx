import { Box, Typography } from "@mui/material";
import React from "react";

const MyIcon = ({ img, alt, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "18px",
        marginTop: "44px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "25px",
          height: "25px",
          backgroundColor: "#00c1db",
          borderRadius: "6px",
          marginRight: "10px",
        }}
      >
        <img src={img} alt={alt} />
      </Box>
      <Typography
        variant="body1"
        color="#fbfafb"
        sx={{
          fontSize: "25px",
          // fontWeight: "bold",
        }}
      >
        {" "}
        {text}
      </Typography>
    </Box>
  );
};

export default MyIcon;
