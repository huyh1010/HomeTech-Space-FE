import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./categorySlice";
import { Container, Grid, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";

function CategoriesBanner() {
  const {
    categories: { categories },
  } = useSelector((state) => state?.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Shop Our Top Categories
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {categories?.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={category._id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default CategoriesBanner;
