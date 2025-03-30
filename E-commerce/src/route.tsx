import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage"
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductsByCategoryPage";
import ShopPage from "./pages/ShopPage";
import ShopDetailPage from "./pages/ShopDetailPage";
import LoginPage from "./components/Auth/LoginPage";
import ProfilePage from "./components/Auth/ProfilePage";
import SignUpPage from "./components/Auth/SignUpPage";
import QuanLySP from "./pages/QuanLySanPham";
import ProductCreate from "./pages/ProductCreate";
import ChinhSuaSP from "./pages/ChinhSuaSanPham";
import QuanLyDonHang from "./pages/QuanLyDonHang";
import QuanLyThongTin from "./pages/QuanLyThongTin";
import ChinhSuaShop from "./pages/ChinhSuaShop"
import QuanLyCategories from "./pages/QuanLyCategories";
import QuanLyUser from "./pages/QuanLyUser";
import QuanLyShop from "./pages/QuanLyShop";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import CreateShop from "./pages/CreateShop";
import EditShop from "./pages/EditShop";
import AdminQuanLySP from "./pages/AdminQuanLySP";
import CreateShopAdmin from "./pages/CreateShopAdmin";
import Layout_admin from "./pages/Layout_admin";
import CartPage from "./pages/CartPage";
import QuanLyMuaHang from "./pages/QuanLyMuaHang";
import ChiTietDonHang from "./components/QuanLyMuaHang/OrderDetail";
import EditProfilePage from "./components/Profile/ProfileEditPage";
import ReceiptPage from "./pages/ReceiptPage";
import About from "./components/About/About";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: "/products/:id",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ProductDetail /> }],
    },
    {
      path: "/categories",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <CategoriesPage /> }],
    },
    {
      path: "/cart",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <CartPage /> }],
    },
    {
      path: "/productscategory/:categoryId",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ProductsPage /> }],
    },
    {
      path: "/shops",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ShopPage /> }],
    },
    {
      path: "/shop/:shopId",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ShopDetailPage /> }],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: < SignUpPage/>,
    },
    {
      path: "/profile",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ProfilePage /> }],
    },
    {
      path: "/quanlyshop",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLySP /> }],
    },
    {
      path: "/quanlyshop/new",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ProductCreate /> }],
    },
    {
      path: "/quanlyshop/edit/:id",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ChinhSuaSP /> }],
    },
    {
      path: "/quanlyshop/QuanLyDonHang",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLyDonHang /> }],
    },
    {
      path: "/QuanLyMuaHang",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLyMuaHang /> }],
    },
    {
      path: "/chitiet/:id",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ChiTietDonHang /> }],
    },
    {
      path: "/quanlyshop/QuanLyThongTin",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLyThongTin /> }],
    },
    {
      path: "/quanlyshop/QuanLyThongTin/edit",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ChinhSuaShop /> }],
    },
    {
      path: "/admin",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLyCategories /> }],
    },
    {
      path: "/admin/QuanLyUser",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLyUser /> }],
    },
    {
      path: "/admin/QuanLyShop",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <QuanLyShop /> }],
    },
    {
      path: "/admin/QuanLyUser/new",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <CreateUser /> }],
    },
    {
      path: "/admin/QuanLyUser/edit/:id",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <EditUser /> }],
    },
    {
      path: "/admin/QuanLyShop/new",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <CreateShopAdmin /> }],
    },
    {
      path: "/newShop",
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <CreateShop /> }],
    },
    {
      path: "/admin/QuanLyShop/edit/:id",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <EditShop /> }],
    },
    {
      path: "/admin/QuanLyShop/xemSP/:id",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <AdminQuanLySP /> }],
    },
    {
      path: "/profile/edit/:id",
      element: <Layout_admin />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <EditProfilePage /> }],
    },
    {
      path: "/receipt",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <ReceiptPage/> }],
    },
    {
      path: "/about",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <About/> }],
    },
  ]);
  
  export default router;
  