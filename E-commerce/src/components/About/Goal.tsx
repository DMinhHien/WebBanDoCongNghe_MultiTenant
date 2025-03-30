import { Box, Typography, Grid } from "@mui/material";
import { ShoppingCart, Info, CheckCircle } from "@mui/icons-material"; 

const Goal = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 5,
            fontSize: { xs: "1.8rem", sm: "2.5rem" },
          }}
        >
          Thay đổi trải nghiệm tương tác của bạn
        </Typography>

        <Grid container spacing={5} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
              }}
            >
              Mua sắm dễ dàng trong tầm tay bạn
            </Typography>
            <Typography sx={{ color: "#555", marginBottom: "10px" }}>
            Tận hưởng giao diện trực quan, liền mạch giúp bạn tìm kiếm và mua các sản phẩm second-hand yêu thích một cách dễ dàng và nhanh chóng.
            </Typography>
            <ShoppingCart sx={{ fontSize: "3rem", color: "#0000FF" }} />{" "}
            {/* Shopping cart icon */}
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
              }}
            >
              Thông tin sản phẩm minh bạch và chi tiết
            </Typography>
            <Typography sx={{ color: "#555", marginBottom: "10px" }}>
            Chúng tôi cung cấp cho bạn mọi thông tin cần thiết để đưa ra lựa chọn sáng suốt, bao gồm giá cả, nguồn gốc và lợi ích của sản phẩm.
            </Typography>
            <Info sx={{ fontSize: "3rem", color: "#0000FF" }} />{" "}
            {/* Information icon */}
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "10px",
              }}
            >
              Trải nghiệm không rắc rối
            </Typography>
            <Typography sx={{ color: "#555", marginBottom: "10px" }}>
            Quy trình đơn giản của chúng tôi đảm bảo bạn có thể mua sắm dễ dàng và thuận tiện, giúp bạn tiết kiệm thời gian cho mỗi đơn hàng.
            </Typography>
            <CheckCircle sx={{ fontSize: "3rem", color: "#0000FF" }} />{" "}
            {/* Checkout icon */}
          </Grid>
        </Grid>
      </Box>
      <Box
        component="img"
        src="https://secomm.vn/wp-content/uploads/2021/11/Chien-luoc-kinh-doanh-Thuong-mai-dien-tu-toan-dien-cho-doanh-nghiep.png"
        alt="Shopping Experience"
        sx={{
          width: "100%",
          marginTop: 8,
          display: "block",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default Goal;
