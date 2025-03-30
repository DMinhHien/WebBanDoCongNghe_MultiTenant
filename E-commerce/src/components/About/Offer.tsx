
import { Box, Typography, Grid } from "@mui/material";
import { ShoppingCart, Info, CheckCircle,  } from "@mui/icons-material"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Offer = () => {
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
              About us
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
                  Trịnh Xuân Dương
                </Typography>
                <Typography sx={{ color: "#555", marginBottom: "10px" }}>
                Thành viên
                </Typography>
                <AccountCircleIcon sx={{ fontSize: "3rem", color: "#0000FF" }} />{" "}
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
                  Dương Minh Hiển
                </Typography>
                <Typography sx={{ color: "#555", marginBottom: "10px" }}>
                Thành viên
                </Typography>
                <AccountCircleIcon sx={{ fontSize: "3rem", color: "#0000FF" }} />{" "}
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
                  Lưu Nguyễn Thế Vinh
                </Typography>
                <Typography sx={{ color: "#555", marginBottom: "10px" }}>
                Thành viên
                </Typography>
                <AccountCircleIcon sx={{ fontSize: "3rem", color: "#0000FF" }} />{" "}
                {/* Checkout icon */}
              </Grid>
            </Grid>
          </Box>
        </Box>
      );
};

export default Offer;
