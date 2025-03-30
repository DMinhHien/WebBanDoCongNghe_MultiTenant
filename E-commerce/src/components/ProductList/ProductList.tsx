import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
} from "@mui/material";
import styles from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../data/products';
import SearchFilter from '../Filter/SearchFilter';
import FilterProduct from '../Filter/FilterProduct';
// import { sampleProducts } from '../../data/products';
import useProductStore from '../../zustand/useProductStore';
import ProductGrid from '../ShowProduct/ProductGrid';

const ProductList: React.FC = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {products, filteredProducts, setProducts, resetFilters, filters} = useProductStore();
    useEffect(() => {
      resetFilters();
      fetchProducts();
    }, [resetFilters, setProducts]);
     // Hàm fetch data từ API
     const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('https://localhost:7183/Product/getListUse');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Không thể lấy dữ liệu sản phẩm');
        setLoading(false);
      }
    };
    useEffect(() => {
      setCurrentPage(1);
    },[filteredProducts]);
    
    const displayedProducts = filteredProducts?.length
    ? filteredProducts.filter(product => Number(product.quantity) > 0)
    : [];

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;
    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
    const paginatedProducts = displayedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value);
      window.scrollTo(0, 0);
    };

    const categoryTitle =
    filteredProducts.length === 0
      ? "Sản Phẩm"
      : filters.category || "Sản Phẩm";

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
              {displayedProducts.length}{" "}
              {displayedProducts.length > 1 ? "products" : "product"}
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

        {/* {Bottom Left} */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <FilterProduct />
          </Box>
        </Grid>
         {/* Bottom-right: ProductGrid */}
         <Grid item xs={12} md={9}>
          <ProductGrid products={paginatedProducts} />

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


export default ProductList;