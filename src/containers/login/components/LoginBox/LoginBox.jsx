import "./LoginBox.css";
import login_img from "../../../../assets/images/login_img.svg";
import { useFormik } from "formik";
import Loader from "./components/Loader.jsx";
import { basicSchema } from "../../../../utils/schema.js";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { motion } from "framer-motion";
import { showErrorSwal } from "../../../../utils/showAlert.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import coffee from "../../../../assets/images/coffee.gif";
import useLoginMutation from "../../../../hooks/api/useLoginMutation";

export default function LoginBox() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const { generateUserLoginDatas } = useAuth();
  const { t } = useTranslation();

  const { mutateAsync } = useLoginMutation();

  async function onSubmit(values) {
    const user = {
      email: values.username,
      password: values.password,
    };

    try {
      const data = await mutateAsync(user);

      generateUserLoginDatas(data.idToken, values.remember);
      navigate("/");
    } catch (error) {
      showErrorSwal(t("errorMesSwal1"), t("errorMesSwal2"));
    }

    resetForm();
  }

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: basicSchema(t),
    onSubmit,
  });

  return (
    <motion.article
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="LoginBox"
    >
      <img src={coffee} alt="coffee" className="coffee" />
      <div className="form_box">
        <h1>{t("WelcomeAdmin")}</h1>

        <form className="login_form" onSubmit={handleSubmit}>
          <div className="input_box">
            <input
              type="text"
              placeholder={"👨🏻‍💻 " + t("Username")}
              name="username"
              id="username"
              value={values.username}
              onChange={handleChange}
              className={
                errors.username ? "input_field_disabled" : "input_field"
              }
            />
            {errors.username && (
              <p className="errorMessage">{errors.username}</p>
            )}
          </div>

          <div className="input_box">
            <div className="password_box">
              <input
                type={showPass ? "text" : "password"}
                placeholder={"🔐 " + t("Password")}
                value={values.password}
                name="password"
                id="password"
                onChange={handleChange}
                className={
                  errors.password ? "input_field_disabled" : "input_field"
                }
              />

              {showPass ? (
                <FaEye
                  className="pass_eye"
                  onClick={() => setShowPass(false)}
                />
              ) : (
                <FaEyeSlash
                  className="pass_eye"
                  onClick={() => setShowPass(true)}
                />
              )}
            </div>
            {errors.password && (
              <p className="errorMessage">{errors.password}</p>
            )}
          </div>

          <div className="check_input_box">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={values.remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">{t("Remember me")}</label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "submit_btn_disabled" : "submit_btn"}
          >
            {isSubmitting ? <Loader /> : "🚀 " + t("SignIn")}
          </button>
        </form>
      </div>

      <figure className="login_img">
        <img src={login_img} alt="login_img" />
      </figure>
    </motion.article>
  );
}
