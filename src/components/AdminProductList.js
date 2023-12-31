import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { fCurrency } from "../utils/numberFormat";
import LoadingScreen from "./LoadingScreen";

function AdminProductList() {
  const [page, setPage] = useState(1);
  const limit = 12;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { products, totalPages } = useSelector(
    (state) => state?.products?.products
  );
  const { loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({ page, limit }));
  }, [dispatch, page, limit]);
  return (
    <>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {products ? (
              <>
                <Grid
                  container
                  spacing={2}
                  mt={1}
                  justifyContent={{
                    xs: "center",
                    sm: "start",
                    md: "start",
                    lg: "start",
                  }}
                >
                  {products?.map((product, index) => (
                    <Grid key={product._id} item xs={11} sm={6} md={4} lg={4}>
                      <Card
                        sx={{
                          height: "300px",
                          cursor: "pointer",
                          backgroundColor:
                            theme.palette.mode === "dark" && "black",
                        }}
                      >
                        <CardMedia
                          component={"img"}
                          image={product.poster_path}
                          title={product.name}
                          sx={{
                            height: "60%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {fCurrency(product.price)}
                          </Typography>

                          <Typography
                            sx={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {product.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, page) => setPage(page)}
                  />
                </Box>
              </>
            ) : (
              <Alert severity="error">{error}</Alert>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default AdminProductList;
