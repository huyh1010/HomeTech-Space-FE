import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { FTextField } from "./form";

function CheckoutInfo({ register, setValue }) {
  console.log(register);
  return (
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
          <FTextField
            {...register("name")}
            label="Name"
            onChange={(e) => setValue("name", e.target.value)}
          />
          <FTextField
            {...register("email")}
            label="Email"
            name="email"
            onChange={(e) => setValue("email", e.target.value)}
          />
          <FTextField
            {...register("phone")}
            label="Contact Number"
            onChange={(e) => setValue("phone", e.target.value)}
          />
          <FTextField
            {...register("shipping_address")}
            label="Address"
            name="shipping_address"
            onChange={(e) => setValue("shipping_address", e.target.value)}
          />
          <FTextField
            {...register("city")}
            label="City"
            name="city"
            onChange={(e) => setValue("city", e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">Payment</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Credit/Debit Card"
              />
              <FormControlLabel value="male" control={<Radio />} label="COD" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Card>
  );
}

export default CheckoutInfo;
