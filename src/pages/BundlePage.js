import {
  Alert,
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBundles } from "../features/bundle/bundleSlice";
import LoadingScreen from "../components/LoadingScreen";
import BundleCard from "../features/bundle/BundleCard";

function BundlePage() {
  const bannerImg =
    "https://static1.pocketnowimages.com/wordpress/wp-content/uploads/2023/05/best-smart-home-devices-li.jpg";
  const [name] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;
  const dispatch = useDispatch();
  const { bundles, totalPages } = useSelector(
    (state) => state?.bundles?.bundles
  );
  const { loading, error } = useSelector((state) => state?.bundles);

  useEffect(() => {
    try {
      dispatch(getBundles({ name, page, limit }));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, name, page]);

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardMedia component={"img"} image={bannerImg} />
      </Card>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Grid container spacing={2} mt={1}>
                {bundles?.map((bundle, index) => (
                  <Grid key={bundle._id} item xs={12} sm={6} md={4} lg={4}>
                    <BundleCard bundle={bundle} />
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Box>
      <Stack sx={{ alignItems: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, page) => setPage(page)}
        />
      </Stack>
    </Container>
  );
}

export default BundlePage;
