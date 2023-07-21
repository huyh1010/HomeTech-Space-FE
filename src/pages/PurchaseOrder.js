import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import PaidIcon from "@mui/icons-material/Paid";
import { fCurrency } from "../utils/numberFormat";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { getSingleOrder } from "../features/order/orderSlice";
import { useParams } from "react-router-dom";

function PurchaseOrder() {
  const dispatch = useDispatch();

  const { orderId, order } = useSelector((state) => state?.orders);

  let shipping_fees = 4.99;
  let tax_fees = 1.99;
  const totalPrice = () => {
    let total = 0;
    order?.orderItems?.map(
      (item) => (total = total + item.quantity * item.price)
    );
    total = total + tax_fees + shipping_fees;
    return total;
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrder({ id: orderId }));
    }
  }, [dispatch, orderId]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Thank you for your order
        </Typography>
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
            Order Id: #{order?._id}
          </Typography>
          <Chip label={order?.status} color="tertiary" />
        </Box>
        <Typography variant="body1" sx={{ color: "text.tertiary" }}>
          {new Date(order?.createdAt).toString()}
        </Typography>
      </Box>
      <Card
        sx={{
          p: 2,
          mt: 2,
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="dark"
            sx={{ backgroundColor: "secondary.light", mr: 1 }}
          >
            <LocalShippingIcon style={{ fontSize: 70 }} />
          </IconButton>
          <CardContent>
            <Typography sx={{ fontWeight: "bold" }}>
              Delivered to:{" "}
              <Box>
                <Typography>Address: {order?.shipping_address}</Typography>
                <Typography>District: {order?.district}</Typography>
                <Typography>City: {order?.city}</Typography>
              </Box>
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="dark"
            sx={{ backgroundColor: "secondary.light", mr: 1 }}
          >
            <PaymentsIcon style={{ fontSize: 70 }} />
          </IconButton>
          <CardContent>
            <Typography sx={{ fontWeight: "bold" }}>
              Payment Method:{" "}
              <Box>
                <Typography>{order?.payment_method}</Typography>
              </Box>
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="dark"
            sx={{ backgroundColor: "secondary.light", mr: 1 }}
          >
            <PaidIcon style={{ fontSize: 70 }} />
          </IconButton>
          <CardContent>
            <Typography sx={{ fontWeight: "bold" }}>
              Payment Status:{" "}
              <Box>
                <Chip label={order?.payment_status} color="tertiary" />
              </Box>
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4">Order Summary</Typography>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty.</TableCell>
                    <TableCell>Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.orderItems?.map((item) => (
                    <TableRow key={item._id} sx={{ alignItems: "center" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          src={item.poster_path}
                          sx={{ mr: 2, width: 50, height: 50 }}
                          alt={item.name}
                        />
                        <Typography variant="body1">{item.name}</Typography>
                      </TableCell>
                      <TableCell>{fCurrency(item.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {" "}
                        {fCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell />
                    <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                      Tax fees
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {fCurrency(tax_fees)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                      Shipping fees
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {fCurrency(shipping_fees)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                      Total
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {fCurrency(totalPrice())}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h4">Customer</Typography>
            <CardContent>
              <Typography variant="h6">Contact</Typography>
              <Divider sx={{ mb: 1 }} />
              <Stack>
                <Typography sx={{ fontWeight: "bold" }}>
                  Name: {order.name}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Email: {order.email}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Phone: {order.phone}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  Address: {order.shipping_address}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  District: {order.district}
                </Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  City: {order.city}
                </Typography>
              </Stack>
              <Divider sx={{ mt: 1 }} />
            </CardContent>
          </Card>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            {" "}
            <Button
              variant="contained"
              style={{
                backgroundColor: "black",
                margin: "auto",
                borderRadius: 14,
                p: 5,
              }}
              endIcon={<ArrowOutwardIcon />}
            >
              Continue Shopping
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PurchaseOrder;
