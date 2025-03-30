import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  return (
    <Box
      sx={{
        // marginTop: "20px",
        borderTop: "2px solid #e0e0e0",
        backgroundColor: "#FBFAF1",
        display: "flex",
        flexDirection: "column",
        paddingX: "20px",
      }}
    >
      <Box
        sx={{
          paddingY: "10px",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Logo Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Brand Logo" width="50" height="50" />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginLeft: "10px" }}
          >
            SecondHand
          </Typography>
        </Box>

        {/* Social Media Icons */}
        <Box sx={{ display: "flex" }}>
          <IconButton>
            <YouTube
              sx={{
                fontSize: "40px",
                color: "#333",
                border: "2px solid #333",
                aspectRatio: 1,
                padding: "5px",
                borderRadius: "50%",
              }}
            />
          </IconButton>
          <IconButton>
            <Facebook
              sx={{
                fontSize: "40px",
                color: "#333",
                border: "2px solid #333",
                aspectRatio: 1,
                padding: "5px",
                borderRadius: "50%",
              }}
            />
          </IconButton>
          <IconButton>
            <Instagram
              sx={{
                fontSize: "40px",
                color: "#333",
                border: "2px solid #333",
                aspectRatio: 1,
                padding: "5px",
                borderRadius: "50%",
              }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Footer Text */}
      <Box
        sx={{
          paddingY: "10px",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            color: "#333",
            fontSize: "14px",
          }}
        >
          ©2024. Tạo bởi <span style={{ color: "#FF6347" }}>❤️</span> 
          Nhóm 5
        </Typography>

        {/* Privacy Policy and Terms */}
        <Box>
          <Link href="#" color="#333" underline="none">
            Chính Sách Bảo Mật
          </Link>{" "}
          |{" "}
          <Link href="#" color="#333" underline="none">
            Điều khoản & Điều kiện
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
