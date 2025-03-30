import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/Another/ProductList";
import DashboardNav from "../components/DashboardNav";
import { Product } from "../data/productdetail";
import {
  deleteProduct,
  getListProduct,
} from "../services/productDetailService";
import { Category } from "./ChinhSuaSanPham";
import { getListCategories } from "../services/categoryService";
import {getShopId} from "../services/shopService"
import { useAuth } from '../components/Auth/AuthContext';
export default function QuanLySP() {
   const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const handleSelectedProductsChange = (selected: string[]) => {
    setSelectedProducts(selected);
  };
  //call api getListProductShop
  const shopIdPromise = user?.id ? getShopId(user.id) : null; 
  useEffect(() => {
    shopIdPromise?.then((shopId: string) => {
      getListProduct(shopId).then((data) => {
        setProducts(data);
      }); // Chuỗi đã được giải quyết
    });
    getListCategories().then((data)=>{
      setCategories(data);
    })
  }, []);

  const navigation = useNavigate();

  const newHandle = () => {
    navigation("/quanlyshop/new");
  };

  const editHandle = (id: string) => {
    navigation(`/quanlyshop/edit/${id}`);
  };
  //call api deleteProduct
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

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex w-screen space-x-6">
      <DashboardNav />
      <div className="w-[75vw] px-6">
        <div className="flex items-center justify-between mt-5 mb-7 w-[75vw] ">
          <div className="flex items-center space-x-3 w-3/4">
            <InputBase
              onChange={(e)=>{
                setSearchTerm(e.target.value)
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
              onClick={newHandle}
              className="border  p-4 rounded-md"
            >
              Thêm sản phẩm
            </button>
            <button
              style={{ backgroundColor: "#FBFAF1" }}
              onClick={handleDelete(selectedProducts)}
              className="border  p-4 rounded-md"
            >
              Xóa sản phẩm
            </button>
          </div>
        </div>
        <ProductList
          products={filteredProducts}
          editProduct={editHandle}
          onSelectedProductsChange={handleSelectedProductsChange}
          categories={categories}  
        />
      </div>
    </div>
  );
}
