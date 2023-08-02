import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { getUsers } from "../features/user/userSlice";

function AdminInfoCard() {
  const dispatch = useDispatch();
  const { count, orders } = useSelector((state) => state?.orders);
  const { totalUsers } = useSelector((state) => state?.users?.users);
  const totalProducts = useSelector(
    (state) => state?.products?.products?.count
  );

  let shipping_fees = 4.99;
  let tax_fees = 1.99;

  orders?.forEach((order) => {
    let totalforAnOrder = order.orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    totalforAnOrder = totalforAnOrder + shipping_fees + tax_fees;
  });

  useEffect(() => {
    dispatch(getOrders({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers({}));
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item lg={3}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography> Orders</Typography>
          <ShoppingCartIcon style={{ fontSize: 50 }} />
          <Typography>{count} Total Orders Placed</Typography>
        </Paper>
      </Grid>
      <Grid item lg={3}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography> Revenues</Typography>
          <AttachMoneyIcon style={{ fontSize: 50 }} />
        </Paper>
      </Grid>
      <Grid item lg={3}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography>Registered Users</Typography>
          <PersonIcon style={{ fontSize: 50 }} />
          <Typography>{totalUsers} Users Registered</Typography>
        </Paper>
      </Grid>
      <Grid item lg={3}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography>Total Products</Typography>
          <InventoryIcon style={{ fontSize: 50 }} />
          <Typography>{totalProducts}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminInfoCard;
