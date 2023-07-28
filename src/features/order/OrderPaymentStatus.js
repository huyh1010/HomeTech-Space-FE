import { Chip } from "@mui/material";
import React from "react";

function OrderPaymentStatus({ order }) {
  if (!order) return null;
  if (order.payment_status === "paid") {
    return <Chip label="paid" color="success" />;
  }
  if (order.payment_status === "unpaid") {
    return <Chip label="unpaid" color="red" />;
  }
}

export default OrderPaymentStatus;
