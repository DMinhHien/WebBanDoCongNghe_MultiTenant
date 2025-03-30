// AddShopForm.tsx
import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useAuth } from '../Auth/AuthContext';
import { uploadImageToFirebase } from '../../uploadImageToFirebase';
import { createShop } from '../../services/shopService';
import { ShopDetails } from '../../data/shopdetail';

interface AddShopFormProps {
  onClose: () => void;
  onShopAdded: (newShop: ShopDetails) => void;
}

const AddShopForm: React.FC<AddShopFormProps> = ({ onClose, onShopAdded }) => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Vui lòng đăng nhập để tạo shop');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to Firebase if there is an image
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile);
      }

      // Prepare shop data without the id
      const newShopData = {
        userId: user.id,
        name,
        address,
        rating,
        image: imageUrl,
      };

      // Call API to create shop
      const newShop = await createShop(newShopData);

      // Notify parent component about new shop
      onShopAdded(newShop);
      alert('Shop đã được tạo thành công!');
      onClose();
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo shop');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <Typography variant="h6">Thêm Shop Mới</Typography>
      <TextField
        label="Tên Shop"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <TextField
        label="Đánh giá"
        type="number"
        value={rating}
        onChange={(e) => setRating(parseFloat(e.target.value))}
        required
      />
      <Button variant="contained" component="label">
        Tải ảnh lên
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
        />
      </Button>
      {imageFile && <Typography>{imageFile.name}</Typography>}
      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Đang xử lý...' : 'Thêm Shop'}
        </Button>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
      </Box>
    </Box>
  );
};

export default AddShopForm;