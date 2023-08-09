import {
  Alert,
  Box,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBundles } from "../features/bundle/bundleSlice";
import LoadingScreen from "../components/LoadingScreen";
import BundleCard from "../features/bundle/BundleCard";
import SearchIcon from "@mui/icons-material/Search";

function BundlePage() {
  const bannerImg =
    "https://static1.pocketnowimages.com/wordpress/wp-content/uploads/2023/05/best-smart-home-devices-li.jpg";
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;
  const dispatch = useDispatch();
  const { bundles, totalPages } = useSelector(
    (state) => state?.bundles?.bundles
  );
  const { loading, error } = useSelector((state) => state?.bundles);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    dispatch(
      getBundles({
        page,
        limit,
        name,
      })
    );
    setPage(1);
  };

  useEffect(() => {
    try {
      dispatch(getBundles({ name, page, limit }));
    } catch (error) {
      console.log(error);
    }
    //eslint-disable-next-line
  }, [dispatch, page]);

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ mt: 4 }}>
        <Card>
          <CardMedia component={"img"} image={bannerImg} />
        </Card>

        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: { xs: 250, sm: 400, md: 400, lg: 400 },
            backgroundColor: "white",
            mt: 2,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, color: "black" }}
            placeholder="Search bundle name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

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
    </form>
  );
}

export default BundlePage;
