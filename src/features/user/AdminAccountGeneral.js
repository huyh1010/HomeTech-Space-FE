import React, { useCallback } from "react";
import useAuth from "../../hooks/useAuth.js";
import { FTextField, FUploadAvatar, FormProvider } from "../../components/form";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fData } from "../../utils/numberFormat.js";
import { LoadingButton } from "@mui/lab";
import { updateUser } from "./userSlice.js";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AdminAccountGeneral() {
  const { user } = useAuth();
  const { loading } = useSelector((state) => state?.users);
  const defaultValues = {
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatarUrl: user?.avatarUrl || "",
  };
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(UpdateUserSchema),
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
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    dispatch(updateUser({ id: user._id, ...data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ py: 10, px: 3 }}>
        <Typography variant="h3">Admin Account</Typography>
        <Card sx={{ p: 3, mt: 2 }}>
          <Stack spacing={2}>
            <FUploadAvatar
              name="avatarUrl"
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
            <FTextField name="name" label="Name" />
            <FTextField name="phone" label="Phone Number" />
            <FTextField name="address" label="Address" />
          </Stack>
          <Box sx={{ textAlign: "center" }}>
            <LoadingButton
              sx={{ backgroundColor: "black", color: "white", mt: 1 }}
              type="submit"
              variant="contained"
              loading={isSubmitting || loading}
              disabled={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Card>
      </Container>
    </FormProvider>
  );
}

export default AdminAccountGeneral;
