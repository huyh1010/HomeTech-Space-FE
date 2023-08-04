import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import {
  Alert,
  Box,
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

const categories = [
  { name: "speaker", id: "6486d09be1550f8114613723" },
  { name: "plugs and outlets", id: "6486d209e99975428ea5740b" },
  { name: "cameras", id: "6486d271e99975428ea57411" },
  { name: "lighting", id: "6486d2c3e99975428ea57417" },
  { name: "alarm clock", id: "6486d30be99975428ea5741f" },
  { name: "scale", id: "6486d345e99975428ea57425" },
];
function ProductPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  let limit = 5;

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.products?.products);
  const { loading, error, totalPages } = useSelector(
    (state) => state?.products
  );

  const handleFilterCategory = (value) => {
    setCategory(value);
    dispatch(getProducts({ page, limit, category: category }));
  };
  useEffect(() => {
    dispatch(getProducts({ page, limit, name, category: category }));
    // eslint-disable-next-line
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
                  onChange={(e) => handleFilterCategory(e.target.value)}
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
