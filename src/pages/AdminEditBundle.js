import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBundle, updateBundle } from "../features/bundle/bundleSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
import { FTextField, FUploadImage, FormProvider } from "../components/form";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { fData } from "../utils/numberFormat";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AdminBundleList from "../features/bundle/AdminBundleList";
import { getProducts } from "../features/product/productSlice";
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

function AdminEditBundle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const { bundle, loading } = useSelector((state) => state?.bundles);
  const { products } = useSelector((state) => state?.products?.products);

  const [secureUrls] = useState([]);
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
    name: bundle?.name || "",
    price: bundle?.price || "",
    products: bundle?.products || "",
    description: bundle?.description || "",
    poster_path: bundle?.poster_path || "",
    imageUrl: bundle?.brand || "",
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateProductSchema),
  });

  const {
    handleSubmit,
    register,
    reset,
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

  useEffect(() => {
    dispatch(getSingleBundle({ id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (bundle) reset(bundle);
  }, [bundle, reset]);

  useEffect(() => {
    dispatch(getProducts({}));
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = async (data) => {
    data.price = Number(data.price);
    if (productList.length) {
      const product_id = productList.map((product) => product._id);
      data.products = product_id;
    }
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
    if (secureUrls.length) {
      data.imageUrl = secureUrls;
    }

    dispatch(updateBundle({ id: bundle._id, ...data }));
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
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Product Bundle Cover
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
                  <AdminBundleList
                    products={products}
                    productList={productList}
                    setProductList={setProductList}
                    bundle={bundle}
                  />
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
                      Product Bundle Side Images
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    <DropZoneStyle {...getRootProps()}>
                      <input {...getInputProps()} {...register("imageUrl")} />

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

export default AdminEditBundle;
