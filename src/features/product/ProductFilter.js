import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import CategoryFilter from "../category/CategoryFilter";
import { useDispatch } from "react-redux";
import { getProducts } from "./productSlice";
import ProductPriceFilter from "./ProductPriceFilter";

export const categoryFilters = [
  "speaker",
  "plugs and outlets",
  "cameras",
  "lighting",
  "alarm clock",
  "scale",
];

export const priceFilters = [
  { value: "below_25", label: "Below $25" },
  { value: "between_25_75", label: "Between $25 - $75" },
  { value: "above_75", label: "Above $75" },
];
function ProductFilter() {
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const dispatch = useDispatch();
  const handleReset = () => {
    setCategory(null);
    setPrice(null);
    dispatch(getProducts({ category, price }));
  };

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Card sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Category
          </Typography>
          <Divider />
          <CategoryFilter
            categoryFilters={categoryFilters}
            category={category}
            setCategory={setCategory}
          />
        </Stack>
      </Card>
      <Card sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Price
          </Typography>
          <Divider />
          <ProductPriceFilter
            priceFilters={priceFilters}
            price={price}
            setPrice={setPrice}
          />
        </Stack>
      </Card>
      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          startIcon={<ClearAllIcon />}
          onClick={handleReset}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
