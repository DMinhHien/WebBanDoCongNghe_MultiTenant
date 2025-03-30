import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { Product } from "../data/productdetail";
import { addProduct } from "../services/productDetailService";
import { uploadToFirebase } from "./ChinhSuaSanPham";
import { getListCategories } from "../services/categoryService";
import {getShopId} from "../services/shopService"
import { useAuth } from '../components/Auth/AuthContext';
export default function ProductCreate() {
  const tinhtrangs = [
    "mới (100%)",
    "đã sử dụng (99%)",
    "đã sử dụng (90%)",
    "đã sử dụng(80%)",
  ];
  const { user } = useAuth();
  const [categories, setCategories] = useState<any[]>([]);
  const [productData, setProductData] = useState<Product>({
    id: "",
    productName: "",
    image: "",
    unitPrice: 0,
    quantity: 0,
    description: "",
    categoryId: "",
    status: "",
    idShop: "",
    categoryName: "",
  });
  //call api getListCategories
  useEffect(() => {
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);
  const navigation = useNavigate();
  const cancelHandle = () => {
    navigation("/quanlyshop");
  };
  //call api createProduct
  var idshop:any
  const addHandle = async () => {
    if (user?.id) {
      idshop = await getShopId(user.id); // Chờ Promise resolve và gán kết quả
    }
    const productWithNumbers = {
      ...productData,
      idShop: idshop,
      unitPrice: parseFloat(productData.unitPrice.toString()),
      quantity: parseInt(productData.quantity.toString(), 10),
    };
    const isEmptyField = Object.entries(productWithNumbers).some(
      ([key, value]) => {
        if (key === "id" || key === "categoryName") return false;
        return value === "";
      }
    );

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    await addProduct(productWithNumbers);
    navigation("/quanlyshop");
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "unitPrice" || name === "quantity") {
      const numericValue = parseFloat(value);
      if (numericValue < 1) {
        alert("Giá trị không được nhỏ hơn 1");
        return;
      }
    }
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi file ảnh
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadToFirebase(file);
      setProductData((prev) => ({ ...prev, image: url })); // Cập nhật URL ảnh vào productData
    }
  };
  return (
    <div className="flex w-full">
      <DashboardNav />
      <div className="mt-10 ml-10 w-[75vw]">
        <h1 className="font-bold text-2xl mb-3">Thêm sản phẩm</h1>
        <form className="space-y-4 w-full md:w-1/2 max-w-lg border border-gray-300 p-4 md:p-8 rounded-lg shadow-md bg-white bg-opacity-40">
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-medium">
              Ảnh minh họa
            </label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-medium">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-medium">
              Đơn giá
            </label>
            <input
              type="number"
              name="unitPrice"
              value={productData.unitPrice}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-medium">
              Phân loại
            </label>
            <select
              name="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <option value="" disabled>
                ---Chọn phân loại---
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-medium">
              Tình trạng
            </label>
            <select
              name="status"
              value={productData.status}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            >
              <option value="" disabled>
                ---Chọn tình trạng---
              </option>
              {tinhtrangs.map((tinhtrang, index) => (
                <option key={index} value={tinhtrang}>
                  {tinhtrang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-medium">
              Số lượng
            </label>
            <input
              type="number"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-800 font-medium">
              Mô tả
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 h-24 resize-none"
              rows={4}
            ></textarea>
          </div>
        </form>
        <div className="w-full">
          <button
            style={{ backgroundColor: "#1E3A8A" }}
            onClick={addHandle}
            className=" text-white px-6 py-2 rounded-md mt-10 ml-8"
          >
            Thêm sản phẩm
          </button>
          <button
            onClick={cancelHandle}
            className="border bg-white text-black px-6 py-2 rounded-md mt-10 ml-12"
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}
