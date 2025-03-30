import { ProductCart } from "../data/Cart";
import { RawOrderItem,OrderUser,OrderDetail } from "../data/order";
import axios from "axios";
export const getListOrder= async(id:string) =>{
    try 
    {
        const res=await axios.get<RawOrderItem[]>(`https://localhost:7183/Receipt/getListUseShop/${id}`)
        return res.data;
    } catch (error) {
        console.error("không thể lấy danh sách đơn hàng",error);
        throw error
    }
}
export const getListOrderUser= async(id:string) =>{
    try 
    {
        const res=await axios.get<OrderUser[]>(`https://localhost:7183/Receipt/getListUse/${id}`)
        return res.data;
    } catch (error) {
        console.error("không thể lấy danh sách đơn hàng",error);
        throw error
    }
}
export const getListOrderDetail= async(id:string) =>{
    try 
    {
        const res=await axios.get<OrderDetail[]>(`https://localhost:7183/Receipt/getReceiptDetail/${id}`)
        return res.data;
    } catch (error) {
        console.error("không thể lấy danh sách đơn hàng",error);
        throw error
    }
}

export const createReceipt=async(userId:string,ProductList:ProductCart[])=>{
    try {
        const token=localStorage.getItem("token")
        const res=await axios.post(`https://localhost:7183/Receipt/create/${userId}`,{data:ProductList},{ headers: { Authorization: `Bearer ${token}` } }) 
        return res.data
    } catch (error) {
        console.error("không thể tạo đơn hàng",error);
        throw error
    }
}

export const getReceiptDetail=async(id:string)=>{
    try {
        const res=await axios.get(`https://localhost:7183/Receipt/getReceiptDetail/${id}`) 
        return res.data
    } catch (error) {
        console.error("không thể lấy danh sách ReceiptDetail",error);
        throw error
    }
}