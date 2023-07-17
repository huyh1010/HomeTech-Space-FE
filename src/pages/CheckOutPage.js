import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CartReview from "../features/cart/CartReview";
import { useDispatch, useSelector } from "react-redux";
import { getProductFromCart } from "../features/cart/cartSlice";
import { Controller, useForm } from "react-hook-form";
import { FTextField, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";

function CheckOutPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state?.carts);
  console.log(cart);
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      shipping_address: "",
      district: "",
      city: "",
      payment_method: "",
    },
  });
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  // useEffect(() => {
  //   dispatch(getProductFromCart());
  // }, [dispatch]);
  const onSubmit = async (data) => {
    try {
    } catch (error) {
      reset();
      setError(error);
    }
  };
  return (
    <Container sx={{ mt: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Card sx={{ p: 3 }}>
              <Box>
                <Typography variant="h4">Customer Info</Typography>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "30ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FTextField name="name" label="Name" />
                  <FTextField name="email" label="Email" />
                  <FTextField name="phone" label="Contact Number" />
                  <FTextField name="shipping_address" label="Address" />
                  <FTextField name="district" label="District" />
                  <FTextField name="city" label="City" />
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h4">Payment</Typography>

                <Controller
                  render={({ field }) => (
                    <RadioGroup aria-label="payment_method" {...field}>
                      <FormControlLabel
                        value="credit/debit"
                        control={
                          <Radio
                            sx={{
                              "&, &.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="Credit/Debit Card"
                      />
                      <FormControlLabel
                        value="COD"
                        control={
                          <Radio
                            sx={{
                              "&, &.Mui-checked": {
                                color: "black",
                              },
                            }}
                          />
                        }
                        label="COD"
                      />
                    </RadioGroup>
                  )}
                  name="payment_method"
                  control={control}
                />
              </Box>
            </Card>
            <Box textAlign="center">
              <LoadingButton
                sx={{
                  backgroundColor: "dark.darker",
                  mt: 2,
                  "&.MuiButton-root:hover": { backgroundColor: "dark.main" },
                }}
                type="submit"
                loading={isSubmitting}
              >
                Place Order
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <CartReview cart={cart} />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CheckOutPage;
