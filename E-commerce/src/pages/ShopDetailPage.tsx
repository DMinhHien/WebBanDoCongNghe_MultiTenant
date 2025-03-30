import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShopDetails  } from '../services/shopService'; 
import { Shop } from '../data/shop';
import { fetchProductsByShopId } from '../services/productService';
import { Product } from '../data/products';
import { Typography, Container, CircularProgress, Box, Divider, createTheme, ThemeProvider } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from '../components/ProductList/ProductList.module.css';
import MainShop from "../components/ShopDetail/MainShop/MainShop"

const DividerSection = () => (
  <Divider
    sx={{ width: "90%", margin: "0 auto", borderBottomWidth: 2, marginY: 6 }}
  />
);
const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
});

const ShopDetailPage: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [shopDetails, setShopDetails] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShopDetails = async () => {
      try {
        const shopData = await fetchShopDetails(shopId!);
        const productData = await fetchProductsByShopId(shopId!);
        
        setShopDetails(shopData);
        setProducts(productData);
      } catch (error) {
        console.error("Không tải được dữ liệu chi tiết shop:", error);
      } finally {
        setLoading(false);
      }
    };

    loadShopDetails();
  }, [shopId]);

  if (loading) {
    return <CircularProgress />;
  }
  const filteredProducts = products.filter((product) => Number(product.quantity) > 0);
  return (
    <Container>
      {shopDetails && 
      <ThemeProvider theme={theme}>
      <Box px={3} pt={5} justifyContent="center" alignItems="center">
        <MainShop shop={shopDetails}/>
        <DividerSection/>
      </Box>
      </ThemeProvider>
      }

      <Typography variant="h5" sx={{ marginTop: 4 }}>
        Danh sách sản phẩm của cửa hàng {shopDetails?.name}
      </Typography>
      {filteredProducts.length > 0 ? (
         <div className={styles.productList}>
         {filteredProducts.map((product) => (
           <ProductCard key={product.id} product={product} />
         ))}
       </div>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Không có sản phẩm nào.
        </Typography>
      )}
    </Container>
  );
};

export default ShopDetailPage;