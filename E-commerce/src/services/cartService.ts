
import axios from "axios";
import { CartDetail } from "../data/cartdetail";
interface Cart {
    id: string;
    userId: string;
  }

export async function fetchCartDetails(userId: string): Promise<CartDetail[]> {
    const response = await fetch(`https://localhost:7183/Cart/getListUse/${userId}`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách sản phẩm trong giỏ hàng');
    }
    return response.json();
  }
  export const createCart = async (userId: string) => {
    try {
      const token = localStorage.getItem("token")
      await axios.post<Cart>('https://localhost:7183/Cart/create', { data: { userId } }, { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
      console.error("không thể tạo giỏ hàng", error);
      throw error
    }
  }

export const getCarts=async(id:string)=>{
  try {
    const token = localStorage.getItem("token")
    const res=await axios.get(`https://localhost:7183/Cart/getListUse/${id}`,{ headers: { Authorization: `Bearer ${token}` } })
    return res.data
  } catch (error) {
    console.error("Không thể lấy danh sách sản phẩm trong giỏ hàng", error);
      throw error
  }
}

export const editQuantity=async(idCart:string,id:string,idProduct:string,quantity:number)=>{
  try {
    const token =localStorage.getItem("token")
    await axios.post("https://localhost:7183/Cart/editCartDetail",{data:{id,idCart,idProduct,quantity}},{ headers: { Authorization: `Bearer ${token}` } })
  } catch (error) {
    console.error("Không thể thay đổi quantity", error);
      throw error
  }
}

export const deleteCartItem=async(id:string)=>{
  try {
    const token =localStorage.getItem("token")
    await axios.post(`https://localhost:7183/Cart/deleteCartDetail/${id}`,{},{ headers: { Authorization: `Bearer ${token}` } })
  } catch (error) {
    console.error("Không thể xóa CartItem", error);
    throw error
  }
}

export const getCartId=async(id:string)=>{
  try {
    const res=await axios.post(`https://localhost:7183/Cart/getCartId/${id}`)
    return res.data
  } catch (error) {
    console.error("Không thể lấy cartId", error);
    throw error
  }
}

export const addCartItem=async(idCart:string,idProduct:string,quantity:number)=>{
  try {
    const token =localStorage.getItem("token")
    await axios.post(`https://localhost:7183/Cart/addCartProduct`,{data:{idCart,idProduct,quantity}},{ headers: { Authorization: `Bearer ${token}` } })
  } catch (error) {
    console.error("Không thể thêm cartitem", error);
    throw error
  }
}

