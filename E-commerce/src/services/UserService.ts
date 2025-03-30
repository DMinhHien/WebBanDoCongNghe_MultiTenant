
import axios from "axios";
import { User } from "../data/User";
export const getListUsers = async () => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get<User[]>(`https://localhost:7183/User/getListUse`, { headers: { Authorization: `Bearer ${token}`, } })
        return res.data;
    } catch (error) {
        console.error("không thể lấy danh sách user", error);
        throw error
    }
}

export const createUser = async (user: User) => {
    try {
        const { id,  phoneNumber, ...rest } = user;
        const userNoId = {
            ...rest,
            Phone: phoneNumber,
          };
        console.log(user)
        await axios.post(`https://localhost:7183/User/Register`, userNoId)
    } catch (error) {
        console.error("không thể tạo user", error);
        throw error
    }
}

export const deleteUser = async (id: string) => {
    try {
        const token = localStorage.getItem("token")
        await axios.delete(`https://localhost:7183/User/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.error("không thể xóa user", error);
        throw error
    }
}

export const getUser = async (id: string) => {
    try {
        const res = await axios.get(`https://localhost:7183/User/getElementById/${id}`)
        return res.data;
    } catch (error) {
        console.error("không thể lấy user", error);
        throw error
    }
}

export const editUser = async (user: User) => {
    try {
        const token = localStorage.getItem("token")
        const { password, ...tmp } = user
        await axios.put(`https://localhost:7183/User/EditUser`, {
            data: {
                accountName: tmp.accountName, address: tmp.address, email: tmp.email, birthDate: tmp.birthDate, id: tmp.id, userName: tmp.email
            }
        }, { headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.error("không thể chỉnh sửa user", error);
        throw error
    }
}
export const addRole =async (id:string,role:string)=>{
    try {
        const token = localStorage.getItem("token")
        await axios.post(`https://localhost:7183/User/addRole`,{userId: id,roleName:role},{ headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.error("không thể thêm role", error);
        throw error
    }
}

export const editRole =async (id:string,role:string)=>{
    try {
        const token = localStorage.getItem("token")
        await axios.post(`https://localhost:7183/User/updateRole`,{userId: id,roleName:role},{ headers: { Authorization: `Bearer ${token}` } })
    } catch (error) {
        console.error("không thể thêm update role", error);
        throw error
    }
}
