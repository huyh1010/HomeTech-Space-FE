import React, { useEffect, useState } from "react";
import { getProducts } from "../product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";

function AdminBundleList({ productList, setProductList, products, bundle }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setProductList(value);

    // setProductList(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <FormControl sx={{ mr: 1, minWidth: 120 }}>
        <InputLabel>Products</InputLabel>
        <Select
          label="Products"
          multiple
          value={productList}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, index) => (
                <Chip
                  key={index}
                  label={value.name}
                  variant="light"
                  color="primary"
                  size="small"
                />
              ))}
            </Box>
          )}
        >
          {products?.map((product) => (
            <MenuItem key={product._id} value={product}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {productList.length ? (
        <Box>
          {productList?.map((product) => (
            <Paper>{product.name}</Paper>
          ))}{" "}
        </Box>
      ) : (
        <Box>{bundle?.products?.map((product) => product.name)} </Box>
      )}
    </>
  );
}

export default AdminBundleList;
