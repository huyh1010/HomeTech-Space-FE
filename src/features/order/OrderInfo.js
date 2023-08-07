import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderSales } from "./orderSlice";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import BarChart from "../../components/BarChart";

import LineChart from "../../components/LineChart";

function OrderInfo() {
  const dispatch = useDispatch();
  const { orderLast7Days, orderLast30Days } = useSelector(
    (state) => state?.orders
  );

  const orderSalesLast7DaysData = {
    labels: orderLast7Days?.map((order) => order.dateDMY),
    datasets: [
      {
        label: "Orders Last 7 Days",
        data: orderLast7Days?.map((order) => order.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const orderSalesLast30DaysData = {
    labels: orderLast30Days?.map((order) => order.dateDMY),
    datasets: [
      {
        label: "Orders Last 30 Days",
        data: orderLast30Days?.map((order) => order.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(getOrderSales());
  }, [dispatch]);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={12} lg={6}>
        <Paper sx={{ padding: 3, backgroundColor: "#fff" }}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            {" "}
            Order Sales in Last 7 Days
          </Typography>
          <Divider sx={{ my: 1 }} />
          {orderSalesLast7DaysData.datasets ? (
            <BarChart chartData={orderSalesLast7DaysData} />
          ) : (
            ""
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12} lg={6}>
        <Paper sx={{ padding: 3, backgroundColor: "#fff" }}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            {" "}
            Order Sales in Last 30 Days
          </Typography>
          <Divider sx={{ my: 1 }} />
          {orderSalesLast30DaysData.datasets ? (
            <LineChart chartData={orderSalesLast30DaysData} />
          ) : (
            ""
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default OrderInfo;
