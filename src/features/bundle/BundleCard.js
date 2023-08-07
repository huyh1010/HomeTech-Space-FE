import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { fCurrency } from "../../utils/numberFormat";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

function BundleCard({ bundle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = (bundle) => {
    dispatch(addToCart(bundle));
  };

  return (
    <Card
      sx={{
        height: "350px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component={"img"}
        image={bundle.poster_path}
        title={bundle.name}
        sx={{ height: "60%", objectFit: "cover", width: "100%" }}
        onClick={() => navigate(`/bundle/${bundle._id}`)}
      />
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {fCurrency(bundle.price)}
        </Typography>

        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {bundle.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{
            backgroundColor: "black",
            margin: "auto",
            borderRadius: 14,
          }}
          onClick={() => handleAddToCart(bundle)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default BundleCard;
