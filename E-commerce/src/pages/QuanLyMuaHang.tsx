import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import OrderList from "../components/QuanLyMuaHang/OrderListbyUser";
import { getListOrderUser } from "../services/OrderService";
import { useAuth } from '../components/Auth/AuthContext';
import { OrderUser } from "../data/order";
export default function QuanLyMuaHang() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
   const [orders, setOrders] = useState<OrderUser[]>([]);
  //call api getListReceipt
//   const orders: Order[] = [
//     { id: '001', userId: 'user1', total: 200000, datetime: new Date() },
//     { id: '002', userId: 'user2', total: 150000, datetime: new Date() },
// ];
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  ); 
   useEffect(() => {
      getListOrderUser(user?.id??"").then((data) => {
          setOrders(data);
        }); // Chuỗi đã được giải quyết
        console.log(orders);
    }, []);
  return (
    <div className="flex w-screen">
      <div className="mt-10 ml-10 w-[75vw]">
        <div className="flex items-center space-x-3 w-3/4">
          <InputBase
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder="Search"
            startAdornment={<Search style={{ color: "#999" }} />}
            style={{
              backgroundColor: "#F0ECE1",
              padding: "5px 10px",
              borderRadius: "20px",
              width: "500px",
            }}
          />
        </div>
        <div className="mt-10">
          <OrderList orders={filteredOrders} />          
        </div>
      </div>
    </div>
  );
}