import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../components/AdminNav";
import { User } from "../data/User";
import { deleteUser, editRole, getListUsers } from "../services/UserService";

export default function QuanLyUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const nav = useNavigate();

  const filteredUsers = users.filter((user) =>
    user.accountName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //Call api getListUsers
  useEffect(() => {
    getListUsers().then((data) => {
      const transformedUsers = data.map((item: any) => ({
        id: item.id,
        accountName: item.accountname,
        birthDate: new Date(item.birthdate),
        address: item.address,
        email: item.email,
        password: "",
        role: item.role.length === 0 ? "User" : item.role,
        phoneNumber:""
      }));
      setUsers(transformedUsers);
    });
  }, []);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  // Hàm xử lý khi thay đổi checkbox của một sản phẩm
  const handleCheckboxChange = (id: string) => {
    if (!id) return; // Nếu không có id, bỏ qua

    setSelectedUsers((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      const newSelected = isSelected
        ? prevSelected.filter((userId) => userId !== id) // Bỏ chọn
        : [...prevSelected, id]; // Thêm vào danh sách
      return newSelected;
    });
  };

  // Hàm xử lý khi chọn tất cả hoặc bỏ chọn tất cả
  const handleSelectAll = () => {
    const newSelected =
      selectedUsers.length === users.length
        ? [] // Nếu đã chọn hết -> bỏ chọn tất cả
        : users.map((user) => user.id); // Nếu chưa chọn hết -> chọn tất cả

    setSelectedUsers(newSelected);
  };
  //Call api deleteUser
  const DeleteUsers = () => {
    selectedUsers.forEach((selectedUser) => {
      deleteUser(selectedUser).then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((User) => User.id !== selectedUser)
        );
        setSelectedUsers((prevSelected) =>
          prevSelected.filter((id) => id !== selectedUser)
        );
      });
    });
  };

  const changeRole=(userId:string,role:string)=>()=>{
    editRole(userId, role).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: role } : user
        )
      );
    });
  }

  const editUser = (id: string) => () => {
    nav(`/admin/QuanLyUser/edit/${id}`);
  };

  const newUser = () => {
    nav("/admin/QuanLyUser/new");
  };
  return (
    <div className="flex w-screen space-x-6">
      <AdminNav />
      <div className="w-[75vw] px-6">
        <div className="flex items-center justify-between mt-5 mb-7 w-[75vw] ">
          <div className="flex items-center space-x-3 w-3/4">
            <InputBase
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
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
              className="border  p-4 rounded-md"
              onClick={newUser}
            >
              Thêm User
            </button>
            <button
              style={{ backgroundColor: "#FBFAF1" }}
              className="border  p-4 rounded-md"
              onClick={DeleteUsers}
            >
              Xóa User
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 ">Danh sách User</h2>
          <div className="overflow-x-auto w-[75vw]">
            <table className="min-w-full border border-gray-300 table-auto border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#FBFAF1" }}>
                  <th className="border border-gray-300 p-2">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === users.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Tên Tài khoản
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Ngày sinh
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Địa chỉ
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Vai trò
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Chức năng
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.accountName}
                    </td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">
                      {user?.birthDate
                        ? new Date(user.birthDate).getTime()
                          ? new Intl.DateTimeFormat("vi-VN", {
                              year: "2-digit",
                              month: "2-digit",
                              day: "2-digit",
                            }).format(new Date(user.birthDate))
                          : "Ngày không hợp lệ"
                        : "Chưa có dữ liệu"}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.address}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select
                      value={user.role}
                      onChange={(e)=>{
                        changeRole(user.id,e.target.value)()
                      }}
                      className="border border-gray-300 p-1 rounded m-1 w-3/4"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="bg-black text-white px-2 py-1 rounded"
                        onClick={editUser(user.id)}
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
      </div>
    </div>
  );
}
