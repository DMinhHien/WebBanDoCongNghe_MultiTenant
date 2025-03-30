import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNav";
import { ShopDetails } from "../data/shopdetail";
import { editShop, fetchShopDetails } from "../services/shopService";
import { uploadToFirebase } from "./ChinhSuaSanPham";
import { useNavigate } from "react-router-dom";
import {getShopId} from "../services/shopService"
import { useAuth } from '../components/Auth/AuthContext';
export default function ChinhSuaShop() {
  const { user } = useAuth();
  const [shopDetail, setShopDetail] = useState<ShopDetails>({
    id: "",
    userId: "",
    userName: "",
    name: "",
    address: "",
    image: "",
    rating: 0,
  });
  const shopIdPromise = user?.id ? getShopId(user.id) : null; 
  //call api getShop
  useEffect(()=>{
    shopIdPromise?.then((shopId: string) => {
    fetchShopDetails(shopId).then((data)=>{
      setShopDetail(data)
    })
  });
  },[])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShopDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadToFirebase(file);
      setShopDetail((prev) => ({ ...prev, image: url })); // Cập nhật URL ảnh vào productData
    }
  };
  const nav=useNavigate();
  const handle=()=>{
    nav('/quanlyshop/QuanLyThongTin')
  }
  //call api editShop
  const edit = (event: React.FormEvent) => {
    event.preventDefault();
    const isEmptyField = Object.entries(shopDetail).some(([key, value]) => {
      if (key === "rating" || key === "userName") return false;
      return value === "";
    });

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    editShop(shopDetail).then(() => {
      nav('/quanlyshop/QuanLyThongTin');
    });
  };
  return (
    <div className="flex w-screen">
      <DashboardNav />
      <div className="mt-10 ml-10 w-[75vw] flex">
      <div className="flex p-4">
      <div className="w-full max-w-lg">
        
        <form className="space-y-4 w-full p-4 md:p-8 bg-white h-auto border border-gray-300 rounded-lg shadow-md bg-opacity-40">
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-medium">Profile picture</label>
            <input type="file" className="w-full" onChange={handleFileChange}/>
          </div>
          <div>
            <label className="block mb-2 text-gray-800 font-medium">Tên cửa hàng</label>
            <input
              type="text"
              name="name"
              value={shopDetail.name}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-800 font-medium">Địa chỉ cửa hàng</label>
            <input
              type="text"
              value={shopDetail.address}
              name="address"
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <button style={{backgroundColor:"#FBFAF1"}} onClick={(e) => edit(e)} className="border px-6 py-2 rounded-md mt-6 hover:bg-gray-800 transition-colors duration-200 w-full md:w-auto">
              Cập nhật
            </button>
            <button onClick={handle} style={{backgroundColor:"#FBFAF1"}} className=" ml-12 border px-6 py-2 rounded-md mt-6 hover:bg-gray-800 transition-colors duration-200 w-full md:w-auto">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
      </div>
    </div>
  );
}
