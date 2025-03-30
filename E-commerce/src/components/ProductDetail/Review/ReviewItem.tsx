import { useState } from "react";
import { Box, Button, Typography, Rating, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../../Auth/AuthContext"; // Import AuthContext từ vị trí của bạn
import {editComment,deleteComment} from "../../../services/reviewService"
import { CommentDTO } from "../../../data/comment";
interface Props {
  id: string;
  content: string;
  username: string;
  productId: string;
  rating: number;
  date: Date | string; // Allowing both Date and string types
}

const ReviewItem = ({ id, username,productId, rating, date, content }: Props) => {
  const { user } = useAuth();
  // Ensure date is a valid Date object
  
  const validDate = date instanceof Date ? date : new Date(date);
  // State for menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [comment, setComment]=useState<CommentDTO>({
    id: "",
    content: "",
    userId:"",
    productId: "",
    rating: 0,
    date: new Date
  })
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedRating, setEditedRating] = useState(rating);
  const handleSave = () => {
    const updatedComment: CommentDTO = {
      id, // Sử dụng id từ props
      content: editedContent,
      userId: user?.id || "", // Lấy từ AuthContext hoặc props
      productId, // Sử dụng productId từ props
      rating: editedRating,
      date: new Date(), // Lấy ngày hiện tại hoặc từ input nếu có
    };
    setComment(updatedComment); // Cập nhật state (nếu cần)
    editComment(updatedComment).then(() => {
      window.location.reload(); // Tải lại toàn bộ trang
    });; // Gọi hàm service để lưu thay đổi
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setEditedRating(rating);
    setIsEditing(false);
  };
  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between">
      <Typography
          fontWeight="bold"
          sx={{
            color: user?.accountName === username ? "primary.main" : "inherit",
          }}
        >
          {username}
        </Typography>
        <Typography color="textSecondary">
          {isNaN(validDate.getTime()) ? "No date available" : validDate.toLocaleDateString()}
        </Typography>
        {user?.accountName === username && (
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          )}
      </Box>
      {isEditing ? (
        <Box mt={2}>
          <TextField
            fullWidth
            variant="outlined"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="Edit your review"
            multiline
            rows={3}
          />
          <Rating
            value={editedRating}
            onChange={(_, newValue) => setEditedRating(newValue || 0)}
            size="medium"
            sx={{
              mt: 2,
              "& .MuiRating-iconFilled": {
                color: "black",
              },
              "& .MuiRating-iconEmpty": {
                color: "black",
              },
            }}
          />
          <Box mt={2} display="flex" gap={1}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "black",
              },
              "& .MuiRating-iconEmpty": {
                color: "black",
              },
            }}
          />
          <Typography sx={{ mt: 1 }}>{content}</Typography>
        </>
      )}
    
    {/* Menu for Edit/Delete */}
    <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            minWidth: "120px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            setIsEditing(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            deleteComment(id).then(() => {
              window.location.reload(); // Tải lại toàn bộ trang
            });;
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ReviewItem;
