import React, {useEffect, useState} from 'react';
import { fetchShops } from '../../services/shopService';
import ShopCard from '../ShopCard/ShopCard';
import {Shop} from '../../data/shop'
import {Typography, Container, Box} from '@mui/material';

const ShopList: React.FC = () => {
    const [shops, setShops] = useState<Shop[]>([]);
  
    useEffect(() => {
      const loadShops = async () => {
        const data = await fetchShops();
        setShops(data);
      };
  
      loadShops();
    }, []);
  
    return (
        <div style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Danh sách cửa hàng
        </Typography>
        <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2} // khoảng cách giữa các ShopCard
      >
        {shops.map((shop) => (
          <Box key={shop.id} width={{ xs: '100%', sm: '45%', md: '30%', lg: '22%' }}>
            <ShopCard shop={shop} />
          </Box>
        ))}
      </Box>
      </div>
    );
  };
  
  export default ShopList;