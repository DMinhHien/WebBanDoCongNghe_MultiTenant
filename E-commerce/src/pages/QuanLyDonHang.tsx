import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { getListOrder } from "../services/OrderService";
import { useAuth } from "../components/Auth/AuthContext";
import { getShopId } from "../services/shopService";
import { RawOrderItem, Order } from "../data/order";

export default function QuanLyDonHang() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rawOrders, setRawOrders] = useState<RawOrderItem[]>([]);
  const { user } = useAuth();

  // Call API
  useEffect(() => {
    const shopIdPromise = user?.id ? getShopId(user.id) : null;
    shopIdPromise?.then((shopId: string) => {
      getListOrder(shopId).then((data) => {
        setRawOrders(data);
      });
    });
  }, []);

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0"); // Ngày (dd)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng (mm)
    const year = String(date.getFullYear()) // Năm (yy)
    return `${day}/${month}/${year}`;
  }
  // Chuyển đổi dữ liệu
  const transformedOrders: Order[] = Object.values(
    rawOrders.reduce((acc, item) => {
      const { idReceipt, receipt, idProduct, quantity, product } = item;

      if (!acc[idReceipt]) {
        acc[idReceipt] = {
          idReceipt,
          accountName: receipt.accountName || "Khách hàng không xác định",
          total: 0,
          date: formatDate(receipt.date),
          ListSP: [],
        };
      }

      acc[idReceipt].total += product.totalPrice;

      acc[idReceipt].ListSP.push({
        idProduct,
        productName: product.productName,
        unitPrice: product.unitPrice,
        totalPrice: product.totalPrice,
        quantity,
      });

      return acc;
    }, {} as Record<string, Order>)
  );

  // Lọc đơn hàng
  const filteredOrders = transformedOrders.filter((order) =>
    order.idReceipt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-screen">
      <DashboardNav />
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
          <div className="overflow-x-auto w-[75vw]">
            <h2 className="text-xl font-bold mb-2">Danh sách Đơn hàng</h2>
            <table className="min-w-full border-gray-300 bg-white">
              <thead>
                <tr
                  style={{ backgroundColor: "#FBFAF1" }}
                  className="text-left"
                >
                  <th className="border border-gray-300 py-2 px-4 border-b">
                    Mã đơn hàng
                  </th>
                  <th className="border border-gray-300 py-2 px-4 border-b">
                    Ngày tạo
                  </th>
                  <th className="border border-gray-300 py-2 px-4 border-b">
                    Tên người mua
                  </th>
                  <th className="border border-gray-300 py-2 px-4 border-b">
                    Tổng tiền
                  </th>
                  <th className="border border-gray-300 py-2 px-2 border-b">
                    Danh sách sản phẩm
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.idReceipt}>
                    <td className="border border-gray-300 py-2 px-4 border-b">
                      {order.idReceipt}
                    </td>
                    <td className="border border-gray-300 py-2 px-4 border-b">
                      {order.date}
                    </td>
                    <td className="border border-gray-300 py-2 px-4 border-b">
                      {order.accountName}
                    </td>
                    <td className="border border-gray-300 py-2 px-4 border-b">
                      {order.total.toLocaleString("vi-VN")} VND
                    </td>
                    <td className="border border-gray-300 py-2 px-2 border-b">
                      <ul className="list-disc pl-5">
                        {order.ListSP.map((product) => (
                          <li key={product.idProduct}>
                            {product.productName} - x{product.quantity} 
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
