import React from "react";
import { Box, Typography, Button } from "@mui/material";
import banner from "../../../assets/bannerproduct1.jpg";
import { useNavigate } from "react-router-dom";
const BannerProduct: React.FC = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/categories"); // Navigate to the /product page
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
          Khám phá thế giới các đồ dùng công nghệ
        </Typography>
        <Typography variant="body1" mb={3}>
         Chúng tôi ở đây để cung cấp các sản phẩm và đồ dùng công nghệ phù hợp với mong muốn của bạn
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
          Xem sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default BannerProduct;