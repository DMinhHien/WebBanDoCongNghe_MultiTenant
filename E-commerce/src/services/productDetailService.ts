import axios from "axios";
import { Product } from "../data/productdetail";

export const addProduct =async(Product:Product)=>{
    try {
        const { id, ...productWithoutId } = Product;    
        const token = localStorage.getItem("token")
        await axios.post(`https://localhost:7183/Product/create`,{data:productWithoutId },{ headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.error("không thể thêm sản phẩm",error);
        throw error
    }
}

export const editProduct=async(Product:Product)=>{
    try {
        const token=localStorage.getItem("token")
        await axios.post(`https://localhost:7183/Product/edit`,{data:Product },{ headers: {Authorization:`Bearer ${token}`} })
    } catch (error) {
        console.error("không thể chỉnh sửa sản phẩm",error);
        throw error
    }
}

export const deleteProduct=async(id:string)=>{
    try {
        const token=localStorage.getItem("token")
        const res=await axios.post(`https://localhost:7183/Product/delete`,{id},{headers:{Authorization:`Bearer ${token}`}})
        return res.data
    } catch (error) {
        console.error("không thể xóa sản phẩm",error);
        throw error
    }
}

export const getListProduct= async(id:string) =>{
    try 
    {
        const res=await axios.get<Product[]>(`https://localhost:7183/Product/getListUseShop/${id}`)
        return res.data;
    } catch (error) {
        console.error("không thể lấy danh sách sản phẩm",error);
        throw error
    }
}

export const getProduct=async(id:string)=>{
    try {
        const res= await axios.get<Product>(`https://localhost:7183/Product/getElementById/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}