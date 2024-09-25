import "../style/SidebarCopyright.css";
import eacamp from "../../../assets/icons/eacamp.svg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function SidebarCopyright() {
  const { t } = useTranslation();
  return (
    <motion.article
      className="sidemenu_copyright_box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="sidemenu_copyright_header">
        <figure className="copyright_img_fig">
          <img src={eacamp} alt="eacamp" />
        </figure>
        <h1>EACAMP</h1>
      </div>

      <p>{t("Version")}: 1.0</p>
      <p>{t("Copyright")} © 2024 EACAMP</p>
    </motion.article>
  );
}
