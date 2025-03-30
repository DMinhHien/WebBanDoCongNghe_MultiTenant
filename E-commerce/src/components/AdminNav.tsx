
import { Link } from 'react-router-dom'


export default function AdminNav() {
  return (
    <nav style={{backgroundColor:"#FBFAF1"}} className="border w-64 text-black flex flex-col p-6 h-screen sticky top-0">
      <Link to="/admin" className="py-3 px-6 rounded-lg hover:bg-black hover:bg-opacity-5 text-lg transition-colors duration-200">
        Quản lý Thể Loại
      </Link>
      <Link to="/admin/QuanLyUser" className="py-3 px-6 rounded-lg  hover:bg-black hover:bg-opacity-5 text-lg transition-colors duration-200">
        Quản lý Người dùng
      </Link>
      <Link to="/admin/QuanLyShop" className="py-3 px-6 rounded-lg  hover:bg-black hover:bg-opacity-5 text-lg transition-colors duration-200">
        Quản lý cửa hàng
      </Link>
    </nav>
  )
}