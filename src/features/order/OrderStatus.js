import { Chip } from "@mui/material";
import React from "react";

function OrderStatus({ order }) {
  if (!order) return null;
  if (order.status === "pending") {
    return <Chip label="Pending" color="tertiary" />;
  }

  if (order.status === "accepted") {
    return <Chip label="Accepted" color="accept" />;
  }

  if (order.status === "order processed") {
    return <Chip label="Processing" color="process" />;
  }
  if (order.status === "preparing for shipment") {
    return <Chip label="Preparing Your Order" color="prepare" />;
  }
  if (order.status === "shipped") {
    return <Chip label="On Your Way" color="shipped" />;
  }
  if (order.status === "delivered") {
    return <Chip label="Delivered" color="success" />;
  }
  if (order.status === "canceled") {
    return <Chip label="Canceled" color="red" />;
  }
}

export default OrderStatus;
