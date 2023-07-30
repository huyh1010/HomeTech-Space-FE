import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FTextField, FUploadImage, FormProvider } from "../components/form";
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
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";

const UpdateProductSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  height: 394,
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: "#F4F6F8",
  border: `1px dashed alpha ("#919eab", 0.32)`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function AdminEditProduct(props) {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const [secureUrls] = useState([]);
  const { loading, error } = useSelector((state) => state?.products);
  const { product } = useSelector((state) => state?.products?.product);

  let [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="img"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const defaultValues = {
    name: product?.name || "",
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
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

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

  const onSubmit = async (data) => {
    data.features = String(data.features).split(",");
    data.price = Number(data.price);
    data.weight_kg = Number(data.weight_kg);

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageURL = res.data.secure_url;
      secureUrls.push(imageURL);
    }

    data.imageUrl = secureUrls;

    dispatch(updateProduct({ id: product._id, ...data }));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ mt: 8, position: "relative" }}>
        {loading ? (
          <LoadingScreen />
        ) : (
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
                  <section className="container">
                    <DropZoneStyle {...getRootProps()}>
                      <input {...getInputProps()} />

                      <Stack
                        direction="column"
                        spacing={2}
                        justifyContent={"center"}
                        alignItems={"center"}
                        sx={{ height: "100%" }}
                      >
                        <AddAPhotoIcon />
                        <Typography
                          gutterBottom
                          variant="body2"
                          sx={{ color: "#637381" }}
                          textAlign={"center"}
                        >
                          Drop or Select Image
                        </Typography>
                      </Stack>
                    </DropZoneStyle>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                  </section>

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
        )}
      </Container>
    </FormProvider>
  );
}

export default AdminEditProduct;
