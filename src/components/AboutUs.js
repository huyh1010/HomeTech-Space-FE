import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

function AboutUs() {
  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "background.main" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Overview
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontWeight: 400 }}
              >
                HomeTech offers a wide range of affordable smart home devices
                products and provides a convenient shopping experience for
                everyone.
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="https://homesenator.com/wp-content/uploads/2021/06/smart-home-slider3.jpg"
              sx={{}}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "background.main" }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Frequently Asked Questions
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography>Updates on safe Shopping in our Stores</Typography>
              <Typography>All of your questions can be found here!</Typography>
            </CardContent>
            <CardMedia
              component="img"
              image="https://symosis.co.uk/wp-content/uploads/2021/04/connected-home-mom-son-living-room-rwd.png.rendition.intel_.web_.864.486.png"
              sx={{}}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutUs;
