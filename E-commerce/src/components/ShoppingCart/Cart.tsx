import React, {  useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useAuth } from '../Auth/AuthContext';
import { CartDetail } from '../../data/cartdetail';
import { Product } from '../../data/productdetail';
import iphone from '../../assets/iphone.jpeg'
const Cart: React.FC = () => {
    //Mock Data For Testing
    const mockCartDetails: CartDetail[] = [
        {id: 'CD01', cartId:'C01', productId:'P01', quantity: 2},
        {id: 'CD02', cartId:'C01', productId:'P02', quantity: 1},
    ];
    const mockProducts: { [key: string]: Product } = {
        P01: {
            id: 'P01',
            productName: 'Điện thoại ABC',
            unitPrice: 5000000,
            description: 'Chi tiết sản phẩm điện thoại ABC',
            image: iphone,
            quantity: 0,
            categoryId: '',
            status: '',
            idShop: ''
        },
        P02: {
            id: 'P02',
            productName: 'Laptop XYZ',
            unitPrice: 15000000,
            description: 'Chi tiết sản phẩm laptop XYZ',
            image: iphone,
            quantity: 0,
            categoryId: '',
            status: '',
            idShop: ''
        },
      };
    const {user} = useAuth();
    const [cartDetails, setCartDetails] = useState<CartDetail[]>(mockCartDetails);
    // const [products, setProducts] = useState<{ [key: string]: Product }>({});
    // const [loading, setLoading] = useState(true);
    
    const handleDelete = (id:string) => {
        const updatedDetails = cartDetails.filter((detail) => detail.id !== id);
        setCartDetails(updatedDetails);
    }

    // useEffect(() => {
    //     if (user) {
    //         const fetchCart = async () => {
    //             try{
    //                 setLoading(true);
                    
    //             }
    //             catch (error)
    //             {

    //             }
    //             finally
    //             {

    //             }
                
    //         };
    //         fetchCart();
    //     }
    // }, [user]);

    if (!user)
    {
        return <Typography variant="h6">Vui lòng đăng nhập để xem giỏ hàng.</Typography>
    }
    // if (loading)
    // {
    //     return <Typography variant="h6">Đang tải giỏ hàng...</Typography>;
    // }
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Giỏ hàng của {user.userName}
            </Typography>
            {cartDetails.length === 0?
            (
                <Typography>Giỏ hàng đang trống.</Typography>
            ):
            (
                <List>
                    {cartDetails.map((detail) => {
                       const product = mockProducts[detail.productId];
                        return (
                            <React.Fragment key={detail.id}>
                                 <ListItem>
                                    <img
                                        src={product?.image || iphone}
                                        alt={product?.productName || 'Sản phẩm'}
                                        style={{ width: 100, height: 100, marginRight: 16 }}
                                    />
                                        <ListItemText
                                            primary={product?.productName || 'Sản phẩm không tồn tại'}
                                            secondary={
                                            <>
                                                Số lượng: {detail.quantity}
                                                <br />
                                                Giá: {product ? `${product.unitPrice} VND` : 'Không xác định'}
                                            </>
                                            }
                                        />
                                        <Button variant="contained" color="error" onClick={() => handleDelete(detail.id)}>
                                            Xóa
                                        </Button>
                                        </ListItem>
                                        <Divider />
                            </React.Fragment>
                        );
                    })}
                </List>
            )
            }
        </Box>
    );
};

export default Cart;