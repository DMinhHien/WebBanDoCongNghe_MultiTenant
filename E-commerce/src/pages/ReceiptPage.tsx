import { useEffect, useState } from "react";
import logo from "../../public/check (1).png";
import { OrderDetail } from "../data/order";
import { useLocation, useNavigate } from "react-router-dom";
import { getReceiptDetail } from "../services/OrderService";
import { getUser } from "../services/UserService";
import { User } from "../data/User";

export default function ReceiptPage() {
    const [OrderDetails,setOrderDetails]=useState<OrderDetail[]>([]);
    const[user,setUser]=useState<User>()
    const location = useLocation();
    const nav=useNavigate()
    const { receiptData } = location.state || {};
    useEffect(()=>{
        if(receiptData.id)
            getReceiptDetail(receiptData.id).then((data)=>{
                setOrderDetails(data)
        })
        getUser(receiptData.userId).then((data)=>{
          setUser(data[0])
        })
    },[])
    const total=()=>{
      let tmp=0
      OrderDetails.map((OrderDetail)=>{
        tmp=tmp+(OrderDetail.unitPrice*OrderDetail.quantity)
      })
      return tmp
    }
    const home=()=>{
      nav("/")
    }
  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto py-0 md:py-16">
        <article className="shadow-none md:shadow-2xl md:rounded-md overflow-hidden">
          <div className="md:rounded-b-md  bg-white">
            <div className="p-9 border-b border-gray-200">
              <div className="space-y-6 w-full flex flex-col items-center justify-center">
                <h2 className="text-green-500 text-2xl font-extrabold text-center">
                  Đặt hàng thành công
                </h2>
                <img src={logo} alt="check" />
              </div>
            </div>
            <div className="p-9 space-y-2 border-b border-gray-200">
              <p className="font-medium text-sm text-gray-400">
                Tên khách hàng
              </p>
              <p className=" text-sm">{user?.accountName}</p>
              <p className="font-medium text-sm text-gray-400">
                Ngày tạo đơn hàng
              </p>
              <p className=" text-sm"> {receiptData.date} </p>
            </div>
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr style={{ backgroundColor: "#FBFAF1" }} >
                  <th
                    scope="col"
                    className="w-3/5 px-9 py-4 text-left font-semibold text-gray-900"
                  >
                    Sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="text-left font-semibold text-gray-900"
                  >
                    Số lượng
                  </th>
                  <th
                    scope="col"
                    className="py-3 text-left font-semibold text-gray-900"
                  >
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {OrderDetails.map((OrderDetail)=>(
                  <tr>
                  <td className="px-9 py-5 whitespace-nowrap space-x-1 flex items-center">
                    <div>
                      <p>{OrderDetail.productName}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-gray-600 truncate">
                    {OrderDetail.quantity}
                  </td>
                  <td className="whitespace-nowrap text-gray-600 truncate">
                    {OrderDetail.unitPrice*OrderDetail.quantity}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            <div className="p-9 border-b border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm"> Subtotal </p>
                  </div>
                  <p className="text-gray-500 text-sm">{total()} VNĐ  </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500 text-sm"> Phí vận chuyển </p>
                  </div>
                  <p className="text-gray-500 text-sm"> 30000 VNĐ </p>
                </div>
              </div>
            </div>
            <div className="p-9 border-b border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold text-black text-lg"> Tổng Cộng </p>
                  </div>
                  <p className="font-bold text-black text-lg">  {total()+30000} VNĐ </p>
                </div>
              </div>
              <button onClick={home} style={{ backgroundColor: "#FBFAF1" }} className="shadow-md rounded-lg border p-3 mt-8 w-full">Tiếp tục mua hàng</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
