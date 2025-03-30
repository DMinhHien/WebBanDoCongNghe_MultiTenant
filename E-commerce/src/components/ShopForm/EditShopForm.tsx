import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { updateShop } from '../../services/shopService';
import { ShopDetails } from '../../data/shopdetail';

interface EditShopFormProps {
  shop: ShopDetails;
  onSuccess: (updatedShop: ShopDetails) => void;
}

const EditShopForm: React.FC<EditShopFormProps> = ({ shop, onSuccess }) => {
  const [name, setName] = useState(shop.name);
  const [address, setAddress] = useState(shop.address);
  const [rating, setRating] = useState(shop.rating);
  const [image, setImage] = useState(shop.image);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedShop = await updateShop({ ...shop, name, address, rating, image });
    onSuccess(updatedShop);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <TextField label="Tên shop" fullWidth required value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Địa chỉ" fullWidth required value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mb: 2 }} />
      <TextField label="Rating" fullWidth required value={rating} onChange={(e) => setRating(parseInt(e.target.value))} sx={{ mb: 2 }} />
      <TextField
            label="URL ảnh"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 2 }}
            />
      <Button variant="contained" color="primary" type="submit">Lưu Thay Đổi</Button>
    </Box>
  );
};

export default EditShopForm;