import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let shipping_fees = 4.99;
  let tax_fees = 1.99;
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSearch = (e) => {
    e.preventDefault();
    setName(e.target[0].value);
    dispatch(getOrders({ page: page + 1, limit: rowsPerPage, name: name }));
  };

  useEffect(() => {
    dispatch(
      getOrders({
        page: page + 1,
        limit: rowsPerPage,
        name: name,
        status: orderStatus,
      })
    );
    // eslint-disable-next-line
  }, [dispatch, page, rowsPerPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    setOrderStatus(e.target[0].value);
    dispatch(
      getOrders({ page: page + 1, limit: rowsPerPage, status: orderStatus })
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ mt: 4 }}>
        <Box sx={{ display: "flex" }}>
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="" disabled>
                Select status
              </MenuItem>
              <MenuItem value="pending">Pending </MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="order processed">Processing</MenuItem>
              <MenuItem value="preparing for shipment">
                Preparing Your Order
              </MenuItem>
              <MenuItem value="shipped">On Your Way</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Button
              size="small"
              type="submit"
              variant="contained"
              endIcon={<FilterAltIcon />}
            >
              Filter
            </Button>
          </Box>
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
                      let total = order.orderItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      );

                      total = total + shipping_fees + tax_fees;
                      return (
                        <TableRow key={order._id}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {order._id}
                          </TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>
                            {order.shipping_address}, district {order.district},{" "}
                            {order.city}
                          </TableCell>
                          <TableCell>
                            {" "}
                            {new Date(order.createdAt).toString()}
                          </TableCell>
                          <TableCell>{fCurrency(total)}</TableCell>
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
                                  navigate(`/admin/orders/${order._id}`)
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
      </Container>
    </form>
  );
}

export default AdminOrders;
