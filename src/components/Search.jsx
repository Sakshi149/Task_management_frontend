import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "auto",
          borderRadius: 2,
          padding: "5px",
          width: "300px",
          height: "40px",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <TextField
          variant="filled"
          size="small"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flexGrow: 1 ,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "white", 
            },
          }}
        />
        <Button
          onClick={handleSearch}
          size="small"
          variant="contained"
          sx={{
            ml: 1,
            backgroundColor: "#1976d2", 
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#1565c0", 
            },
          }}
        >
          SEARCH 
        </Button>
      </Box>
  );
};

export default SearchBar;
