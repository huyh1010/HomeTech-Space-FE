import React, { useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FTextField,
  FUploadImage,
  FUploadMultipleFiles,
  FormProvider,
} from "../components/form";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { fData } from "../utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  updateProduct,
} from "../features/product/productSlice";

const UpdateProductSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AdminEditProduct() {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.products);
  const { product } = useSelector((state) => state.products.product);

  const defaultValues = {
    name: product.name || "",
    price: product?.price || "",
    category: product?.category || "",
    brand: product?.brand || "",
    dimension_size: product?.dimension_size || "",
    weight_kg: product?.weight_kg || "",
    description: product?.description || "",
    poster_path: product?.poster_path || "",
    imageUrl: "",
    features: product?.features || "",
  };

  useEffect(() => {
    dispatch(getSingleProduct({ id: productId }));
  }, [dispatch, productId]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateProductSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "poster_path",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleDropFiles = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(acceptedFiles);
      if (file) {
        console.log(file);
        setValue(
          "imageUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    data.features = String(data.features).split(",");
    data.price = Number(data.price);
    data.weight_kg = Number(data.weight_kg);
    data.imageUrl = product.imageUrl;
    console.log(data.imageUrl);

    // dispatch(updateProduct({ id: product._id, ...data }));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <FUploadImage
                name="poster_path"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    {" "}
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
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
                <FTextField
                  name="price"
                  label="Price"
                  helperText="Input Number"
                />
                <FTextField
                  name="category"
                  label="Category"
                  helperText="Please input one of these available categories: speaker,
                  plugs and outlets,
                  security cameras and systems,
                  lighting,
                  alarm clock,
                  or scale."
                />
                <FTextField name="brand" label="brand" />
                <FTextField name="dimension_size" label="Size" />
                <FTextField
                  name="weight_kg"
                  label="weight"
                  helperText="Input Number"
                />

                <FTextField name="features" label="features" />
              </Box>

              <Stack spacing={3} sx={{ mt: 3 }}>
                <FTextField
                  multiline
                  rows={4}
                  name="description"
                  label="Product Description"
                />
                <Box>
                  {product?.imageUrl?.map((image, index) => (
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
                    />
                  ))}
                  <FUploadImage
                    name="imageUrl"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDropFiles}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: "auto",
                          display: "block",
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      >
                        {" "}
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br /> max size of {fData(3145728)}
                      </Typography>
                    }
                  />
                </Box>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || loading}
                  disabled={isSubmitting}
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
