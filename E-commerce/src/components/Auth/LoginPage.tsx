// LoginPage.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleLogin = async() => {
    try{
    // Thêm logic xử lý đăng nhập ở đây
    const response = await fetch('https://localhost:7183/User/Login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
    });

    if (response.ok) {
        const data = await response.json();
        login(data.user, data.token); // Cập nhật trạng thái đăng nhập
        localStorage.setItem("token", data.token); // Lưu token vào localStorage
        if (data.user.role === 'Admin') {
          navigate('/admin'); // Điều hướng đến trang admin
        } else {
          navigate('/'); // Điều hướng về trang người dùng
        }
      } else {
        alert('Đăng nhập không thành công!');
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Đăng Nhập
        </Typography>
        
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Đăng Nhập
          </Button>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Link href="#" underline="none">
              Quên mật khẩu?
            </Link>
            <Link href="/register" underline="none">
              Đăng ký tài khoản mới
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;