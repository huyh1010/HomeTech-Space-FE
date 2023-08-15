import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

function NewProductList() {
  let page = 1;
  let limit = 6;
  const {
    products: { products },
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <Container sx={{ mt: 10, mb: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        New Products
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products &&
          products.map((product) => (
            <Grid item xs={12} sm={12} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default NewProductList;
