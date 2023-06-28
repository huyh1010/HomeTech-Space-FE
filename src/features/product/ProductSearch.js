import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

function ProductSearch({ name, setName, handleSubmit }) {
  return (
    <TextField
      value={name}
      sx={{ width: 300 }}
      size="small"
      onChange={(e) => setName(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ProductSearch;
