import React, { useEffect }  from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
  Badge
} from "@mui/material";
import { Search, ShoppingCart,  Menu, } from "@mui/icons-material";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useCartStore from "../../zustand/useCartStore";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  const { cartDetail } = useCartStore();
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === "Admin") {
      navigate("/admin"); // Điều hướng đến trang admin nếu là admin
    }
  }, [user, navigate]);
  useEffect(() => {
  }, [cartDetail]);
  const handleProfileClick = () => {
    navigate('/profile'); // Điều hướng đến trang chỉnh sửa thông tin cá nhân
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleCart = () => {
    navigate('/cart');
  };
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const menuItems = (
    <List
      style={{
        display: isMobile ? "block" : "flex",
        gap: isMobile ? "0" : "20px",
      }}
    >
      <ListItemButton component = {Link} to ="/">
        <ListItemText
          primary="Trang chủ"
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
      <ListItemButton component = {Link} to ="/categories">
        <ListItemText
          primary="Sản phẩm"
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
      <ListItemButton component = {Link} to ="/shops">
        <ListItemText
          primary="Shops"
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
      <ListItemButton component = {Link} to ="/about">
        <ListItemText
          primary="About"
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>
      
    </List>
  );
 
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#FBFAF1", boxShadow: "none", color: "#333" }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Left section - Logo */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={1}>
          <img src={logo} alt="Brand Logo" style={{ height: "60px" }} />
          <Typography variant="h6" sx={{ color: "blue" }}>
            SecondHand
          </Typography>
        </Box>
        )}

        {/* Middle Section - Menu */}
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            {/* Drawer for Mobile View */}
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                style={{ width: 250 }}
              >
                <List>
                <ListItemButton component = {Link} to ="/">
                    <ListItemText primary="Trang chủ" />
                  </ListItemButton>
                  <ListItemButton component = {Link} to ="/categories">
                    <ListItemText primary="Sản phẩm" />
                  </ListItemButton>
                  <ListItemButton component = {Link} to ="/shops">
                    <ListItemText primary="Shops" />
                  </ListItemButton>
                  <ListItemButton component = {Link} to ="/about">
                    <ListItemText primary="About" />
                  </ListItemButton>
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          menuItems // Render the horizontal list for larger screens
        )}
        {/* Right Section - Search and Cart */}
        <Box style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* icon button */}
            {user ? (
          <>
            <IconButton color="inherit" onClick={handleProfileClick}>
              <AccountCircleIcon/>
            </IconButton>
            <IconButton color="inherit" onClick={handleCart}>
                <Badge
                  badgeContent= {cartDetail}
                  color="error"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
              <ShoppingCart></ShoppingCart>
              </Badge>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>Đăng Xuất</Button>
          </>
        ) : (
          <>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Đăng Nhập
          </Button>
          <Button color="inherit" onClick={() => navigate('/register')}>
          Đăng ký
        </Button>
        </>
        )}
             {/* icon button */}
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
