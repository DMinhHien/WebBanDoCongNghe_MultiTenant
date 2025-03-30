import React from 'react';
import { Link } from 'react-router-dom';

import { Shop } from '../../data/shop';
import { createTheme, ThemeProvider, Box, Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
interface ShopCardProps {
    shop: Shop;
}

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
    fontWeightRegular: 800,
  },
});

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => (
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
       key={shop.id}
       to={`/shop/${shop.id}`}
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
              image={shop.image}
              sx={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 3,
              }}
            />
        <CardContent sx={{ px: 0 }}>
        <Typography sx={{ fontSize: 17 }}>
                {shop.name.toUpperCase()}
        </Typography>
        <Box
         display="flex"
         alignItems="center"
         justifyContent="center"
         mt={0.5}
        >
           <Rating
                  value={shop.rating}
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
                {shop.address}
              </Typography>
        </CardContent>
      </Card>
      </Link>
    </Box>
    </ThemeProvider>
  );
  
  export default ShopCard;