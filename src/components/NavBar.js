import React from "react";
import {
  AppBar,
  Avatar,
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
  alpha,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../components/Logo.js";
import useAuth from "../hooks/useAuth.js";
import { useSelector } from "react-redux";
import SpeakerIcon from "@mui/icons-material/Speaker";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import { ColorModeContext } from "../theme/index.js";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cartItemCount } = useSelector((state) => state?.carts);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const open = Boolean(anchorElMenu);
  const colorMode = React.useContext(ColorModeContext);

  const handleClick = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
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

  const handleSelect = () => {
    navigate("/");
    handleCloseMenu();
  };
  const handleSelectProduct = () => {
    navigate("/product");
    handleCloseMenu();
  };

  const handleSelectBundle = () => {
    navigate("/bundle");
    handleCloseMenu();
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
        <Typography variant="subtitle2" noWrap sx={{ color: "black" }}>
          {user?.name && `Welcome ${user.name}!`}
        </Typography>
        <Typography variant="body2" sx={{ color: "black" }}>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/account"
        sx={{ mx: 1, color: "black" }}
      >
        Profile
      </MenuItem>

      <MenuItem
        onClick={handleClose}
        component={RouterLink}
        to="/order"
        sx={{ mx: 1, color: "black" }}
      >
        My Order
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleLogout} sx={{ mx: 1, color: "black" }}>
        Logout
      </MenuItem>
    </Menu>
  );
  return (
    <Box>
      <AppBar
        sx={{
          height: "70px",
          justifyContent: "center",
          backgroundColor: "background.default",
        }}
      >
        <Container>
          {isMatch ? (
            <Toolbar
              variant="dense"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Stack direction="row" alignItems="center">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 1 }}
                >
                  <Logo />
                </IconButton>
              </Stack>

              <Stack direction="row" alignItems="center">
                {user ? (
                  <Avatar onClick={handleProfileMenuOpen} src={user?.avatarUrl}>
                    {" "}
                  </Avatar>
                ) : (
                  <AccountCircleIcon color="dark" onClick={handleLogin} />
                )}
                {renderMenu}
                <IconButton onClick={() => navigate("/cart")}>
                  {" "}
                  <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Stack>

              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <MenuIcon />
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorElMenu}
                open={open}
                onClose={handleCloseMenu}
              >
                <MenuItem disableRipple sx={{ fontWeight: 600 }}>
                  HomeTech Space
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSelect} disableRipple>
                  <HomeIcon />
                  Home
                </MenuItem>

                <MenuItem onClick={handleSelectProduct} disableRipple>
                  <SpeakerIcon />
                  Products
                </MenuItem>
                <MenuItem onClick={handleSelectBundle} disableRipple>
                  <InventoryIcon />
                  Bundle
                </MenuItem>
              </StyledMenu>
            </Toolbar>
          ) : (
            <Toolbar
              variant="dense"
              sx={{
                justifyContent: "space-around",
              }}
            >
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
                {user ? (
                  <Avatar onClick={handleProfileMenuOpen} src={user?.avatarUrl}>
                    {" "}
                  </Avatar>
                ) : (
                  <AccountCircleIcon color="dark" onClick={handleLogin} />
                )}

                {renderMenu}
                <IconButton onClick={() => navigate("/cart")}>
                  {" "}
                  <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartIcon color="dark" />
                  </Badge>
                </IconButton>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon color="dark" />
                  ) : (
                    <Brightness4Icon color="dark" />
                  )}
                </IconButton>
              </Stack>
            </Toolbar>
          )}
        </Container>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default NavBar;
