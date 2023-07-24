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

function BundleCard({ bundle }) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/bundle/${bundle._id}`)}
      sx={{
        height: "300px",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component={"img"}
        image={bundle.poster_path}
        title={bundle.name}
        sx={{ height: "50%", objectFit: "contain" }}
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
          // onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default BundleCard;
