import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../features/product/productSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { fCurrency } from "../utils/numberFormat";

function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products.product);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getSingleProduct({ id: productId }));
  }, [dispatch, productId]);
  const handleTab = (index) => {
    setIndex(index);
  };
  return (
    <Container>
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: "white",

          mt: 10,
        }}
      >
        {product && (
          <Grid container spacing={4} sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} lg={6}>
              <Stack spacing={2}>
                {" "}
                <Stack>
                  {" "}
                  <img
                    src={product.imageUrl[index]}
                    alt={product.name}
                    style={{ height: "300px", borderRadius: 4 }}
                  />
                </Stack>
                <Box>
                  {product.imageUrl.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="img"
                      style={{
                        height: "100px",
                        width: "100px",
                        opacity: "0.8",
                        cursor: "pointer",
                      }}
                      onClick={() => handleTab(index)}
                    />
                  ))}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              {" "}
              <Stack>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {fCurrency(product.price)}
                </Typography>
                <Stack mt={2}>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontWeight: 600, mr: 1 }}>
                      Dimensions:
                    </Typography>
                    <Typography>{product.dimension_size}</Typography>
                  </Box>
                  <Stack style={{ display: "flex" }}>
                    <Typography sx={{ fontWeight: 600 }}>Features:</Typography>
                    {product.features.map((feature) => (
                      <Chip
                        label={feature}
                        variant="outlined"
                        sx={{ my: 1 }}
                        clickable
                      />
                    ))}
                  </Stack>
                  <Stack>
                    <Typography sx={{ fontWeight: 600 }}>
                      Description:
                    </Typography>
                    <Typography
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "normal",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {`${product.description.slice(0, 250)}...`}
                    </Typography>
                  </Stack>
                  <CardActions>
                    <Button
                      size="large"
                      style={{
                        backgroundColor: "black",
                        margin: "auto",
                        borderRadius: 14,
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Card>
    </Container>
  );
}

export default ProductDetailPage;
