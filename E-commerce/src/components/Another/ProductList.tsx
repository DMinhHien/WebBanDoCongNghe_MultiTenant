import{ useEffect, useState } from 'react';
import { Category, getCategoryNamebyId } from '../../pages/ChinhSuaSanPham';
import { Product } from '../../data/productdetail';

// Định nghĩa props cho ProductList
interface ProductListProps {
  products: Product[];
  editProduct: (productId: string) => void;
  onSelectedProductsChange: (selected: string[]) => void;
  categories: Category[];
}

export default function ProductList({ products, editProduct,onSelectedProductsChange,categories }: ProductListProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  useEffect(() => {
    onSelectedProductsChange(selectedProducts);
  }, [selectedProducts, onSelectedProductsChange]);
  // Hàm xử lý khi thay đổi checkbox của một sản phẩm
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
    const newSelected = selectedProducts.length === products.length
      ? [] // Nếu đã chọn hết -> bỏ chọn tất cả
      : products.map((product) => product.id); // Nếu chưa chọn hết -> chọn tất cả
  
    setSelectedProducts(newSelected);
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-2 ">Danh sách sản phẩm</h2>
      <div className="overflow-x-auto w-[75vw]">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr style={{backgroundColor:"#FBFAF1"}}>
              <th className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="border border-gray-300 p-2 text-left">Tên sản phẩm</th>
              <th className="border border-gray-300 p-2 text-left">Đơn giá</th>
              <th className="border border-gray-300 p-2 text-left">phân loại</th>
              <th className="border border-gray-300 p-2 text-left">Số lượng</th>
              <th className="border border-gray-300 p-2 text-left">Hình ảnh</th>
              <th className="border border-gray-300 p-2 text-left">Mô tả</th>
              <th className="border border-gray-300 p-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                <td className="border border-gray-300 p-2">{product.productName}</td>
                <td className="border border-gray-300 p-2">{product.unitPrice} VNĐ</td>
                <td className="border border-gray-300 p-2">{getCategoryNamebyId(product.categoryId,categories)}</td>
                <td className="border border-gray-300 p-2">{product.quantity}</td>
                <td className="border border-gray-300 p-2">
                  <img src={product.image} alt={product.productName} className="w-20 h-20 object-contain" />
                </td>
                <td className="border border-gray-300 p-2">{product.description}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={()=>editProduct(product.id)}
                    className="bg-black text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
