import { useEffect, useState } from "react";
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
import { Product } from "../../../data/products";
import { useAuth } from "../../Auth/AuthContext";
import { addCartItem, getCartId } from "../../../services/cartService";
import useCartStore from "../../../zustand/useCartStore";
interface Props {
  product: Product;
  productId:string;
}

const MainInfo = ({ product,productId}: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [Option, setOption] = useState("DuyBeoU");
  const { user } = useAuth();
  let cartId="";
  useEffect(()=>{
    if(user)
      getCartId(user.id).then((data)=>{
      cartId=data[0];
    })
  })
  const { incrementCartDetail } = useCartStore();

  const add=()=>{
    addCartItem(cartId,productId,quantity);
    incrementCartDetail(1);
  }
  const handleQuantityChange = (change: number) => {
    if (change > 0 && quantity + change > parseInt(product.quantity)) {
      alert("Số lượng sản phẩm còn lại không đủ!!!!");
    } else {
      setQuantity((prev) => Math.max(1, prev + change));
    }
  };

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
            {product.categoryName}
          </Typography>
        </Paper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: "700", fontSize: "40px", mt: 1 }}>
            {product.productName}
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
            <Typography variant="body1" color="textSecondary">
              {product.quantity ? product.quantity +` sản phẩm hiện có` : "Hết hàng"}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1} alignItems="center">
          <Rating
            value={product.rating}
            readOnly
            precision={0.5}
            size="medium"
          />
          <Typography fontWeight="bold" fontSize="18px">
            ({product.rating})
          </Typography>
          <Typography fontWeight="500" fontSize="16px" color="#C45C00">
            Đánh giá
          </Typography>
        </Box>
        <Typography variant="h4" color="textPrimary" fontWeight="600" my={3}>
          {product.unitPrice}{" "}VND
        </Typography>

        {/* Description */}
        <Typography variant="h6" fontWeight="700" mb={1}>
          MÔ TẢ
        </Typography>
        <Typography variant="body1" color="textPrimary" mb={2}>
         {product.description}
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="700" mr={1}>
            Tình trạng:
          </Typography>
          <Typography variant="body1" color="textPrimary">
             {product.status}
               </Typography>
          </Box>
        <Divider sx={{ my: 3 }} />

        <Box display="flex" alignItems="center" gap={2}>
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
          <Box>
            <Typography variant="h6" fontWeight="700">
              SỐ LƯỢNG
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <TextField
                value={quantity}
                size="small"
                sx={{ width: 50, mx: 1 }}
                inputProps={{ style: { textAlign: "center" } }}
                disabled
              />
              <Button
                variant="outlined"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} mt={3}>
          <Button
          onClick={add}
            variant="outlined"
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              flex: 1,
              borderColor: "#4CAF50",
              color: "#4CAF50",
              "&:hover": {
                backgroundColor: "#E8F5E9",
                borderColor: "#388E3C",
                color: "#388E3C",
              },
            }}
          >
            THÊM VÀO GIỎ HÀNG
          </Button>

          <Button
            variant="contained"
            sx={{
              fontSize: "17px",
              fontWeight: "700",
              flex: 1,
              bgcolor: "#4CAF50",
              color: "#FFFFFF",
              "&:hover": {
                bgcolor: "#388E3C",
              },
            }}
          >
            LIÊN HỆ NGƯỜI BÁN
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default MainInfo;