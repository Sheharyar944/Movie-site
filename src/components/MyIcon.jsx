import React from "react";
import { Box, Typography } from "@mui/material";

const MyIcon = ({ img, alt, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "18px",
        marginTop: "50px",
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={img} alt={alt} style={{ height: 20 }} />
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
