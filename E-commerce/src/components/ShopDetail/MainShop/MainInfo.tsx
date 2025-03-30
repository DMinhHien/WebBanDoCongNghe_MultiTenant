import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  Rating,
  createTheme,
  ThemeProvider,
  TextField,
  ButtonGroup,
  Paper,
} from "@mui/material";
import { Shop } from "../../../data/shop";

interface Props {
  shop: Shop;
}

const MainInfo = ({ shop }: Props) => {

  const theme = createTheme({
    typography: {
      fontFamily: "Nunito",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box width="100%">
        {/* Product Details */}
        <Paper sx={{ bgcolor: "#76A188", display: "inline-block" }}>
          <Typography
            p={0.5}
            variant="subtitle1"
            color="white"
            fontWeight={600}
          >
            Shop
          </Typography>
        </Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: "700", fontSize: "40px", mt: 1 }}>
            {shop.name}
          </Typography>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                bgcolor: 5 > 0 ? "#2196F3" : "#D32F2F",
                mr: 1,
              }}
            />
          </Box>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Rating
            value={shop.rating}
            readOnly
            precision={0.5}
            size="medium"
          />
          <Typography fontWeight="bold" fontSize="18px">
            ({shop.rating})
          </Typography>
          <Typography fontWeight="500" fontSize="16px" color="#C45C00">
            Đánh giá
          </Typography>
        </Box>
        <Typography variant="h4" color="textPrimary" fontWeight="600" my={3}>
          Địa chỉ: {shop.address}{" "}
        </Typography>

        {/* Description */}
        {/* <Typography variant="h6" fontWeight="700" mb={1}>
          DESCRIPTION
        </Typography>
        <Typography variant="body1" color="textPrimary" mb={2}>
         Shop được sỡ hữu bởi {shop.userName}
        </Typography> */}

        <Divider sx={{ my: 3 }} />

       
          {/* Option Section */}
          {/* <Box>
            <Typography variant="h6" fontWeight="700">
              OPTION
            </Typography>
            <ButtonGroup variant="outlined" sx={{ mt: 1 }}>
              <Button
                variant={Option === "With Pump" ? "contained" : "outlined"}
                onClick={() => setOption("With Pump")}
              >
                With Pump
              </Button>
              <Button
                variant={Option === "No Pump" ? "contained" : "outlined"}
                onClick={() => setOption("No Pump")}
              >
                No Pump
              </Button>
            </ButtonGroup>
          </Box> */}

          {/* Quantity Section */}
         
          </Box>
        

        {/* Action Buttons */}
       
      
    </ThemeProvider>
  );
};

export default MainInfo;