import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AccountPage from "../pages/AccountPage";
import AuthRequire from "./AuthRequire";
import ProductByCategoryPage from "../pages/ProductByCategoryPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckOutPage from "../pages/CheckOutPage";
import BundlePage from "../pages/BundlePage";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrderPage from "../pages/OrderPage";
import BundleDetailPage from "../pages/BundleDetailPage";

import useAuth from "../hooks/useAuth";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminEditProduct from "../pages/AdminEditProduct";
import AdminCreateProduct from "../pages/AdminCreateProduct";
import AdminEditOrder from "../pages/AdminEditOrder";

function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {user && user.role === "admin" ? (
        <Route
          element={
            <AuthRequire>
              <MainLayout />
            </AuthRequire>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/edit" element={<AdminEditProduct />} />
          <Route
            path="/admin/products/create"
            element={<AdminCreateProduct />}
          />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminEditOrder />} />
        </Route>
      ) : (
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/product" element={<ProductPage />} />
          <Route
            path="/product/category/:id"
            element={<ProductByCategoryPage />}
          />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="/account"
            element={
              <AuthRequire>
                <AccountPage />
              </AuthRequire>
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bundle" element={<BundlePage />} />
          <Route path="/bundle/:id" element={<BundleDetailPage />} />
          <Route
            path="/checkout"
            element={
              <AuthRequire>
                <CheckOutPage />
              </AuthRequire>
            }
          />
          <Route
            path="/order/:id"
            element={
              <AuthRequire>
                <OrderDetailPage />
              </AuthRequire>
            }
          />
        </Route>
      )}
    </Routes>
  );
}
export default Router;
