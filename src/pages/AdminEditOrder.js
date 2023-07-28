import React, { useEffect } from "react";
import { FTextField, FormProvider } from "../components/form";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import OrderStatus from "../features/order/OrderStatus";
import OrderPayment from "../features/order/OrderPayment";
import OrderPaymentStatus from "../features/order/OrderPaymentStatus";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOrder, updateOrder } from "../features/order/orderSlice";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentsIcon from "@mui/icons-material/Payments";
import PaidIcon from "@mui/icons-material/Paid";
import { fCurrency } from "../utils/numberFormat";
import LoadingScreen from "../components/LoadingScreen";

function AdminEditOrder() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, order, error } = useSelector((state) => state?.orders);
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

  const methods = useForm({
    defaultValues: {
      status: "",
      payment_status: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = methods;

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

  const onSubmit = async (data) => {
    const { status, payment_status } = data;
    dispatch(
      updateOrder({
        status: status,
        payment_status: payment_status,
        id: order._id,
      })
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container sx={{ mt: 8 }}>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {order ? (
                <>
                  <Box>
                    <Box
                      sx={{
                        mb: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        Order Id: #{order?._id}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {status}
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel id="demo-simple-select-label">
                            Status
                          </InputLabel>
                          <Select
                            {...register("status")}
                            label="Status"
                            disabled={
                              order.status === "delivered" ? true : false
                            }
                          >
                            <MenuItem value="" disabled>
                              Select status
                            </MenuItem>
                            <MenuItem
                              disabled={
                                order.status === "shipped" ? true : false
                              }
                              value="pending"
                            >
                              Pending{" "}
                            </MenuItem>
                            <MenuItem
                              disabled={
                                order.status === "shipped" ? true : false
                              }
                              value="accepted"
                            >
                              Accepted
                            </MenuItem>
                            <MenuItem
                              disabled={
                                order.status === "shipped" ? true : false
                              }
                              value="order processed"
                            >
                              Processing
                            </MenuItem>
                            <MenuItem
                              disabled={
                                order.status === "shipped" ? true : false
                              }
                              value="preparing for shipment"
                            >
                              Preparing Your Order
                            </MenuItem>
                            <MenuItem value="shipped">On Your Way</MenuItem>
                            <MenuItem value="delivered">Delivered</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
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
                          Payment Status:{" "}
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {paymentStatus}{" "}
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel id="demo-simple-select-label">
                                Status
                              </InputLabel>
                              <Select
                                {...register("payment_status")}
                                label="Status"
                                autoWidth
                                sx={{ textC: "red" }}
                              >
                                <MenuItem value="" disabled>
                                  Select status
                                </MenuItem>
                                <MenuItem value="paid">Paid</MenuItem>
                                <MenuItem value="unpaid">Unpaid</MenuItem>
                              </Select>
                            </FormControl>
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
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
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
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={isSubmitting || loading}
                        >
                          Save Changes
                        </LoadingButton>
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
    </FormProvider>
  );
}

export default AdminEditOrder;
