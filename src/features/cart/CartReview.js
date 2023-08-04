import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { fCurrency } from "../../utils/numberFormat";

function CartReview({ cart, subTotal, totalPrice, shipping_fees, tax_fees }) {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
        Current Cart
      </Typography>
      <Divider sx={{ mb: 1, borderBottomWidth: 1, borderColor: "gray" }} />
      {cart?.map((item) => (
        <Box
          key={item._id}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Stack>
            <Avatar
              src={item?.poster_path}
              sx={{ mr: 2, width: 50, height: 50 }}
              alt={item.name}
            />
            <Stack>
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "11rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Qty: {item?.quantity}
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography sx={{ fontWeight: "bold" }}>
              {fCurrency(item?.price)}
            </Typography>
          </Stack>
        </Box>
      ))}
      <Divider sx={{ mb: 1, borderBottomWidth: 1, borderColor: "gray" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Typography>Subtotal: {fCurrency(subTotal())}</Typography>
        <Typography>Tax fees: {fCurrency(tax_fees)}</Typography>
        <Typography>Shipping fees: {fCurrency(shipping_fees)}</Typography>
      </Box>
      <Divider sx={{ my: 1, borderBottomWidth: 1, borderColor: "gray" }} />
      <Typography sx={{ textAlign: "right", fontWeight: "bold" }}>
        Total: {fCurrency(totalPrice())}
      </Typography>
    </Card>
  );
}

export default CartReview;
