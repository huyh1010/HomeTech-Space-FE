import {
  Avatar,
  Box,
  Button,
  Card,
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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../features/cart/cartSlice";
import { fCurrency } from "../utils/numberFormat";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
        <Card sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h3">Cart is Empty</Typography>
          <ShoppingCartIcon style={{ fontSize: 50 }} />
        </Card>
      ) : (
        <>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell></TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty.</TableCell>
                    <TableCell>Sum</TableCell>
                    <TableCell>Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell
                        sx={{
                          // display: "flex",
                          // alignItems: "center",

                          cursor: "pointer",
                        }}
                      >
                        <Typography variant="body1">{item.name}</Typography>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Avatar
                          src={item.poster_path}
                          sx={{ mr: 2, width: 50, height: 50 }}
                          alt={item.name}
                        />
                      </TableCell>
                      <TableCell>{fCurrency(item.price)}</TableCell>

                      <TableCell>
                        <IconButton onClick={() => handleIncrease(item._id)}>
                          <AddIcon />
                        </IconButton>

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
                color: "white",
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
