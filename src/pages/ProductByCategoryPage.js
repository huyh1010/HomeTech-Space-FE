import {
  Alert,
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../features/category/categorySlice";
import ProductCard from "../features/product/ProductCard";

function ProductByCategoryPage() {
  const { loading, error, totalProductsinCategory } = useSelector(
    (state) => state?.categories
  );
  const products = useSelector(
    (state) => state?.categories?.productsByCategory?.category?.products
  );
  const { coverImgUrl } = useSelector(
    (state) => state?.categories?.productsByCategory?.category || {}
  );

  const [page, setPage] = useState(1);
  const productsPerPage = totalProductsinCategory;

  const params = useParams();
  const categoryId = params;
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getProductsByCategory(categoryId));
    } catch (error) {
      console.log(error);
    }
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
      <Stack sx={{ alignItems: "center", mt: 2 }}>
        <Pagination
          count={productsPerPage}
          page={page}
          onChange={(e, page) => setPage(page)}
        />
      </Stack>
    </Container>
  );
}

export default ProductByCategoryPage;
