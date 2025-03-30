import React, { useEffect, useState } from 'react';
import {editUser} from '../../services/UserService'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

interface ProfileEditDialogProps {
  open: boolean;
  onClose: () => void;
  userInfo: {
    id:string;
    AccountName: string;
    Password:string,
    Role:string,
    Email: string;
    BirthDate: Date;
    Address: string;
    PhoneNumber: string;
  };
  onSave: (updatedInfo: {
    id:string;
    AccountName: string;
    Password:string,
    Role:string,
    Email: string;
    BirthDate: Date;
    Address: string;
    PhoneNumber: string;
  }) => void;
}
const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({
  open,
  onClose,
  userInfo,
  onSave,
}) => {
  const [formData, setFormData] = useState(userInfo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData,  [name]: name === "BirthDate" ? new Date(value) : value, });
  };
  const handleSave = () => {
    const updatedData = { ...formData }; // Lấy bản cập nhật mới nhất
    editUser(updatedData); 
    onSave(updatedData);
  };
  useEffect(() => {
    setFormData({
      ...userInfo,
      BirthDate: new Date(userInfo.BirthDate), // Ensure it's a Date object
    });
  }, [userInfo]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên"
          fullWidth
          margin="normal"
          name="userName"
          defaultValue={formData.AccountName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.Email}
          onChange={handleInputChange}
        />
        <TextField
          label="Ngày sinh"
          fullWidth
          margin="normal"
          type="date"
          name="birthDate"
          value="2017-05-24"
          onChange={handleInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Địa chỉ"
          fullWidth
          margin="normal"
          name="address"
          value={formData.Address}
          onChange={handleInputChange}
        />
        <TextField
          label="Số điện thoại"
          fullWidth
          margin="normal"
          name="phone"
          value={formData.PhoneNumber}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditDialog;