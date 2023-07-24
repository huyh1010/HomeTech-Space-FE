import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBundle } from "../features/bundle/bundleSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { fCurrency } from "../utils/numberFormat";

function BundleDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { bundle } = useSelector((state) => state?.bundles);
  console.log(bundle);

  useEffect(() => {
    dispatch(getSingleBundle({ id: id }));
  }, [dispatch, id]);

  return (
    <Container sx={{ mt: 8 }}>
      <Card
        sx={{
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Grid container spacing={4} sx={{ p: 2 }}>
          <Grid item xs={12} sm={6} lg={6}>
            <Stack spacing={2}>
              <Stack>
                {" "}
                <img
                  src={bundle.poster_path}
                  alt={bundle.name}
                  style={{ height: "300px", borderRadius: 4 }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Stack>
              <Typography variant="h4">{bundle.name}</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {fCurrency(bundle.price)}
              </Typography>
              <Stack>
                <Typography sx={{ fontWeight: 600 }}>Description:</Typography>
                <Typography
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "normal",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`${bundle.description.slice(0, 250)}...`}
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
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default BundleDetailPage;
