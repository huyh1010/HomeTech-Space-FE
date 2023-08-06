import { Box, GlobalStyles, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  const homePageStyles = (
    <GlobalStyles
      styles={{
        body: {
          background: "linear-gradient(to left, #afc8ee 10%, #fffde4 90%)",
        },
      }}
    />
  );
  return (
    <>
      <Stack sx={{ minHeight: "100vh" }}>
        <MainHeader />
        <AlertMsg />
        {homePageStyles}
        <Outlet />
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </>
  );
}

export default MainLayout;
