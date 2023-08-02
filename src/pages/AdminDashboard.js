import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AdminInfoCard from "../components/AdminInfoCard";

function AdminDashboard() {
  return (
    <Container sx={{ mt: 8 }}>
      <AdminInfoCard />
    </Container>
  );
}

export default AdminDashboard;
