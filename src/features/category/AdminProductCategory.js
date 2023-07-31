import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./categorySlice";

function AdminProductCategory({ register }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state?.categories?.categories);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <FormControl sx={{ mr: 1, minWidth: 120 }}>
      <InputLabel>Category</InputLabel>
      <Select label="Category" {...register("category")}>
        {categories?.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default AdminProductCategory;
