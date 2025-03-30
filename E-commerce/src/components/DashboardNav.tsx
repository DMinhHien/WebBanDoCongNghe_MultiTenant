
import { Link } from 'react-router-dom'


export default function DashboardNav() {
  return (
    <nav style={{backgroundColor:"#FBFAF1"}} className="border w-64 text-black flex flex-col p-6 h-screen sticky top-0">
      <Link to="/quanlyshop" className="py-3 px-6 rounded-lg hover:bg-black hover:bg-opacity-5 text-lg transition-colors duration-200">
        Quản lý sản phẩm
      </Link>
      <Link to="/quanlyshop/QuanLyDonHang" className="py-3 px-6 rounded-lg  hover:bg-black hover:bg-opacity-5 text-lg transition-colors duration-200">
        Quản lý đơn hàng
      </Link>
      <Link to="/quanlyshop/QuanLyThongTin" className="py-3 px-6 rounded-lg  hover:bg-black hover:bg-opacity-5 text-lg transition-colors duration-200">
        Thông tin cửa hàng
      </Link>
    </nav>
  )
}