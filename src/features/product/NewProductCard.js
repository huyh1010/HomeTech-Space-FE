import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { fCurrency } from "../../utils/numberFormat";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import React from "react";

function NewProductCard({ product }) {
  return (
    <Card
      sx={{
        height: "300px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <NewReleasesIcon
        color="red"
        fontSize="large"
        sx={{ position: "absolute", right: 10, top: 10 }}
      />

      <CardMedia
        component={"img"}
        image={product.poster_path}
        title={product.name}
        sx={{ height: "50%", objectFit: "contain" }}
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
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default NewProductCard;
