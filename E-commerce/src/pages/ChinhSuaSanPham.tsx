import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { Product } from "../data/productdetail";
import { editProduct, getProduct } from "../services/productDetailService";
import { getListCategories } from "../services/categoryService";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../FireBaseConfig";
import {getShopId} from "../services/shopService"
import { useAuth } from '../components/Auth/AuthContext';
export const uploadToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images2/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export interface Category {
  id: string;
  name: string;
}

export const getCategoryNamebyId = (
  id: string,
  categories: Category[]
): string | null => {
  const category = categories.find((cat) => cat.id === id);
  return category ? category.name : null;
};
export default function ChinhSuaSP() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
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
  const navigation = useNavigate();
  //call api getProduct và getListCategories
  useEffect(() => {
    if (id) {
      getProduct(id).then((data) => {
        setProductData(data);
      });
    }
    getListCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const cancelHandle = () => {
    navigation("/quanlyshop");
  };
  //call api editProduct
  var idshop:any
  const updateHandle = async () => {
    if (user?.id) {
      idshop = await getShopId(user.id); // Chờ Promise resolve và gán kết quả
    }
    // Không thay đổi dữ liệu trong form ngay lập tức
    const productWithNumbers = {
      ...productData,
      unitPrice: parseFloat(productData.unitPrice.toString()),
      quantity: parseInt(productData.quantity.toString(), 10),
      id: id as string,
      idShop: idshop,
    };
    const isEmptyField = Object.entries(productWithNumbers).some(
      ([key, value]) => {
        return value === "";
      }
    );

    if (isEmptyField) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    // Thực hiện cập nhật dữ liệu
    await editProduct(productWithNumbers);
    navigation("/quanlyshop");
  };

  const tinhtrangs = [
    "mới (100%)",
    "đã sử dụng (99%)",
    "đã sử dụng (90%)",
    "đã sử dụng(80%)",
  ];

  // Xử lý thay đổi dữ liệu trong form
  const handleChange = async (
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
    await setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(productData);
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
    <div className="flex w-screen">
      <DashboardNav />
      <div className="mt-10 ml-10 w-[75vw]">
        <h1 className="font-bold text-2xl mb-3">Chỉnh sửa sản phẩm</h1>
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

        <div>
          <button
            style={{ backgroundColor: "#1E3A8A" }}
            onClick={updateHandle}
            className="text-white px-6 py-2 rounded-md mt-10"
          >
            Cập nhật
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
