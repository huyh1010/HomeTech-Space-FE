import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../features/order/orderSlice";
import {
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
  let shipping_fees = 4.99;
  let tax_fees = 1.99;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, count } = useSelector((state) => state?.orders);

  const getStatus = (order) => {
    return {
      status: <OrderStatus order={order} />,
      paymentMethod: <OrderPayment order={order} />,
      cancel: <OrderCancelStatus order={order} />,
    };
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  useEffect(() => {
    if (user) {
      dispatch(
        getUserOrder({ user_id: user._id, page: page + 1, limit: rowsPerPage })
      );
    }
  }, [dispatch, page, user, rowsPerPage]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3">Orders</Typography>
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
            <TableBody>
              {orders?.map((order) => {
                const { status, paymentMethod, cancel } = getStatus(order);
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
                    <TableCell>
                      {" "}
                      {new Date(order.createdAt).toString()}
                    </TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{paymentMethod}</TableCell>
                    <TableCell>{fCurrency(total)}</TableCell>
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
              })}
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
