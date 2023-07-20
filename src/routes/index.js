import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import Order from "../pages/Order";
import OrderInvoice from "../pages/OrderInvoice";
import AccountPage from "../pages/AccountPage";
import AuthRequire from "./AuthRequire";
import ProductByCategoryPage from "../pages/ProductByCategoryPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckOutPage from "../pages/CheckOutPage";
import BundlePage from "../pages/BundlePage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route
          path="/product/category/:id"
          element={<ProductByCategoryPage />}
        />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bundle" element={<BundlePage />} />
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
              <OrderInvoice />
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
