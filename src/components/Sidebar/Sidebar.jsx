import "./Sidebar.css";
import Sidemenu from "./components/Sidemenu";
import SidebarCopyright from "./components/SidebarCopyright";

import { useSelector } from "react-redux";

export default function Sidebar() {
  const { visible } = useSelector((state) => state.navMenuReducer);

  return (
    <aside className={`sidebar ${visible ? "showSideMenu" : ""}`}>
      <Sidemenu />

      <SidebarCopyright />
    </aside>
  );
}
