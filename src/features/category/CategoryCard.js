import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();
  const cardMediaSX = {
    width: "100%",
    height: "100%",
    transition: "transform 0.5s all ease-in-out",
    "&:hover": {
      transform: "scale(1.5)",
      cursor: "pointer",
    },
    position: "relative",
  };
  return (
    <Card
      sx={{ height: "250px", display: "flex" }}
      onClick={() => navigate(`/product/category/${category._id}`)}
    >
      <div style={cardMediaSX}>
        <CardMedia
          component="img"
          image={category.coverImgUrl}
          title={category.name}
          sx={cardMediaSX}
        />
        <div
          style={{
            position: "absolute",
            color: "white",
            top: 15,
            left: "50%",
            transform: "translateX(-50%)",
            textTransform: "capitalize",
            fontSize: "22px",
            whiteSpace: "nowrap",
          }}
        >
          {" "}
          {category.name}
        </div>
      </div>
    </Card>
  );
}

export default CategoryCard;
