import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/productService';
import { Product } from '../data/products';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import styles from '../components/ProductList/ProductList.module.css';
const ProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const categoryName = location.state?.categoryName || '';
  useEffect(() => {
    const getProducts = async () => {
      try {
        if (categoryId) {
          const data = await fetchProductsByCategory(categoryId);
          setProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [categoryId]);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Danh sách sản phẩm theo {categoryName}
      </Typography>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;