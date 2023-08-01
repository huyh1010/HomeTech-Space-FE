import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AdminProductList from "../components/AdminProductList";
import AdminProductManagement from "../components/AdminProductManagement";
import SpeakerIcon from "@mui/icons-material/Speaker";

function AdminProducts() {
  const [currentTab, setCurrentTab] = useState("Product Lists");
  const PRODUCT_TABS = [
    {
      value: "Product Lists",

      component: <AdminProductList />,
    },
    {
      value: "Products Management",

      component: <AdminProductManagement />,
    },
  ];
  const handleChange = (newValue) => {
    setCurrentTab(newValue);
  };
  return (
    <Container sx={{ mt: 10 }}>
      <Paper sx={{ p: 3, backgroundColor: "primary.lighter" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Products
          </Typography>
          <SpeakerIcon style={{ fontSize: 50 }} />
        </Box>

        <Tabs
          value={currentTab}
          onChange={(e, value) => handleChange(value)}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          // sx={{ "& button": { backgroundColor: "green" } }}
        >
          {PRODUCT_TABS.map((tab) => (
            <Tab
              disableRipple
              label={tab.value}
              key={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Box sx={{ mb: 5 }} />
        {PRODUCT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Paper>
    </Container>
  );
}

export default AdminProducts;
