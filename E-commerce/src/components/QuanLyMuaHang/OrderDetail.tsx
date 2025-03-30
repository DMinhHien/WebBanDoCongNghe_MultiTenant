import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import Rating from '@mui/material/Rating';
import DashboardNav from '../DashboardNav';
import {CommentDTO} from '../../data/comment'
import {addComment} from'../../services/reviewService'
import {OrderDetail} from '../../data/order'
import { getListOrderDetail } from '../../services/OrderService';
   

export default function ChiTietDonHang() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isDialogOpen, setDialogOpen] = useState(false);
    // Lọc ra chi tiết đơn hàng tương ứng
    const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | null>(null);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState<number | null>(0);
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [Comment, setComment] = useState<CommentDTO>({
        id: "",
        content:"",
        userId:"",
        productId:"",
        rating: 0,
        date: new Date,
      });
    const openDialog = (productId: string, productName: string) => {
        setSelectedProduct({ id: productId, name: productName, });
        setComment(prevComment => ({
            ...prevComment,
            productId: productId, // Cập nhật lại productId khi chọn sản phẩm
        }));
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
        setContent('');
        setRating(0);
    };
    useEffect(() => {
        if (user) {
          setComment((prevComment) => ({
            ...prevComment,
            userId: user.id || "", // Gán id của user vào userId
          }));
        }
      }, [user]);
     useEffect(() => {
        getListOrderDetail(id??"").then((data) => {
              setOrderDetails(data);
            }); // Chuỗi đã được giải quyết
            console.log(orderDetails)
        
        }, []);
    const handleSubmit = () => {
        const isEmptyField = Object.entries(Comment).some(([key, value]) => {
            if (key === "username" || key === "id"|| key==="date") return false;
            return value === "";
          });
      
          if (isEmptyField) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
          }
        addComment(Comment).then(()=>{
            closeDialog();
        })
    };
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(prevComment => ({
            ...prevComment,
            content: e.target.value
        }));
    };
    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        setComment(prevComment => ({
            ...prevComment,
            rating: newValue ?? 0
        }));
    };
    
    return (
        <div className="flex w-screen">
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Chi tiết Đơn hàng: {id}</h2>
            <table className="min-w-full border border-gray-300 bg-white">
                <thead>
                    <tr className="text-left" style={{ backgroundColor: '#FBFAF1' }}>
                        <th className="border border-gray-300 py-2 px-4">Mã sản phẩm</th>
                        <th className="border border-gray-300 py-2 px-4">Tên sản phẩm</th>
                        <th className="border border-gray-300 py-2 px-4">Hình ảnh</th>
                        <th className="border border-gray-300 py-2 px-4">Số lượng</th>
                        <th className="border border-gray-300 py-2 px-4">Tương tác</th>
                    </tr>
                </thead>
                <tbody>
                {orderDetails.map((detail) => (
                        <tr key={detail.id}>
                             <td className="border border-gray-300 py-2 px-4">{detail.idProduct}</td>
                            <td className="border border-gray-300 py-2 px-4">{detail.productName}</td>
                            <td className="border border-gray-300 py-2 px-4">
                                {/* Display product image */}
                                <img 
                                    src={detail.image} // Assuming `productImage` contains the URL of the image
                                    alt={detail.productName} 
                                    className="w-16 h-16 object-cover rounded" 
                                />
                                </td>
                            <td className="border border-gray-300 py-2 px-4">{detail.quantity}</td>
                            <td className="border border-gray-300 py-2 px-4">
                                <button
                                     onClick={() => openDialog(detail.idProduct, detail.productName)}
                                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                                >
                                    Thêm Đánh Giá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {/* Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Thêm Review cho {selectedProduct?.name}</h2>
                        <label className="block mb-2">
                            Nội dung:
                            <textarea
                                value={Comment.content}
                                onChange={handleContentChange}
                                className="w-full border rounded p-2 mt-1"
                                rows={4}
                            ></textarea>
                        </label>
                        <label className="block mb-4">
                            Rating:
                            <div className="mt-1">
                                <Rating
                                    name="simple-controlled"
                                    value={Comment.rating}
                                    onChange={handleRatingChange}
                                />
                            </div>
                        </label>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDialog}
                                className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}