import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  updateCart,
} from "../features/cart/cartSlice";
import { fCurrency } from "../utils/numberFormat";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state?.carts);

  const totalPrice = () => {
    let total = 0;

    cart?.map((item) => (total = total + item.quantity * item.price));
    return total;
  };

  const handleIncrease = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };
  const handleDecrease = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };
  const handleDelete = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        My Cart
      </Typography>
      {cart?.length < 1 ? (
        <Typography>Cart is Empty</Typography>
      ) : (
        <>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty.</TableCell>
                    <TableCell>Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        sx={{
                          display: "flex",
                          alignItems: "center",

                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          src={item.poster_path}
                          sx={{ mr: 2, width: 50, height: 50 }}
                          alt={item.name}
                        />
                        <Typography variant="body1">{item.name}</Typography>
                      </TableCell>
                      <TableCell>{fCurrency(item.price)}</TableCell>
                      <TableCell
                        sx={{
                          display: "flex",
                          // alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton onClick={() => handleIncrease(item._id)}>
                          <AddIcon />
                        </IconButton>
                        {/* <Typography variant="subtitle2">
                    
                  </Typography> */}
                        {item.quantity}
                        <IconButton
                          onClick={() => handleDecrease(item._id)}
                          disabled={item.quantity === 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {fCurrency(item.price * item.quantity)}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(item._id)}>
                          <DeleteIcon color="red" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">
                      {fCurrency(totalPrice())}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">
                      {fCurrency(totalPrice())}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box textAlign={"center"} mt={4}>
            <Button
              onClick={() => navigate("/checkout")}
              size="large"
              style={{
                backgroundColor: "black",
                margin: "auto",
                borderRadius: 14,
              }}
            >
              Check Out
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default CartPage;
