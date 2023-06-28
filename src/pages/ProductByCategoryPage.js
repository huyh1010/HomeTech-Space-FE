import { Alert, Box, Card, CardMedia, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../features/category/categorySlice";
import ProductCard from "../features/product/ProductCard";

function ProductByCategoryPage() {
  const { loading, error } = useSelector((state) => state?.categories);
  const products = useSelector(
    (state) => state?.categories?.productsByCategory?.category?.products
  );
  const { coverImgUrl } = useSelector(
    (state) => state?.categories?.productsByCategory?.category
  );

  const params = useParams();
  const categoryId = params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsByCategory(categoryId));
  }, [dispatch, categoryId]);

  return (
    <Container sx={{ mt: 4 }}>
      {coverImgUrl && (
        <Card>
          <CardMedia component={"img"} image={coverImgUrl} />
        </Card>
      )}
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Grid container spacing={2} mt={1}>
                {products?.map((product, index) => (
                  <Grid key={product._id} item xs={12} sm={6} md={4} lg={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default ProductByCategoryPage;
