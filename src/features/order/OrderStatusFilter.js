import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function OrderStatusFilter({ orderStatus, setOrderStatus }) {
  return (
    <FormControl sx={{ mr: 1, minWidth: 120 }}>
      <InputLabel>Status</InputLabel>
      <Select
        label="Status"
        value={orderStatus}
        onChange={(e) => setOrderStatus(e.target.value)}
      >
        <MenuItem value="" disabled>
          Select status
        </MenuItem>
        <MenuItem value="pending">Pending </MenuItem>
        <MenuItem value="accepted">Accepted</MenuItem>
        <MenuItem value="order processed">Processing</MenuItem>
        <MenuItem value="preparing for shipment">Preparing Your Order</MenuItem>
        <MenuItem value="shipped">On Your Way</MenuItem>
        <MenuItem value="delivered">Delivered</MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderStatusFilter;
