import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StartIcon from "@mui/icons-material/Start";

function BundleBanner() {
  const navigate = useNavigate();
  const cardMediaSX = {
    transition: "transform 0.5s all ease-in-out",
    "&:hover": {
      transform: "scale(1.5)",
      cursor: "pointer",
    },
  };

  const styles = {
    button: {
      width: 50,
      height: 50,
    },
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Shop Our Pack Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Card
            sx={{
              backgroundColor: "#F0F8FF",
              height: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  onClick={() => navigate("/bundle")}
                  color="dark"
                  size="large"
                  sx={{
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "transparent",
                      transform: "translate(0, -10px)",
                    },
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 600,
                      mr: 2,
                    }}
                  >
                    Shop Bundles
                  </Typography>
                  <StartIcon style={styles.button} />
                </IconButton>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Card>
            <CardMedia
              component="img"
              image="https://blog.smartify.in/wp-content/uploads/2020/12/Smart-home-devices.jpg"
              title="bundle"
              sx={cardMediaSX}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BundleBanner;
