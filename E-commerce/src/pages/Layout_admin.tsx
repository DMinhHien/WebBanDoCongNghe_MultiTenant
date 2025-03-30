import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar_admin from "../components/Home/NavBar_admin";
import Footer from "../components/Home/Footer";

const Layout_admin = () => {
  return (
    <Box>
      <Navbar_admin />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout_admin;
