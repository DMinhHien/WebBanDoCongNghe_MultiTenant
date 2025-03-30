// import { Product } from '../../data/productdetail';
import { useNavigate } from 'react-router-dom';
import { OrderUser } from '../../data/order';

export interface Product {
    id: string;
    productName: string;
}
export interface OrderDetail {
    id: string;
    idReceipt : string;
    product : Product;
    quantity : number;
}
export interface Order {
  id: string;
  userId: string;
  total: number;
  datetime: Date;
}

interface OrderListProps {
  orders: OrderUser[];
}


export default function OrderList({orders}:OrderListProps) {
    const navigate = useNavigate();

    const handleViewDetail = (orderId: string) => {
        navigate(`/chitiet/${orderId}`);
    };

    const handleDeleteOrder = (orderId: string) => {
      const confirmed = window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?");
      if (confirmed) {
        // Perform the delete operation here (e.g., call an API to delete the order)
        console.log(`Order with ID ${orderId} deleted`);
        // Optionally, remove the order from the displayed list
      }
    };
    return (
    <div className="overflow-x-auto w-[75vw]">
      <h2 className="text-xl font-bold mb-2 ">Danh sách Đơn hàng</h2>
      <table className="min-w-full border-gray-300 bg-white ">
        <thead>
          <tr style={{backgroundColor:"#FBFAF1"}} className="text-left ">
            <th className="border border-gray-300 py-2 px-4 border-b">Mã đơn hàng</th>
            <th className="border border-gray-300 py-2 px-4 border-b">Shop</th>
            <th className="border border-gray-300 py-2 px-4 border-b">Tổng tiền</th>
            <th className="border border-gray-300 py-2 px-2 border-b">Ngày tạo</th>
            <th className="border border-gray-300 py-2 px-2 border-b">Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 py-2 px-4 border-b">{order.id}</td>
              <td className="border border-gray-300 py-2 px-4 border-b">{order.shopName}</td>
              <td className="border border-gray-300 py-2 px-4 border-b">{order.totalAmount?.toLocaleString('vi-VN')} VND</td>
              <td className="border border-gray-300 py-2 px-4 border-b"> {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
                <td className="border border-gray-300 py-2 px-4 border-b">
                <div className="flex space-x-2">
                                <button
                                     onClick={() => handleViewDetail(order.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                                >
                                    Xem chi tiết
                                </button>
                      
                                </div>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
