import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { ShopDetails } from "../data/shopdetail";
import { useNavigate } from "react-router-dom";
import { deleteshop, fetchShopDetails } from "../services/shopService";
import {getShopId} from "../services/shopService"
import { useAuth } from '../components/Auth/AuthContext';
export default function QuanLyThongTin() {
  const { user: authUser  } = useAuth();
  const [shopDetail, setShopDetail] = useState<ShopDetails>();
  const nav=useNavigate();
  //Call api getShop
  const shopIdPromise = authUser?.id ? getShopId(authUser.id) : null; 
  useEffect(()=>{
    shopIdPromise?.then((shopId: string) => {
    fetchShopDetails(shopId).then((data)=>{
      setShopDetail(data)
    })
  });
  },[])
  const editHandle = () => {
    nav(`/quanlyshop/QuanLyThongTin/edit`);
  };
  //Call api deleteShop
  const DeleteShop=()=>{
    shopIdPromise?.then((shopId: string) => {
    deleteshop(shopId).then(()=>{
      nav("/quanlyshop")
    })
  });
  }
  return (
    <div className="flex w-screen">
      <DashboardNav />
      <div className="mt-10 ml-10 w-[75vw] flex">
        <div className="w-80 h-[65vh] p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Thông tin cửa hàng
          </h1>
          <img
            className="w-full h-40 object-contain  rounded-t-lg"
            alt={shopDetail?.name}
            src={shopDetail?.image}
          />
          <div className="p-4 space-y-3">
            <h2 className="text-xl  font-semibold">Tên cửa hàng:</h2>
            <p className="text-gray-600">{shopDetail?.name}</p>
            <h2 className="text-xl  font-semibold">Địa chỉ:</h2>
            <p className="text-gray-600">{shopDetail?.address}</p>
            <div className="flex justify-between items-center mt-auto">
              <button onClick={editHandle} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                Thay đổi
              </button>
              <button onClick={DeleteShop} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400">
                Xóa cửa hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
