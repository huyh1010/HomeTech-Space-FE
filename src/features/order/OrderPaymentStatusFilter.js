import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function OrderPaymentStatusFilter({
  orderPaymentStatus,
  setOrderPaymentStatus,
}) {
  return (
    <FormControl sx={{ mr: 1, minWidth: 180 }}>
      <InputLabel>Payment Status</InputLabel>
      <Select
        label="Payment Status"
        value={orderPaymentStatus}
        onChange={(e) => setOrderPaymentStatus(e.target.value)}
      >
        <MenuItem value="" disabled>
          Select status
        </MenuItem>
        <MenuItem value="paid">Paid </MenuItem>
        <MenuItem value="unpaid">Unpaid</MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderPaymentStatusFilter;
