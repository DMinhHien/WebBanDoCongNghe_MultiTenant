import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './ProductCard.module.css'
import { Product } from '../../data/products';
import { createTheme, ThemeProvider, Box, Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import Iphone from "../../assets/iphone.jpeg"
interface ProductCardProps {
    product: Product;
}

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
    fontWeightRegular: 800,
  },
});

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <ThemeProvider theme ={theme}>
    <Box 
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      <Link
       key={product.id}
       to={`/products/${product.id}`}
       style={{ textDecoration: "none", color: "inherit", display: "block" }}>

      <Card
      sx={{
        width: 250,
        textAlign: "center",
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "none",
      }}
      >
        <CardMedia
              component="img"
              image={product.image}
              sx={{
                width: "100%",
                aspectRatio:1,
                borderRadius: 3,
              }}
            />
        <CardContent sx={{ px: 0 }}>
        <Typography sx={{ fontSize: 17 }}>
                {product.productName.toUpperCase()}
        </Typography>
        <Box
         display="flex"
         alignItems="center"
         justifyContent="center"
         mt={0.5}
        >
           <Rating
                  value={product.rating}
                  readOnly
                  precision={0.5}
                  size="small"
                />

        </Box>
        <Typography
                sx={{
                  color: "#E600A0",
                  fontSize: 20,
                  mt: 0.5,
                }}
              >
                {product.unitPrice} VND
              </Typography>
        </CardContent>
      </Card>
      </Link>
    </Box>
    </ThemeProvider>
  );
  
  export default ProductCard;