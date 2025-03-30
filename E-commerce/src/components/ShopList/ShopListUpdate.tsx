import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";

import ShopCard from '../ShopCard/ShopCardUpdate';
import { Shop } from '../../data/shop';
import SearchFilter from '../ShopFilter/SearchFilter';

import useShopStore from '../../zustand/useShopStore';
import ShopGrid from '../ShowShop/ShopGrid';

const ShopList: React.FC = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {shops, filteredShops, setShops, resetFilters, filters} = useShopStore();
    useEffect(() => {
      resetFilters();
      fetchShops();
    }, [resetFilters, setShops]);
     // Hàm fetch data từ API
     const fetchShops = async () => {
      try {
        const response = await axios.get<Shop[]>('https://localhost:7183/Shop/getListUse');
        setShops(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể lấy dữ liệu sản phẩm');
        setLoading(false);
      }
    };
    useEffect(() => {
      setCurrentPage(1);
    },[filteredShops]);
    
    const displayedShops = filteredShops?.length
    ? filteredShops
    : [];

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;
    const totalPages = Math.ceil(displayedShops.length / itemsPerPage);
    const paginatedShops = displayedShops.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
      window.scrollTo(0, 0);
    };

    const categoryTitle =
    filteredShops.length === 0
      ? "SHOPS"
      : "SHOPS";

    return (
      <Box sx={{ width: "80%", margin: "0 auto", padding: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box
           sx={{
             display: "flex",
             flexDirection: "column",
             alignItems: "left",
             justifyContent: "center",
             height: "100%",
            }}>
             <Typography fontWeight={800} variant="h4">
              {categoryTitle}
            </Typography>
            <Typography mt={1} variant="body2" sx={{ color: "#2266AA" }}>
              {displayedShops.length}{" "}
              {displayedShops.length > 1 ? "shops" : "shop"}
            </Typography>

          </Box>
        </Grid>

        {/* {Right} */}
        <Grid item xs={12} md={9}>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <SearchFilter />
            </Grid>
          </Grid>
        </Grid>
         {/* Bottom-right: ProductGrid */}
         <Grid item xs={12} >
          <ShopGrid shops={paginatedShops} />

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 3,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
        </Grid>
      </Box>
      // <div className={styles.productList}>
      //   {products.map((product) => (
      //     <ProductCard key={product.id} product={product} />
      //   ))}
      // </div>
    );

};


export default ShopList;