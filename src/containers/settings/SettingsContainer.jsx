import "./Settings.css";
import { useTranslation } from "react-i18next";
import PassComp from "./components/PassComp";
import PDFComp from "./components/PDFComp";
import { useState } from "react";

const SettingsContainer = () => {
  const { t } = useTranslation();
  const [state, setState] = useState(false);

  return (
    <section className="SettingsConatiner">
      <h1 className="settings_title">{t("Settings")} 🛠️</h1>

      <PassComp t={t} state={state} setState={setState} />

      <hr className="settingHR" />

      <PDFComp t={t} />
    </section>
  );
};

export default SettingsContainer;
