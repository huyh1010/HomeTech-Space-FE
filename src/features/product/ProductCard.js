import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { fCurrency } from "../../utils/numberFormat";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductFromCart, updateCart } from "../cart/cartSlice";
import useAuth from "../../hooks/useAuth";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  // const { cart } = useSelector((state) => state?.carts);
  const cart = JSON.parse(window.localStorage.getItem("cart"));

  const handleAddToCart = (product, cart) => {
    if (user) {
      const id = user._id;

      dispatch(updateCart({ id, cart }));
    }

    dispatch(addToCart(product));
  };

  return (
    <Card
      sx={{
        height: "300px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component={"img"}
        image={product.poster_path}
        title={product.name}
        sx={{ height: "50%", objectFit: "contain" }}
        onClick={() => navigate(`/product/${product._id}`)}
      />
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {fCurrency(product.price)}
        </Typography>

        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {product.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{
            backgroundColor: "black",
            margin: "auto",
            borderRadius: 14,
          }}
          onClick={() => handleAddToCart(product, cart)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
