import { useFormik } from "formik";
import { updateAdminSchema } from "../../../utils/schema";
import useUpdatePasswordMutation from "../../../hooks/api/useUpdatePasswordMutation";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const PassComp = ({ state, setState, t }) => {
  const { generateUserLogoutDatas } = useAuth();
  const { mutateAsync } = useUpdatePasswordMutation();

  const navigate = useNavigate();

  const {
    values,
    handleChange,
    resetForm,
    handleSubmit,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: updateAdminSchema(t),
  });

  async function onSubmit(values) {
    setState(true);

    await mutateAsync(values);

    resetForm();
    setState(false);

    generateUserLogoutDatas();
    navigate("/settings");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="inputBox">
        <label htmlFor="oldPassword">{t("Current password")} 🔐</label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="********"
          value={values.oldPassword}
          onChange={handleChange}
        />

        {errors.oldPassword && (
          <p className="settingErrorPassword">{errors.oldPassword}</p>
        )}
      </div>
      <div className="inputBox">
        <label htmlFor="newPassword">{t("New password")} 🔐</label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="********"
          value={values.newPassword}
          onChange={handleChange}
        />

        {errors.newPassword && (
          <p className="settingErrorPassword">{errors.newPassword}</p>
        )}
      </div>
      <div className="inputBox">
        <label htmlFor="confirmPassword">{t("Confirm new password")} 🔐</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="********"
          value={values.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <p className="settingErrorPassword">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="inputBox">
        <input
          type="submit"
          value={t("Update password")}
          className={state || isSubmitting ? "disableButton" : ""}
          disabled={isSubmitting || state}
        />
      </div>
    </form>
  );
};

export default PassComp;
