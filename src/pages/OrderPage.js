import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../features/order/orderSlice";
import {
  Alert,
  Button,
  Container,
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
} from "@mui/material";
import OrderStatus from "../features/order/OrderStatus";
import OrderPayment from "../features/order/OrderPayment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fCurrency } from "../utils/numberFormat";
import { useNavigate } from "react-router-dom";
import OrderCancelStatus from "../features/order/OrderCancelStatus";
import LoadingScreen from "../components/LoadingScreen";

const tableColumnsTitle = [
  { id: "order_id", label: "Order ID", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "payment_method", label: "Payment Method", minWidth: 170 },
  { id: "total", label: "Total", minWidth: 170 },
  { id: "orderDetail", minWidth: 170 },
  { id: "cancelOrder", minWidth: 170 },
];

function OrderPage() {
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, count, error, loading } = useSelector(
    (state) => state?.orders
  );

  const getStatus = (order, page, rowsPerPage, user) => {
    return {
      status: <OrderStatus order={order} />,
      paymentMethod: <OrderPayment order={order} />,
      cancel: (
        <OrderCancelStatus
          order={order}
          page={page}
          rowsPerPage={rowsPerPage}
          user={user}
        />
      ),
    };
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (user) {
      dispatch(
        getUserOrder({ user_id: user._id, page: page + 1, limit: rowsPerPage })
      );
    }
    // eslint-disable-next-line
  }, [dispatch, page, user, rowsPerPage]);

  return (
    <Container sx={{ py: 10 }}>
      <Typography variant="h3">Your Orders</Typography>
      <Paper sx={{ width: "100%", mt: 2 }}>
        <TableContainer>
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
                      const { status, paymentMethod, cancel } = getStatus(
                        order,
                        page,
                        rowsPerPage,
                        user
                      );

                      return (
                        <TableRow key={order._id}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {order._id}
                          </TableCell>
                          <TableCell>
                            {" "}
                            {new Date(order.createdAt).toString()}
                          </TableCell>
                          <TableCell>{status}</TableCell>
                          <TableCell>{paymentMethod}</TableCell>
                          <TableCell>{fCurrency(order.totalPrice)}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => navigate(`/order/${order._id}`)}
                              size="small"
                              variant="contained"
                              style={{
                                backgroundColor: "black",
                              }}
                              endIcon={<VisibilityIcon />}
                            >
                              View
                            </Button>
                          </TableCell>
                          <TableCell>{cancel}</TableCell>
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
      </Paper>
    </Container>
  );
}

export default OrderPage;
