import React from 'react';
import { Shop } from '../../data/shop'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
    const navigate = useNavigate();
    const handleViewDetails = () => {
        navigate(`/shop/${shop.id}`); // Điều hướng đến trang chi tiết cửa hàng
      };
    return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {shop.name}
        </Typography>
        <Button variant="outlined" onClick={handleViewDetails} sx={{ mt: 2 }}>
          Xem chi tiết
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShopCard;