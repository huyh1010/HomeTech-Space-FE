import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { getProducts } from "../product/productSlice";
import { useDispatch } from "react-redux";

function CategoryFilter({ categoryFilters, category, setCategory }) {
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    try {
      setCategory(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getProducts({ category: category }));
  }, [dispatch, category]);

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {categoryFilters.map((filter) => (
          <FormControlLabel
            value={filter}
            control={
              <Radio
                sx={{
                  "&, &.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            }
            label={filter}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CategoryFilter;
