import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, Typography } from "@mui/material";
import play from "../assets/play.png";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 100,
      width: 100,
      p: 0,
      ml: 100,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectMenu = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange1 = (event) => {
    setSelectedOption(event.target.value);
  };

  const [age, setAge] = React.useState("");

  const handleChange2 = (event) => {
    setAge(event.target.value);
  };

  const [isShrunk, setIsShrunk] = useState(false);

  const handleClick = () => {
    setIsShrunk(true);
    setTimeout(() => {
      setIsShrunk(false);
    }, 200);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400, height: 0 }}>
        {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          //   input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{ backgroundColor: "white", border: "2px", height: 30 }}
        >
          <option value="">Select...</option>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              //   style={getStyles(name, personName, theme)}
              // sx={{ width: 50 }}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <label htmlFor="dropdown">Select an option:</label>
      <select
        style={{
          height: "100px", // Set height of the select
          overflowY: "auto", // Enable vertical scrollbar
        }}
        id="dropdown"
        value={selectedOption}
        onChange={handleChange1}
        // size={3}
      >
        <option value="">dsdsds...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
        <option value="option5">Option 5</option>
        <option value="option6">Option 6</option>
        <option value="option7">Option 7</option>
        <option value="option8">Option 8</option>
        <option value="option9">Option 9</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
        <option value="option5">Option 5</option>
        <option value="option6">Option 6</option>
        <option value="option7">Option 7</option>
        <option value="option8">Option 8</option>
        <option value="option9">Option 9</option>
      </select>
      {/* <p>Selected option: {selectedOption}</p> */}

      <FormControl sx={{ p: 0, m: 0, width: 400 }}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          //   label="Age"
          onChange={handleChange2}
          MenuProps={MenuProps}
          sx={{ m: 1 }}
        >
          <MenuItem value={10} sx={{ ml: 1 }}>
            <img src={play} />
            Ten
          </MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        onClick={handleClick}
        style={{ transform: isShrunk ? "scale(0.99)" : "scale(1)" }}
      >
        Click Me
      </Button>
    </div>
  );
};

export default SelectMenu;
