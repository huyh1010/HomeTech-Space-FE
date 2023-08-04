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
import ProductCard from "../features/product/ProductCard";
import { getProducts } from "../features/product/productSlice";

function ProductByCategoryPage() {
  const { id } = useParams();
  const category_id = id;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 12;

  const { products, totalPages } = useSelector(
    (state) => state?.products?.products
  );
  console.log(products);
  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ page: page, limit: limit, category: category_id }));
  }, [dispatch, page, limit, category_id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {products ? (
              <>
                <Card>
                  <CardMedia
                    component={"img"}
                    image={products[0].category.coverImgUrl}
                  />
                </Card>
                <Grid container spacing={2} mt={1}>
                  {products?.map((product, index) => (
                    <Grid key={product._id} item xs={12} sm={6} md={4} lg={4}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </Grid>
                <Stack sx={{ alignItems: "center", mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, page) => setPage(page)}
                  />
                </Stack>
              </>
            ) : (
              <Alert severity="error">{error}</Alert>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default ProductByCategoryPage;
