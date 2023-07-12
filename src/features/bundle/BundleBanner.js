import { Card, CardMedia, Container, Typography } from "@mui/material";
import React from "react";

function BundleBanner() {
  const cardMediaSX = {
    transition: "transform 0.5s all ease-in-out",
    "&:hover": {
      transform: "scale(1.5)",
      cursor: "pointer",
    },
  };
  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Shop Our Pack Product
      </Typography>
      <Card>
        <CardMedia
          component="img"
          image="https://blog.smartify.in/wp-content/uploads/2020/12/Smart-home-devices.jpg"
          title="bundle"
          sx={cardMediaSX}
        />
      </Card>
    </Container>
  );
}

export default BundleBanner;
