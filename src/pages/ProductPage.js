import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FormProvider } from "../components/form";
import ProductFilter from "../features/product/ProductFilter";
import ProductSearch from "../features/product/ProductSearch";
import LoadingScreen from "../components/LoadingScreen";
import ProductList from "../features/product/ProductList";
import { getOrders } from "../features/order/orderSlice";
import { getCategories } from "../features/category/categorySlice";

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

  let limit = 5;

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.products?.products);
  const { loading, error, totalPages } = useSelector(
    (state) => state?.products
  );
  const handleFilter = (value) => {
    setCategory(value);
    setPage(1);
  };
  const handleReset = () => {
    setCategory("");
    setPage(1);
  };

  useEffect(() => {
    dispatch(getProducts({ page, limit, category: category }));
  }, [dispatch, limit, name, page, category]);

  return (
    <form>
      <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
        <Stack>
          <Stack spacing={3} sx={{ p: 3, width: 250 }}>
            <Card sx={{ p: 3 }}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={category}
                  onChange={(e, value) => handleFilter(value)}
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
                <FormLabel>Price</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={price}
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
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            {/* <ProductSearch name={name} setName={setName} /> */}
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
