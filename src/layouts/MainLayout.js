import { Box, GlobalStyles, Stack, useTheme } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import { Outlet } from "react-router-dom";
import MainFooter from "./MainFooter";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  const theme = useTheme();
  const homePageStyles = (
    <GlobalStyles
      styles={{
        body: {
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(to right top, #010105, #111321, #171e3a, #1b2a54, #1a3770, #224582, #295394, #3062a7, #4675b3, #5c88be, #739cc8, #8bafd3);"
              : "linear-gradient(to left, #afc8ee 10%, #fffde4 90%)",
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
