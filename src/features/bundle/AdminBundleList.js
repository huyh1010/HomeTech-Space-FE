import React from "react";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { fCurrency } from "../../utils/numberFormat";

function AdminBundleList({ productList, setProductList, products, bundle }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setProductList(value);
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
            <MenuItem
              sx={{ color: "black", backgroundColor: "white" }}
              key={product._id}
              value={product}
            >
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {productList.length ? (
        <Box>
          {productList?.map((product) => (
            <Paper sx={{ p: 2, mb: 1, border: "1px solid black" }}>
              <Typography>{product.name}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={product.poster_path}
                  sx={{ mr: 2, width: 50, height: 50 }}
                  alt={product.name}
                />
                <Typography>{fCurrency(product.price)}</Typography>
              </Box>
            </Paper>
          ))}{" "}
        </Box>
      ) : (
        <Box>
          {bundle?.products?.map((product, index) => (
            <Paper sx={{ p: 2, mb: 1, border: "1px solid black" }} key={index}>
              <Typography>{product.name}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={product.poster_path}
                  sx={{ mr: 2, width: 50, height: 50 }}
                  alt={product.name}
                />
                <Typography>{fCurrency(product.price)}</Typography>
              </Box>
            </Paper>
          ))}{" "}
        </Box>
      )}
    </>
  );
}

export default AdminBundleList;
