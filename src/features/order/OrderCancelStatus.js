import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import { cancelOrder, getUserOrder } from "./orderSlice";

function OrderCancelStatus({ order, page, rowsPerPage, user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = (orderId) => {
    dispatch(cancelOrder({ id: orderId })).then(
      dispatch(
        getUserOrder({
          user_id: user._id,
          page: page + 1,
          limit: rowsPerPage + 1,
        })
      ),
      handleClose()
    );
  };
  if (!order) return null;
  if (order.status === "pending") {
    return (
      <>
        <Button
          onClick={() => handleClickOpen(order._id)}
          size="small"
          variant="contained"
          style={{
            backgroundColor: "red",
          }}
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Dialog open={open === order._id} onClose={handleClose}>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            {"Cancel Order"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              Are you sure you'd like to cancel this order? The cancellation of
              an order cannot be undone. If you wish to cancel this order, click
              "Confirm". If you do not wish to cancel this order, click the
              "Cancel" button
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ margin: "auto" }}>
            <Button
              onClick={() => handleCancel(order._id)}
              style={{ backgroundColor: "#3366FF", color: "white" }}
            >
              Confirm
            </Button>
            <Button
              onClick={handleClose}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return;
  }
}

export default OrderCancelStatus;
