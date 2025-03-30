import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { Product } from "../data/productdetail";
import { getListCategories } from "../services/categoryService";
import {
    deleteProduct,
    getListProduct,
} from "../services/productDetailService";
import { Category, getCategoryNamebyId } from "./ChinhSuaSanPham";

export default function AdminQuanLySP() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCheckboxChange = (id: string) => {
    if (!id) return; // Nếu không có id, bỏ qua

    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      const newSelected = isSelected
        ? prevSelected.filter((productId) => productId !== id) // Bỏ chọn
        : [...prevSelected, id]; // Thêm vào danh sách
      return newSelected;
    });
  };

  // Hàm xử lý khi chọn tất cả hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    const newSelected =
      selectedProducts.length === products.length
        ? [] // Nếu đã chọn hết -> bỏ chọn tất cả
        : products.map((product) => product.id); // Nếu chưa chọn hết -> chọn tất cả

    setSelectedProducts(newSelected);
  };

  //call api getListProduct và getListCategories
  const { id: shopId } = useParams();
  useEffect(() => {
    getListProduct(shopId as string).then((data) => {
      setProducts(data);
    });
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const navigation = useNavigate();
  const back = () => {
    navigation("/admin/QuanLyShop");
  };

  const handleDelete = (selectedProducts: string[]) => () => {
    selectedProducts.forEach((selectedProduct) => {
      deleteProduct(selectedProduct).then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== selectedProduct)
        );
        setSelectedProducts((prevSelected) =>
          prevSelected.filter((id) => id !== selectedProduct)
        );
      });
    });
  };

  return (
    <div className="flex w-screen space-x-6">
      <AdminNav />
      <div className="w-[75vw] px-6">
        <div className="flex items-center justify-between mt-5 mb-7 w-[75vw] ">
          <button
            style={{ backgroundColor: "#FBFAF1" }}
            onClick={back}
            className="border  p-4 rounded-md"
          >
            {"< Quay lại"}
          </button>
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
          <div className="space-x-4 mt-2">
            <button
              style={{ backgroundColor: "#FBFAF1" }}
              onClick={handleDelete(selectedProducts)}
              className="border  p-4 rounded-md"
            >
              Xóa sản phẩm
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 ">Danh sách sản phẩm</h2>
          <div className="overflow-x-auto w-[75vw]">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr style={{ backgroundColor: "#FBFAF1" }}>
                  <th className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === products.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tên sản phẩm
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Đơn giá
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    phân loại
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Số lượng
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Hình ảnh
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Mô tả
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleCheckboxChange(product.id)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.productName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.unitPrice} VNĐ
                    </td>
                    <td className="border border-gray-300 p-2">
                      {getCategoryNamebyId(product.categoryId, categories)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.quantity}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-20 h-20 object-contain"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.description}
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
