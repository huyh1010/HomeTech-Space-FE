import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import ProductList from "../features/product/ProductList";
import SearchIcon from "@mui/icons-material/Search";

import ClearAllIcon from "@mui/icons-material/ClearAll";

const categories = [
  { name: "speaker", id: "6486d09be1550f8114613723" },
  { name: "plugs and outlets", id: "6486d209e99975428ea5740b" },
  { name: "cameras", id: "6486d271e99975428ea57411" },
  { name: "lighting", id: "6486d2c3e99975428ea57417" },
  { name: "alarm clock", id: "6486d30be99975428ea5741f" },
  { name: "scale", id: "6486d345e99975428ea57425" },
];

const priceFilters = [
  { value: "below_25", label: "Below $25" },
  { value: "between_25_75", label: "Between $25 - $75" },
  { value: "above_75", label: "Above $75" },
];

function ProductPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  let limit = 12;

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.products?.products);
  const { loading, error, totalPages } = useSelector(
    (state) => state?.products
  );
  const handleFilterCategory = (value) => {
    setCategory(value);

    setPage(1);
  };

  const handleFilterPrice = (value) => {
    setPrice(value);
    setPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[10].value);
    dispatch(
      getProducts({
        page,
        limit,
        name,
      })
    );
    setPage(1);
  };
  const handleReset = () => {
    setCategory("");
    setPrice("");
    setPage(1);
  };

  useEffect(() => {
    dispatch(
      getProducts({ page, limit, category: category, price: price, name: name })
    );
    //eslint-disable-next-line
  }, [dispatch, limit, page, category, price]);

  return (
    <form onSubmit={handleSubmit}>
      <Container
        sx={{
          display: "flex",
          // minHeight: "100vh",
          mt: 3,
          flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
          // alignItems: "center",
        }}
      >
        <Stack alignItems="center">
          <Stack spacing={3} sx={{ p: 3, width: 250 }}>
            <Card sx={{ p: 3 }}>
              <FormControl>
                <FormLabel sx={{ fontSize: "20px", fontWeight: 600, mb: 1 }}>
                  Category
                </FormLabel>
                <Divider />
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={category}
                  onChange={(e, value) => handleFilterCategory(value)}
                >
                  {categories.map((category) => (
                    <FormControlLabel
                      value={category.id}
                      control={<Radio />}
                      label={category.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Card>
            <Card sx={{ p: 3 }}>
              <FormControl>
                <FormLabel sx={{ fontSize: "20px", fontWeight: 600, mb: 1 }}>
                  Price
                </FormLabel>
                <Divider />
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={price}
                  onChange={(e, value) => handleFilterPrice(value)}
                >
                  {priceFilters.map((price) => (
                    <FormControlLabel
                      value={price.value}
                      control={<Radio />}
                      label={price.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Card>
            <Box>
              <Button
                size="large"
                color="inherit"
                variant="outlined"
                onClick={handleReset}
                startIcon={<ClearAllIcon />}
              >
                Clear All
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Stack sx={{ flexGrow: 1, justifyContent: "center" }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "center", sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: 250, sm: 400, md: 400, lg: 400 },
                height: 50,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>{" "}
          </Stack>

          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {products ? (
                  <>
                    <ProductList products={products} />
                    <Stack sx={{ alignItems: "center", mt: 2 }}>
                      <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                      />
                    </Stack>
                  </>
                ) : (
                  <Alert severity="error">{error}</Alert>
                )}
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </form>
  );
}

export default ProductPage;
