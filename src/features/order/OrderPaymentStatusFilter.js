import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function OrderPaymentStatusFilter({
  orderPaymentStatus,
  setOrderPaymentStatus,
}) {
  return (
    <FormControl sx={{ mr: 1, minWidth: 180, color: "black" }}>
      <InputLabel sx={{ color: "black" }}>Payment Status</InputLabel>
      <Select
        label="Payment Status"
        value={orderPaymentStatus}
        onChange={(e) => setOrderPaymentStatus(e.target.value)}
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
          Select status
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="paid">
          Paid{" "}
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="unpaid">
          Unpaid
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderPaymentStatusFilter;
