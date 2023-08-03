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
import { cancelOrder } from "./orderSlice";

function OrderCancelStatus({ order }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = (orderId) => {
    dispatch(cancelOrder({ id: orderId })).then(() => handleClose());
  };
  if (!order) return null;
  if (order.status === "pending") {
    return (
      <>
        <Button
          onClick={handleClickOpen}
          size="small"
          variant="contained"
          style={{
            backgroundColor: "red",
          }}
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
        <Dialog open={open} onClose={handleClose}>
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
