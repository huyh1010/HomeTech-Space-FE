import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function OrderStatusFilter({ orderStatus, setOrderStatus }) {
  return (
    <FormControl
      sx={{ mr: 1, minWidth: 120, mb: { xs: 1, sm: 0, md: 0, lg: 0 } }}
    >
      <InputLabel sx={{ color: "black" }}>Status</InputLabel>
      <Select
        label="Status"
        value={orderStatus}
        onChange={(e) => setOrderStatus(e.target.value)}
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
        <MenuItem sx={{ color: "black" }} value="pending">
          Pending{" "}
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="accepted">
          Accepted
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="order processed">
          Processing
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="preparing for shipment">
          Preparing Your Order
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="shipped">
          On Your Way
        </MenuItem>
        <MenuItem sx={{ color: "black" }} value="delivered">
          Delivered
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderStatusFilter;
