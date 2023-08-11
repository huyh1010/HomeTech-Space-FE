import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { fCurrency } from "../../utils/numberFormat";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

function NewProductCard({ product }) {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Card
      sx={{
        height: "350px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <CardMedia
        component={"img"}
        image={product.poster_path}
        title={product.name}
        sx={{ height: "60%", objectFit: "cover", width: "100%" }}
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
          {`${product.name.slice(0, 20)}...`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{
            backgroundColor: "black",
            color: "white",
            margin: "auto",
            borderRadius: 14,
          }}
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default NewProductCard;
