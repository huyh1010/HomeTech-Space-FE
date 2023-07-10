import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Alert, Box, Container, Pagination, Stack } from "@mui/material";
import { FormProvider } from "../components/form";
import ProductFilter from "../features/product/ProductFilter";
import ProductSearch from "../features/product/ProductSearch";
import LoadingScreen from "../components/LoadingScreen";
import ProductList from "../features/product/ProductList";

const defaultValues = {
  name: "",
  category: "",
  price: "",
};

function ProductPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const dispatch = useDispatch();
  const {
    products: { products, totalPages },
  } = useSelector((state) => state.products);
  const { loading, error } = useSelector((state) => state.products);

  const methods = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(getProducts({ name, page, limit }));
  }, [dispatch, name, page]);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <ProductFilter />
      </Stack>
      <Stack sx={{ flexGrow: 1, justifyContent: "center" }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <ProductSearch name={name} setName={setName} />
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {products ? (
                <ProductList products={products} />
              ) : (
                <Alert severity="error">{error}</Alert>
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
      </Stack>
    </Container>
  );
}

export default ProductPage;
