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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getProductFromCart,
  removeProductQuantity,
} from "../features/cart/cartSlice";
import { fCurrency } from "../utils/numberFormat";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

function CartPage() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const {
    cart: { cart },
  } = useSelector((state) => state?.carts);

  const addItem = (productId) => {
    dispatch(addProductToCart({ product_id: productId }));
  };
  // const decreaseItem = (productId) => {
  //   dispatch(removeProductQuantity({ product_id: productId }));
  // };

  useEffect(() => {
    dispatch(getProductFromCart());
  }, [dispatch]);

  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        My Cart
      </Typography>
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
              {cart?.map((e) =>
                e.items.map((item) => (
                  <TableRow>
                    <TableCell
                      sx={{
                        display: "flex",
                        alignItems: "center",

                        cursor: "pointer",
                      }}
                    >
                      <Avatar
                        src={item.productId.poster_path}
                        sx={{ mr: 2, width: 50, height: 50 }}
                        alt={item.productId.name}
                      />
                      <Typography variant="body1">
                        {item.productId.name}
                      </Typography>
                    </TableCell>
                    <TableCell>{fCurrency(item.productId.price)}</TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton onClick={() => addItem(item.productId._id)}>
                        <AddIcon />
                      </IconButton>
                      {/* <Typography variant="subtitle2">
                        
                      </Typography> */}
                      {item.quantity}
                      <IconButton
                      // onClick={() => decreaseItem(item.productId._id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{fCurrency(item.total)}</TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box textAlign={"center"} mt={4}>
        <Button
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
    </Container>
  );
}

export default CartPage;
