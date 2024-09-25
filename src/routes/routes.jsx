import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginSuspense from "../components/LoadingSuspense";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/login/Login";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Products = lazy(() => import("../pages/products/Products"));
const Restaurant = lazy(() => import("../pages/restaurants/Restaurant"));
const Category = lazy(() => import("../pages/category/Category"));
const Offer = lazy(() => import("../pages/offers/Offer"));
const Order = lazy(() => import("../pages/orders/Order"));
const OrderHistory = lazy(() => import("../pages/order-history/OrderHistory"));
const Settings = lazy(() => import("../pages/settings/Settings"));

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
    element: (
      <Suspense fallback={<LoginSuspense />}>
        <Login />
      </Suspense>
    ),
  },
];

const mappedAuthRoutes = routes.map((route) => {
  if (route?.auth)
    route.element = <ProtectedRoute>{route.element}</ProtectedRoute>;

  return route;
});

export const router = createBrowserRouter(mappedAuthRoutes);
