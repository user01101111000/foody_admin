import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Products from "../pages/products/Products";
import Restaurant from "../pages/restaurants/Restaurant";
import Category from "../pages/category/Category";
import Offer from "../pages/offers/Offer";
import Order from "../pages/orders/Order";
import OrderHistory from "../pages/order-history/OrderHistory";
import Settings from "../pages/settings/Settings";

const routes = [
  {
    path: "/",
    element: <AdminLayout />,
    auth: true,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/products", element: <Products /> },
      { path: "/category", element: <Category /> },
      { path: "/restaurants", element: <Restaurant /> },
      { path: "/offers", element: <Offer /> },
      { path: "/orders", element: <Order /> },
      { path: "/orderHistory", element: <OrderHistory /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const mappedAuthRoutes = routes.map((route) => {
  if (route?.auth)
    route.element = <ProtectedRoute>{route.element}</ProtectedRoute>;

  return route;
});

export const router = createBrowserRouter(mappedAuthRoutes);
