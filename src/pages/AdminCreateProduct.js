import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { FTextField, FUploadImage, FormProvider } from "../components/form";
import { fData } from "../utils/numberFormat";
import { LoadingButton } from "@mui/lab";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
import AdminProductCategory from "../features/category/AdminProductCategory";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";
import { createProduct } from "../features/product/productSlice";

const defaultValues = {
  name: "",
  price: "",
  category: "",
  brand: "",
  dimension_size: "",
  weight_kg: "",
  description: "",
  poster_path: "",
  imageUrl: "",
  features: "",
};

const CreateProductSchema = yup.object().shape({
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

function AdminCreateProduct() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.products);

  let [files, setFiles] = useState([]);
  const [imageUrlLocal, setImageUrlLocal] = useState([]);
  const [secureUrls] = useState([]);
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
      setImageUrlLocal(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });

  const thumbs = imageUrlLocal.length
    ? imageUrlLocal?.map((file, index) => (
        <div style={thumb} key={index}>
          <div style={thumbInner}>
            <img
              src={file}
              style={img}
              alt="img"
              // Revoke data uri after image is loaded
            />
          </div>
        </div>
      ))
    : null;

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(CreateProductSchema),
  });

  const {
    handleSubmit,
    setValue,
    register,
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

    dispatch(createProduct({ ...data }));
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Product Cover
              </Typography>
              <Divider sx={{ mb: 1 }} />
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
                <AdminProductCategory register={register} />
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
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Product Side Images
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  <aside style={thumbsContainer}>{thumbs}</aside>
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
                </section>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || loading}
                  disabled={isSubmitting}
                >
                  Create Product
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  );
}

export default AdminCreateProduct;
