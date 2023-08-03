import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "./orderSlice";

function OrderInfo({ orders, count }) {
  console.log(count);
  // let today = new Date();
  // let oneJan = new Date(today.getFullYear(), 0, 1);
  // let numberOfDays = Math.floor((today - oneJan) / (24 * 60 * 60 * 1000));
  // let result = Math.ceil((today.getDay() + 1 + numberOfDays) / 7);

  return <div>OrderInfo</div>;
}

export default OrderInfo;
