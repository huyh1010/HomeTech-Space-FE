import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBundle } from "../features/bundle/bundleSlice";
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
import { addToCart } from "../features/cart/cartSlice";

function BundleDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bundle } = useSelector((state) => state?.bundles);
  const [index, setIndex] = useState(0);

  const handleAddToCart = (bundle) => {
    dispatch(addToCart(bundle));
  };

  useEffect(() => {
    dispatch(getSingleBundle({ id: id }));
  }, [dispatch, id]);
  const handleTab = (index) => {
    setIndex(index);
  };
  return (
    <Container sx={{ mt: 10 }}>
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        {bundle && (
          <Grid container spacing={4} sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} lg={6}>
              <Stack spacing={2}>
                <Stack>
                  {" "}
                  <img
                    src={bundle?.imageUrl ? bundle?.imageUrl[index] : null}
                    alt={bundle?.name}
                    style={{ height: "300px", borderRadius: 4 }}
                  />
                </Stack>
                <Box>
                  {bundle?.imageUrl?.map((image, index) => (
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
              <Stack>
                <Typography variant="h4">{bundle.name}</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {fCurrency(bundle.price)}
                </Typography>
                <Stack mt={2}>
                  <Stack style={{ display: "flex" }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      Product Features:
                    </Typography>
                    {bundle?.products?.map((product) => (
                      <Chip
                        label={product.name}
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
                      {`${bundle?.description?.slice(0, 250)}...`}
                    </Typography>
                  </Stack>
                  <CardActions>
                    <Button
                      size="large"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        margin: "auto",
                        borderRadius: 14,
                      }}
                      onClick={() => handleAddToCart(bundle)}
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

export default BundleDetailPage;
