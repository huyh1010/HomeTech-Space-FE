import React from "react";
import { useLocation } from "react-router-dom";
import { FTextField, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const UpdateProductSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AdminEditProduct() {
  const { state } = useLocation();
  const id = state?._id;

  const defaultValues = {
    name: state?.name || "",
    price: state?.price || "",
    category: state?.category || "",
    brand: state?.brand || "",
    dimension_size: state?.dimension_size || "",
    weight_kg: state?.weight_kg || "",
    description: state?.description || "",
    poster_path: state?.poster_path || "",
    // imageUrl: state?.imageUrl || "",
    features: state?.features || "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateProductSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <Typography>hello</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1,1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="name" label="Name" />
                <FTextField name="price" label="Price" />
                <FTextField name="category" label="Category" />
                <FTextField name="brand" label="brand" />
                <FTextField name="dimension_size" label="Size" />
                <FTextField name="weight_kg" label="weight" />

                <FTextField name="features" label="features" />
              </Box>

              <Stack spacing={3} alignItems={"flex-end"} sx={{ mt: 3 }}>
                <FTextField
                  multiline
                  rows={4}
                  name="description"
                  label="Product Description"
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}

export default AdminEditProduct;
