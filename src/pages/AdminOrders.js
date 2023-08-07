import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { fCurrency } from "../utils/numberFormat";
import OrderStatus from "../features/order/OrderStatus";
import OrderPayment from "../features/order/OrderPayment";
import OrderPaymentStatus from "../features/order/OrderPaymentStatus";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import OrderStatusFilter from "../features/order/OrderStatusFilter";
import OrderPaymentStatusFilter from "../features/order/OrderPaymentStatusFilter";
import OrderPaymentMethodFilter from "../features/order/OrderPaymentMethodFilter";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LoadingButton } from "@mui/lab";

const tableColumnsTitle = [
  { id: "order_id", label: "Order ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "payment_method", label: "Payment Method", minWidth: 170 },
  { id: "payment_status", label: "Payment Status", minWidth: 170 },
  { id: "manage_order", minWidth: 170 },
];

function AdminOrders() {
  const [name, setName] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderPaymentStatus, setOrderPaymentStatus] = useState("");
  const [orderPaymentMethod, setOrderPaymentMethod] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { orders, count, loading, error } = useSelector(
    (state) => state?.orders
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getStatus = (order) => {
    return {
      status: <OrderStatus order={order} />,
      paymentMethod: <OrderPayment order={order} />,
      paymentStatus: <OrderPaymentStatus order={order} />,
    };
  };

  useEffect(() => {
    dispatch(
      getOrders({
        page: page + 1,
        limit: rowsPerPage,
        name: name,
        status: orderStatus,
        payment_status: orderPaymentStatus,
        payment_method: orderPaymentMethod,
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    setOrderStatus(e.target[2].value);
    setOrderPaymentStatus(e.target[4].value);
    setOrderPaymentMethod(e.target[6].value);

    dispatch(
      getOrders({
        page: page + 1,
        limit: rowsPerPage,
        name: name,
        status: orderStatus,
        payment_status: orderPaymentStatus,
        payment_method: orderPaymentMethod,
      })
    );
  };
  const handleClear = () => {
    setName("");
    setOrderStatus("");
    setOrderPaymentStatus("");
    setOrderPaymentMethod("");
    setPage(0);
    dispatch(
      getOrders({
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ mt: 10 }}>
        <Paper sx={{ p: 3, backgroundColor: "secondary.lighter" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Orders
            </Typography>
            <ShoppingCartIcon style={{ fontSize: 50 }} />
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "block", md: "block", lg: "flex" },
              justifyContent: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "space-between",
              },
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: 250, sm: 400, md: 400, lg: 400 },
                height: 50,
                backgroundColor: "white",
              }}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  color: "black",
                }}
                placeholder="Search name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>{" "}
            <Box sx={{ mt: { xs: 1, sm: 1, md: 1, lg: 0 } }}>
              <OrderStatusFilter
                orderStatus={orderStatus}
                setOrderStatus={setOrderStatus}
              />
              <OrderPaymentStatusFilter
                orderPaymentStatus={orderPaymentStatus}
                setOrderPaymentStatus={setOrderPaymentStatus}
              />
              <OrderPaymentMethodFilter
                orderPaymentMethod={orderPaymentMethod}
                setOrderPaymentMethod={setOrderPaymentMethod}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "block", sm: "block", md: "block", lg: "flex" },
              justifyContent: { xs: "none", sm: "none", md: "none", lg: "end" },
              p: 1,
            }}
          >
            <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              endIcon={<FilterAltIcon />}
              sx={{ mr: 1 }}
            >
              Filter
            </LoadingButton>
            <Button
              size="small"
              variant="contained"
              endIcon={<ClearIcon />}
              onClick={handleClear}
            >
              Clear
            </Button>
          </Box>

          <TableContainer sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#74b9ff" }}>
                  {tableColumnsTitle.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody sx={{ position: "relative" }}>
                {loading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    {orders ? (
                      orders?.map((order) => {
                        const { status, paymentMethod, paymentStatus } =
                          getStatus(order);

                        return (
                          <TableRow
                            key={order._id}
                            style={{
                              backgroundColor:
                                theme.palette.mode === "dark" &&
                                "paleturquoise",
                            }}
                          >
                            <TableCell sx={{ fontWeight: "bold" }}>
                              {order._id}
                            </TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell>
                              {order.shipping_address}, district{" "}
                              {order.district}, {order.city}
                            </TableCell>
                            <TableCell>
                              {" "}
                              {new Date(order.createdAt).toString()}
                            </TableCell>
                            <TableCell>{fCurrency(order.totalPrice)}</TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell>{paymentMethod}</TableCell>
                            <TableCell>{paymentStatus}</TableCell>
                            <TableCell>
                              {order.status !== "canceled" ? (
                                <Button
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                  }}
                                  size="small"
                                  endIcon={<EditIcon />}
                                  onClick={() =>
                                    navigate(`/admin/orders/edit/${order._id}`)
                                  }
                                >
                                  Edit
                                </Button>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <Alert severity="error">{error}</Alert>
                    )}
                  </>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    sx={{ color: theme.palette.mode === "dark" && "black" }}
                    rowsPerPageOptions={[5, 10, 25]}
                    page={page}
                    count={count}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPage={rowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </form>
  );
}

export default AdminOrders;
