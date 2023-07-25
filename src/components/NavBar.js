import React from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../components/Logo.js";
import useAuth from "../hooks/useAuth.js";
import { useSelector } from "react-redux";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cartItemCount } = useSelector((state) => state?.carts);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      handleClose();
      await logout(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name && `Welcome ${user.name}!`}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/account"
        sx={{ mx: 1 }}
      >
        Profile
      </MenuItem>

      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/order"
        sx={{ mx: 1 }}
      >
        My Order
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleLogout} sx={{ mx: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <Box>
      <AppBar sx={{ height: "70px", justifyContent: "center" }}>
        <Container>
          <Toolbar variant="dense" sx={{ justifyContent: "space-around" }}>
            <Stack direction="row" alignItems="center">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
              >
                <Logo />
              </IconButton>
              <Typography
                variant="h6"
                color="text.primary"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                {" "}
                HomeTech Space
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                {" "}
                Home
              </Button>

              <Button
                component={RouterLink}
                to="/product"
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                {" "}
                Products
              </Button>
              <Button
                component={RouterLink}
                to="/bundle"
                sx={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "18px",
                }}
              >
                {" "}
                Bundle
              </Button>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={user ? handleProfileMenuOpen : handleLogin}>
                {" "}
                <AccountCircleIcon color="dark" />
              </IconButton>
              {renderMenu}
              <IconButton onClick={() => navigate("/cart")}>
                {" "}
                <Badge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCartIcon color="dark" />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default NavBar;
