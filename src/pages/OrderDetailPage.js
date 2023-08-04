import {
  Alert,
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
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OrderStatus from "../features/order/OrderStatus";
import OrderPayment from "../features/order/OrderPayment";
import OrderPaymentStatus from "../features/order/OrderPaymentStatus";
import LoadingScreen from "../components/LoadingScreen";

function OrderDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order, loading, error } = useSelector((state) => state?.orders);
  const { id } = useParams();

  let shipping_fees = 4.99;
  let tax_fees = 1.99;
  const getStatus = (order) => {
    return {
      status: <OrderStatus order={order} />,
      paymentMethod: <OrderPayment order={order} />,
      paymentStatus: <OrderPaymentStatus order={order} />,
    };
  };
  const { status, paymentMethod, paymentStatus } = getStatus(order);

  useEffect(() => {
    dispatch(getSingleOrder({ id: id }));
  }, [dispatch, id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {order ? (
              <>
                <Box>
                  <Typography variant="h3">
                    Thank you for your order{" "}
                    <CheckCircleOutlineIcon
                      style={{ fontSize: 40, color: "green" }}
                    />{" "}
                  </Typography>

                  <Box
                    sx={{
                      display: {
                        xs: "block",
                        sm: "flex",
                        md: "flex",
                        lg: "flex",
                      },
                      mb: 1,
                      mt: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold", mr: 1 }}>
                      Order Id: #{order?._id}
                    </Typography>
                    {status}
                  </Box>
                  <Typography variant="body1" sx={{ color: "text.tertiary" }}>
                    {new Date(order?.createdAt).toString()}
                  </Typography>
                </Box>
                <Card
                  sx={{
                    p: 2,
                    mt: 2,
                    display: {
                      xs: "block",
                      sm: "flex",
                      md: "flex",
                      lg: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="dark"
                      sx={{ backgroundColor: "primary.light", mr: 1 }}
                    >
                      <LocalShippingIcon style={{ fontSize: 70 }} />
                    </IconButton>
                    <CardContent>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Delivered to:{" "}
                        <Box>
                          <Typography>
                            Address: {order?.shipping_address}
                          </Typography>
                          <Typography>District: {order?.district}</Typography>
                          <Typography>City: {order?.city}</Typography>
                        </Box>
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="dark"
                      sx={{ backgroundColor: "primary.light", mr: 1 }}
                    >
                      <PaymentsIcon style={{ fontSize: 70 }} />
                    </IconButton>
                    <CardContent>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Payment Method: <Box>{paymentMethod}</Box>
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="dark"
                      sx={{ backgroundColor: "primary.light", mr: 1 }}
                    >
                      <PaidIcon style={{ fontSize: 70 }} />
                    </IconButton>
                    <CardContent>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Payment Status: <Box>{paymentStatus}</Box>
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
                              <TableRow
                                key={item._id}
                                sx={{ alignItems: "center" }}
                              >
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
                                  <Typography variant="body1">
                                    {item.name}
                                  </Typography>
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
                              <TableCell
                                colSpan={2}
                                sx={{ fontWeight: "bold" }}
                              >
                                Tax fees
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontWeight: "bold" }}
                              >
                                {fCurrency(tax_fees)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell rowSpan={3} />
                              <TableCell
                                colSpan={2}
                                sx={{ fontWeight: "bold" }}
                              >
                                Shipping fees
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontWeight: "bold" }}
                              >
                                {fCurrency(shipping_fees)}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                colSpan={2}
                                sx={{ fontWeight: "bold" }}
                              >
                                Total
                              </TableCell>
                              <TableCell
                                align="right"
                                sx={{ fontWeight: "bold" }}
                              >
                                {fCurrency(order.totalPrice)}
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
                        onClick={() => navigate("/")}
                      >
                        Continue Shopping
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Alert severity="error">{error}</Alert>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default OrderDetailPage;
