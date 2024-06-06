import React, { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Box } from "@mui/material";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    // borderRadius: 0,
    userSelect: "none",
  },
}));
const ToolTip = ({ title, children, ...props }) => {
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const timerRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleMouseMove = (event) => {
    if (open) {
      clearTimeout(timerRef.current);
      setOpen(false);
    }
  };

  const handleMouseEnter = (event) => {
    const { clientX, clientY } = event;
    setCursorPosition({ top: clientY, left: clientX });
    timerRef.current = setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
  };

  const handleScroll = () => {
    if (open) {
      clearTimeout(timerRef.current);
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  return (
    <Box
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <LightTooltip
        placement="right"
        title={title}
        open={open}
        {...props}
        PopperProps={{
          anchorEl: {
            getBoundingClientRect: () => ({
              top: cursorPosition.top,
              left: cursorPosition.left,
              bottom: cursorPosition.top,
              right: cursorPosition.left,
              width: 0,
              height: 0,
            }),
          },
        }}
      >
        {children}
      </LightTooltip>
    </Box>
  );
};

export default ToolTip;
