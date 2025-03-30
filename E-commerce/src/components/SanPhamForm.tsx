import React, { useState,useEffect } from 'react';
import { storage } from '../FireBaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getListCategories } from '../services/categoryService';
import { Product } from '../data/productdetail';

export const uploadToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images2/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
export interface Category{
  id: string;
  name: string;
}



export default function SanPhamForm({ onProductChange }: { onProductChange: (data: any) => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productData, setProductData] = useState<Product>({
    id: '',
    productName: '',
    image: '',
    unitPrice: 0,
    quantity: 0,
    description: '',
    categoryId: '',
    status: '',
    idShop:''
  });

  // Gửi dữ liệu lên component cha mỗi khi `productData` thay đổi
  useEffect(() => {
    onProductChange(productData);
  }, [productData, onProductChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(()=>{
    getListCategories().then((data)=>{
      setCategories(data);
    })
  },[])

  const [tinhtrangs, setTinhtrangs] = useState([
    "mới (100%)", "đã sử dụng (99%)", "đã sử dụng (90%)", "đã sử dụng(80%)"
  ]);

  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await uploadToFirebase(file);
      setProductData((prev) => ({ ...prev, image: url })); // Cập nhật URL ảnh vào productData
    }
  };
  return (
    <form className="space-y-4 w-full md:w-1/2 max-w-lg border border-gray-300 p-4 md:p-8 rounded-lg shadow-md bg-white bg-opacity-40">
      <div className="mb-4">
        <label className="block mb-2 text-gray-800 font-medium">Ảnh minh họa</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label className="block mb-2 text-gray-800 font-medium">Tên sản phẩm</label>
        <input 
        type="text"
        name='productName'
        value={productData.productName}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700" />
      </div>
      <div>
        <label className="block mb-2 text-gray-800 font-medium">Đơn giá</label>
        <input 
        type="number" 
        name='unitPrice'
        value={productData.unitPrice}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700" />
      </div>
      <div>
        <label className="block mb-2 text-gray-800 font-medium">Phân loại</label>
        <select
        name='categoryName'
        value={productData.categoryId}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700">
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-800 font-medium">Tình trạng</label>
        <select 
        name='status'
        value={productData.status}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700">
          {tinhtrangs.map((tinhtrang, index) => (
            <option key={index} value={tinhtrang}>{tinhtrang}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-2 text-gray-800 font-medium">Số lượng</label>
        <input 
        type="number"
        name='quantity'
        value={productData.quantity}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700" />
      </div>
      <div>
        <label className="block mb-2 text-gray-800 font-medium">Mô tả</label>
        <textarea
          name='description'
          value={productData.description}
          onChange={handleChange}
          className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700 h-24 resize-none"
          rows={4}
        ></textarea>
      </div>
    </form>
  );
}
