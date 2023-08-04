import { Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { getBundles } from "../features/bundle/bundleSlice";
import { fCurrency } from "../utils/numberFormat";
import SpeakerIcon from "@mui/icons-material/Speaker";
function AdminInfoCard({ count, totalRevenue }) {
  const dispatch = useDispatch();

  const totalProducts = useSelector(
    (state) => state?.products?.products?.count
  );
  const totalBundle = useSelector((state) => state?.bundles?.bundles?.count);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBundles({}));
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Paper
          sx={{ p: 3, textAlign: "center", backgroundColor: "blue.darker" }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            {" "}
            Orders
          </Typography>
          <Divider sx={{ my: 1, backgroundColor: "white" }} />
          <ShoppingCartIcon style={{ fontSize: 50, color: "white" }} />
          <Typography sx={{ color: "white" }}>
            {count} Total Orders Placed
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Paper sx={{ p: 3, textAlign: "center", backgroundColor: "blue.dark" }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            {" "}
            Revenues
          </Typography>
          <Divider sx={{ my: 1, backgroundColor: "white" }} />
          <AttachMoneyIcon style={{ fontSize: 50, color: "white" }} />
          <Typography sx={{ color: "white" }}>
            {fCurrency(totalRevenue)}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Paper sx={{ p: 3, textAlign: "center", backgroundColor: "red.light" }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Total Products
          </Typography>
          <Divider sx={{ my: 1, backgroundColor: "white" }} />
          <SpeakerIcon style={{ fontSize: 50, color: "white" }} />
          <Typography sx={{ color: "white" }}>{totalProducts} items</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Paper
          sx={{ p: 3, textAlign: "center", backgroundColor: "yellow.dark" }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            Total Bundles
          </Typography>
          <Divider sx={{ my: 1, backgroundColor: "white" }} />
          <InventoryIcon style={{ fontSize: 50, color: "white" }} />
          <Typography sx={{ color: "white" }}>{totalBundle} items</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminInfoCard;
