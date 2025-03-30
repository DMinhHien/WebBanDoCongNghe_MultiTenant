import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import{addRole}  from "../../services/UserService";
import{createCart}  from "../../services/cartService";
const SignUpPage: React.FC = () => {
    const [accountName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth(); // Để tự động đăng nhập khi đăng ký thành công
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
  
      try {
        // Gửi request đăng ký tới backend
        const response = await fetch('https://localhost:7183/User/Register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, accountName,birthDate,address,phone }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Đăng nhập tự động sau khi đăng ký thành công
          login(data.user, data.token);
          var id=data.user.id
          var role="User"
          addRole(id,role)
          data.user.role=role
          createCart(id)
          // Chuyển hướng về trang chủ
          navigate('/');
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Đăng ký thất bại, hãy chắc chắn điền đầy đủ thông tin cá nhân, gmail đúng định dạng, mật khẩu phải có chữ cái đặc biệt, số, chữ in hoa !');
        }
      } catch (error) {
        setError('Đã xảy ra lỗi khi đăng ký');
      }
    };
  
    return (
      <Box sx={{ padding: 4, maxWidth: 400, margin: '0 auto' }}>
        <Typography variant="h4" mb={2}>Đăng ký</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Tên"
            fullWidth
            value={accountName}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Mật khẩu"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Điện thoại"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          />
          <p>Sinh nhật</p>
          <TextField
            type="date"
            fullWidth
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Địa chỉ"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth color="primary">
            Đăng ký
          </Button>
        </form>
      </Box>
    );
  };
  
  export default SignUpPage;