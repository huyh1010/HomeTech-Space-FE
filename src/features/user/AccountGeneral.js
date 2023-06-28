import React from "react";
import useAuth from "../../hooks/useAuth.js";
import { FTextField, FormProvider } from "../../components/form";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountGeneral() {
  const { user } = useAuth();
  const defaultValues = {
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
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

  return (
    <FormProvider methods={methods}>
      <Container>
        <FTextField name="name" label="Name" />
        <FTextField name="phone" label="Phone Number" disabled />
        <FTextField name="address" label="Address" />
      </Container>
    </FormProvider>
  );
}

export default AccountGeneral;
