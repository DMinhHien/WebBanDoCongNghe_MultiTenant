import { Box, Typography } from "@mui/material";

const Vision = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: "80%",
            padding: "40px",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Box
            width={{ xs: "100%", sm: "50%" }}
            sx={{ paddingRight: { xs: 0, sm: "20px" } }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: "0",
                textAlign: "left",
                lineHeight: "1.5",
                fontSize: { xs: "1.8rem", md: "2.65rem" },
              }}
            >
              <span style={{ color: "#0000FF" }}>
                Giúp bạn có cái nhìn khách quan trong lựa chọn sản phẩm
              </span>{" "}
              và cung cấp thông tin lựa chọn sản phẩm tốt nhất
            </Typography>
          </Box>

          <Box width={{ xs: "100%", sm: "50%" }}>
            <Typography
              sx={{
                fontSize: { xs: "15px", sm: "18px" },
                color: "#555",
                textAlign: "left",
                paddingBottom: 1,
              }}
            >
              Trở thành người bạn đồng hành trực tuyến đáng tin cậy của bạn, 
              mang đến cho mọi người dùng trải nghiệm được cá nhân hóa để 
              dễ dàng tương tác và tìm kiếm sản phẩm linh hoạt
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box width="100%" sx={{ marginTop: "20px" }}>
        <img
          src="https://cdn.tgdd.vn/Files/2023/05/10/1529381/1-120523-163427-800-resize.jpg"
          alt="Vision Image"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
    </>
  );
};

export default Vision;
