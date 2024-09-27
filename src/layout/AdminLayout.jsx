import "./AdminLayout.css";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import LoadingSuspense from "../components/LoadingSuspense";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  return (
    <main className="adminLayout">
      <Header />

      <article className="adminLayout_content">
        <Sidebar />

        <Suspense fallback={<LoadingSuspense />}>
          <Outlet />
        </Suspense>
      </article>

      <ToastContainer />
    </main>
  );
}
