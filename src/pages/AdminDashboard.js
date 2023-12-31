import { Container } from "@mui/material";
import React, { useEffect } from "react";
import AdminInfoCard from "../components/AdminInfoCard";
import UserInfo from "../features/user/UserInfo";
import OrderInfo from "../features/order/OrderInfo";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { orders, count } = useSelector((state) => state?.orders);
  const totalRevenue = orders?.reduce(
    (total, order) => order.totalPrice + total,
    0
  );

  useEffect(() => {
    dispatch(getOrders({}));
  }, [dispatch]);
  return (
    <Container sx={{ mt: 8 }}>
      <AdminInfoCard count={count} totalRevenue={totalRevenue} />
      <UserInfo />
      <OrderInfo orders={orders} count={count} />
    </Container>
  );
}

export default AdminDashboard;
