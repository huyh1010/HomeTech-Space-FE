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
import AdminPage from "../pages/AdminPage";
import useAuth from "../hooks/useAuth";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";

function Router() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {user && user.role === "admin" ? (
          <Route
            path="/admin"
            element={
              <AuthRequire>
                <AdminPage />
              </AuthRequire>
            }
          >
            <Route
              path="/admin/dashboard"
              element={
                <AuthRequire>
                  <AdminDashboard />
                </AuthRequire>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AuthRequire>
                  <AdminProducts />
                </AuthRequire>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AuthRequire>
                  <AdminOrders />
                </AuthRequire>
              }
            />
          </Route>
        ) : (
          <Route index element={<HomePage />} />
        )}

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

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
export default Router;
