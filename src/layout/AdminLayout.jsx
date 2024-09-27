import "./AdminLayout.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  return (
    <main className="adminLayout">
      <Header />

      <article className="adminLayout_content">
        <Sidebar />

        <Outlet />
      </article>

      <ToastContainer />
    </main>
  );
}
