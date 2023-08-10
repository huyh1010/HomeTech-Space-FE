import {
  Box,
  Card,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { Controller, useForm } from "react-hook-form";
import { FTextField, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";
import useAuth from "../hooks/useAuth";
import { createOrder } from "../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import CartReview from "../features/cart/CartReview";

function CheckOutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useSelector((state) => state?.carts);

  let shipping_fees = 4.99;
  let tax_fees = 1.99;
  const subTotal = () => {
    let total = 0;

    cart?.map((item) => (total = total + item.quantity * item.price));
    return total;
  };
  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => (total = total + item.quantity * item.price));
    total = total + tax_fees + shipping_fees;
    return total;
  };

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

  const onSubmit = async (data, cart, user, totalPrice) => {
    const user_id = user._id;
    const customer_info = data;
    try {
      const orderResult = await dispatch(
        createOrder({ customer_info, cart, user_id, totalPrice })
      );
      if (createOrder.fulfilled.match(orderResult)) {
        const order_id = orderResult.payload.orderId;
        navigate(`/order/${order_id}`);
        dispatch(clearCart());
      }
    } catch (error) {
      reset();
      setError(error);
    }
  };
  return (
    <Container sx={{ mt: 4 }}>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit((data) =>
          onSubmit(data, cart, user, totalPrice())
        )}
      >
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
                  color: "white",
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
            <CartReview
              cart={cart}
              totalPrice={totalPrice}
              subTotal={subTotal}
              shipping_fees={shipping_fees}
              tax_fees={tax_fees}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default CheckOutPage;
