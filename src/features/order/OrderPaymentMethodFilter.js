import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function OrderPaymentMethodFilter({
  orderPaymentMethod,
  setOrderPaymentMethod,
}) {
  return (
    <FormControl
      sx={{
        minWidth: 180,
        mt: { xs: 1, sm: 0, md: 0, lg: 0 },
      }}
    >
      <InputLabel sx={{ color: "black" }}>Payment Method</InputLabel>
      <Select
        label="Payment Method"
        value={orderPaymentMethod}
        onChange={(e) => setOrderPaymentMethod(e.target.value)}
        sx={{
          color: "black",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
        }}
      >
        <MenuItem sx={{ color: "black" }} value="" disabled>
          Select payment
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="credit/debit">
          credit/debit{" "}
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="COD">
          COD
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderPaymentMethodFilter;
