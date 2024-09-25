import "../style/Sidemenu.css";
import { NavLink, useNavigate } from "react-router-dom";
import dashboard from "../../../assets/icons/dashboard.svg";
import products from "../../../assets/icons/products.svg";
import category from "../../../assets/icons/category.svg";
import orders from "../../../assets/icons/orders.svg";
import offers from "../../../assets/icons/offer.svg";
import restaurants from "../../../assets/icons/restaurants.svg";
import logout from "../../../assets/icons/logout.svg";
import arrow_back from "../../../assets/icons/arrow_back2.svg";
import logo from "../../../assets/icons/foody_logo_white.svg";
import eacamp from "../../../assets/icons/eacamp.svg";
import { useAuth } from "../../../context/AuthContext";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toggleNavMenu } from "../../../redux/features/navMenuSlice/navMenuSlice";
import { useTranslation } from "react-i18next";

export default function Sidemenu() {
  const { generateUserLogoutDatas } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <motion.article
      className="sidemenu_box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div
        className="sidemenu_header"
        onClick={() => dispatch(toggleNavMenu())}
      >
        <figure className="sidemenu_back_fig">
          <img src={arrow_back} alt="arrow_back" />
        </figure>

        <figure>
          <img src={logo} alt="logo" />
        </figure>
      </div>

      <ul className="sidemenu_list">
        <NavLink
          to="/"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={dashboard} alt="dashboard" />
          </figure>

          <h1>{t("Dashboard")}</h1>
        </NavLink>

        <NavLink
          to="/products"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={products} alt="products" />
          </figure>

          <h1>{t("Products")}</h1>
        </NavLink>

        <NavLink
          to="/restaurants"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={restaurants} alt="restaurants" />
          </figure>

          <h1>{t("Restaurants")}</h1>
        </NavLink>

        <NavLink
          to="/category"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={category} alt="category" />
          </figure>

          <h1>{t("Category")}</h1>
        </NavLink>

        <NavLink
          to="/orders"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={orders} alt="orders" />
          </figure>

          <h1>{t("Orders")}</h1>
        </NavLink>

        <NavLink
          to="/offers"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={offers} alt="offers" />
          </figure>

          <h1>{t("Offers")}</h1>
        </NavLink>

        <NavLink
          to="/orderHistory"
          className="sidemenu_link"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <figure className="sidemenu_img_fig">
            <img src={orders} alt="offers" />
          </figure>

          <h1>{t("OrderHistory")}</h1>
        </NavLink>

        <button
          className="sidemenu_button"
          onClick={() => {
            generateUserLogoutDatas();
            dispatch(toggleNavMenu());
            navigate("/login");
          }}
        >
          <figure className="sidemenu_img_fig">
            <img src={logout} alt="logout" />
          </figure>

          <h1>{t("Logout")}</h1>
        </button>
      </ul>

      <div className="sidemenu_footer">
        <figure>
          <img src={eacamp} alt="eacamp" />
        </figure>

        <h1>EACAMP</h1>
      </div>
    </motion.article>
  );
}
