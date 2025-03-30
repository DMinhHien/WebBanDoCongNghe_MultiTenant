import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { ShopDetails } from "../data/shopdetail";
import { deleteshop, fetchShops } from "../services/shopService";

export default function QuanLyShop() {
  const [shops, setshops] = useState<ShopDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //call api getListShop
  useEffect(() => {
    fetchShops().then((data) => {
      setshops(data);
    });
  }, []);
  const [selectedshops, setSelectedshops] = useState<string[]>([]);
  // Hàm xử lý khi thay đổi checkbox của một sản phẩm
  const handleCheckboxChange = (id: string) => {
    if (!id) return; // Nếu không có id, bỏ qua

    setSelectedshops((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      const newSelected = isSelected
        ? prevSelected.filter((userId) => userId !== id) // Bỏ chọn
        : [...prevSelected, id]; // Thêm vào danh sách
      return newSelected;
    });
  };

  // Hàm xử lý khi chọn tất cả hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    const newSelected =
      selectedshops.length === shops.length
        ? [] // Nếu đã chọn hết -> bỏ chọn tất cả
        : shops.map((shop) => shop.id); // Nếu chưa chọn hết -> chọn tất cả

    setSelectedshops(newSelected);
  };

  const create = () => {
    nav("/admin/QuanLyShop/new");
  };

  const edit = (id: string) => () => {
    nav(`/admin/QuanLyShop/edit/${id}`);
  };

  const xemSP = (id: string) => () => {
    nav(`/admin/QuanLyShop/xemSP/${id}`);
  };
  //call api deleteShop
  const deleteShops = () => {
    selectedshops.forEach((selectedShop) => {
      deleteshop(selectedShop).then(() => {
        setshops((prevShops) =>
          prevShops.filter((shop) => shop.id !== selectedShop)
        );
        setSelectedshops((prevSelected) =>
          prevSelected.filter((id) => id !== selectedShop)
        );
      });
    });
  };

  return (
    <div className="flex w-screen space-x-6">
      <AdminNav />
      <div className="w-[75vw] px-6">
        <div className="flex items-center justify-between mt-5 mb-7 w-[75vw] ">
          <div className="flex items-center space-x-3 w-3/4">
            <InputBase
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <div className="space-x-4 mt-2">
            <button
              style={{ backgroundColor: "#FBFAF1" }}
              className="border  p-4 rounded-md"
              onClick={create}
            >
              Thêm Shop
            </button>
            <button
              style={{ backgroundColor: "#FBFAF1" }}
              className="border  p-4 rounded-md"
              onClick={deleteShops}
            >
              Xóa Shop
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 ">Danh sách Shop</h2>
          <div className="overflow-x-auto w-[75vw]">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr style={{ backgroundColor: "#FBFAF1" }}>
                  <th className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={selectedshops.length === shops.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tên Shop
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Hình đại diện
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tên người dùng
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Điểm đánh giá
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Địa chỉ
                  </th>
                  <th className="border w-60 border-gray-300 p-2 text-left">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredShops.map((shop) => (
                  <tr key={shop.id}>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedshops.includes(shop.id)}
                        onChange={() => handleCheckboxChange(shop.id)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{shop.name}</td>
                    <td className="border border-gray-300 p-2">
                  <img src={shop.image} alt={shop.name} className="w-20 h-20 object-contain" />
                </td>
                    <td className="border border-gray-300 p-2">
                      {shop.userName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {shop.rating}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {shop.address}
                    </td>
                    <td className="border border-gray-300 p-2 space-x-5">
                      <button
                        className="bg-black text-white px-2 py-1 rounded"
                        onClick={edit(shop.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-black text-white px-2 py-1 rounded"
                        onClick={xemSP(shop.id)}
                      >
                        Danh sách SP
                      </button>
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
