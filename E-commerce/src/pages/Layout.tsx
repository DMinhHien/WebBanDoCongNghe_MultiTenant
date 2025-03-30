import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Layout;
