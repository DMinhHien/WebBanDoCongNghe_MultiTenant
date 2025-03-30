import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import {   Menu } from "@mui/icons-material";
import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Navbar_admin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Điều hướng đến trang chỉnh sửa thông tin cá nhân
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "#FBFAF1", boxShadow: "none", color: "#333" }}
    >
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Left section - Logo */}
        {!isMobile && (
          <img src={logo} alt="Brand Logo" style={{ height: "60px" }} />
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
                  {/* Không còn các mục menu */}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <List style={{ display: "none" }}></List> // Không hiển thị danh mục trên màn hình lớn
        )}

        {/* Right Section - Search and Cart */}
        <Box style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          
          

          {user ? (
            <>
              <IconButton color="inherit" onClick={handleProfileClick}>
                <AccountCircleIcon/>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar_admin;
