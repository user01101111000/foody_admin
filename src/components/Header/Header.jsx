import "./Header.css";
import logo from "../../assets/icons/foody_logo_white.svg";
import avatar from "../../assets/icons/avatar.svg";
import hamburger from "../../assets/icons/hamburger.svg";
import LanguageBox from "../LanguageBox/LanguageBox";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AddProductContent from "../../components/Contents/AddProductContent";
import { useDispatch } from "react-redux";
import { toggleNavMenu } from "../..//redux/features/navMenuSlice/navMenuSlice";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { generateUserLogoutDatas } = useAuth();
  const [show, setShow] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  return (
    <motion.header
      className="layout_header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="layout_header_left">
        <figure
          className="layout_header_left_hamburger_fig"
          onClick={() => dispatch(toggleNavMenu())}
        >
          <img src={hamburger} alt="hamburger" />
        </figure>

        <figure className="layout_header_left_logo_fig">
          <img src={logo} alt="logo" onClick={() => navigate("/")} />
        </figure>
      </div>

      <div className="layout_header_right">
        <button className="addProduct_btn" onClick={() => setShow(true)}>
          🚀 {t("ADDPRODUCT")}
        </button>

        <button
          className="addProduct_btn addProduct_btn_mobile"
          onClick={() => setShow(true)}
        >
          +
        </button>

        <LanguageBox />
        <div className="layout_header_avatar">
          <figure
            className="avatar"
            onClick={() => setShowAvatarMenu(!showAvatarMenu)}
          >
            <img src={avatar} alt="avatar" />
          </figure>

          <h1 onClick={() => setShowAvatarMenu(!showAvatarMenu)}>
            {t("Admin")}
          </h1>

          <AnimatePresence>
            {showAvatarMenu && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                className="avatarMenu"
              >
                <p
                  onClick={() => {
                    setShowAvatarMenu(false);
                    navigate("/settings");
                  }}
                >
                  ⚙️ {t("Settings")}
                </p>
                <p
                  onClick={() => {
                    setShowAvatarMenu(false);
                    generateUserLogoutDatas();
                    navigate("/login");
                  }}
                >
                  ⚡ {t("Logout")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal show={show} setShow={setShow}>
        <AddProductContent
          setShow={setShow}
          label={{ keyName: "Add", buttonName: "Create Product" }}
        />
      </Modal>
    </motion.header>
  );
}
