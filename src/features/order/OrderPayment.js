import { Chip } from "@mui/material";
import React from "react";

function OrderPayment({ order }) {
  if (!order) return null;
  if (order.payment_method === "credit/debit") {
    return <Chip label="credit/debit" color="dark" />;
  }
  if (order.payment_method === "COD") {
    return <Chip label="COD" color="secondary" />;
  }
}

export default OrderPayment;
