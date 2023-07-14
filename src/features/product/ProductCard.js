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
import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCart, addToCart } from "../cart/cartSlice";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleCart = (productId) => {
  //   dispatch(addProductToCart({ product_id: productId }));
  // };

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
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
