import React from "react";
import { Box, Typography, Button } from "@mui/material";
import banner from "../../../assets/shopbanner.jpeg";
import { useNavigate } from "react-router-dom";
const BannerShop: React.FC = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/shops"); // Navigate to the /product page
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh", // Full screen height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${banner})`, // Replace with the actual image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
        }}
      />
      {/* Text content */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          color: "white",
          zIndex: 1,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Khám phá các gian hàng đồ dùng công nghệ
        </Typography>
        <Typography variant="body1" mb={3}>
         Cung cấp thông tin đầy đủ về các gian hàng đồ dùng công nghệ cho nhu cầu của bạn
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            backgroundColor: "#ff007f",
            "&:hover": { backgroundColor: "#e6006e" },
          }}
          onClick={handleShopNow} 
        >
          Xem cửa hàng
        </Button>
      </Box>
    </Box>
  );
};

export default BannerShop;