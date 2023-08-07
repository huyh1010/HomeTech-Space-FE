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
import StartIcon from "@mui/icons-material/Start";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomeBanner() {
  const navigate = useNavigate();
  const styles = {
    button: {
      width: 50,
      height: 50,
    },
  };
  return (
    <Container
      sx={{
        my: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={8}>
          <Card>
            <CardMedia
              component={"img"}
              image="https://media.wired.com/photos/63642ba400aff92bacb21cd5/master/w_2560%2Cc_limit/How-to-Set-Up-Smart-Home-Devices-With-2.4-GHz-Wi-Fi-Gear-GettyImages-1232197063.jpg"
            />
          </Card>
        </Grid>
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
                  onClick={() => navigate("/product")}
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
                    Begin Shopping
                  </Typography>
                  <StartIcon style={styles.button} />
                </IconButton>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeBanner;
