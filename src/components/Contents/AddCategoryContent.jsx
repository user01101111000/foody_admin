import { useFormik } from "formik";
import upload from "../../assets/icons/cloud_upload.svg";
import { useState } from "react";
import { addCategorySchema } from "../../utils/schema";
import Loader from "../../containers/login/components/LoginBox/components/Loader";
import { useTranslation } from "react-i18next";
import { showToast } from "../../utils/showToast";
import useCreateCategoryMutation from "../../hooks/api/useCreateCategoryMutation";
import useUpdateCategoryMutation from "../../hooks/api/useUpdateCategoryMutation";

export default function AddCategoryContent({
  initialValues = {},
  setShow = () => {},
  itsEdit = false,
}) {
  const { mutateAsync } = useCreateCategoryMutation();
  const { mutateAsync: updateCategory } = useUpdateCategoryMutation();

  const [file, setFile] = useState("");
  const { t } = useTranslation();
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    resetForm,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      category: initialValues?.[2]?.data || "",
      file: "",
    },
    validationSchema: addCategorySchema(t),
    onSubmit,
  });

  async function onSubmit(values) {
    if (itsEdit) {
      const data = {
        file: values.file,
        category: values.category,
        id: initialValues[0].data,
      };

      await updateCategory(data);
      showToast(t("toast22"));
    } else {
      await mutateAsync(values);

      showToast(t("toast2"));
    }

    resetForm();
    setShow(false);
  }

  return (
    <div className="AddProductContent">
      <h1>{itsEdit ? t("EditCategory") : t("AddCategory")}</h1>

      <form className="addProduct_form" onSubmit={handleSubmit}>
        <div className="form_section form_section1">
          <div className="form_section1_image_area">
            <h1>{t("Upload Image")}</h1>
            {file && (
              <>
                <figure className="form_section1_comp_image_fig">
                  <img src={file} alt="image" />
                </figure>

                <p>{values?.file?.name}</p>
              </>
            )}
          </div>

          <div className="form_section1_input_custom_box">
            <label htmlFor="image_path" className="form_section1_input_custom">
              <figure className="form_section1_input_custom_img_fig">
                <img src={upload} alt="upload" />
              </figure>
              <p>{t("Upload Image")}</p>
            </label>

            {errors.file && <p className="errorMessage">{errors.file}</p>}
          </div>
          <input
            type="file"
            name="image_path"
            id="image_path"
            value=""
            onChange={(event) => {
              setFieldValue("file", event.currentTarget.files[0]);
              setFile(URL.createObjectURL(event.currentTarget.files[0]));
            }}
            className="form_section1_input"
          />
        </div>

        <div className="form_section form_section2">
          <h1>
            {itsEdit
              ? t("EditCategoryDescription")
              : t("AddCategoryDescription")}
          </h1>

          <div className="form_section2_input_box">
            <div className="input_box">
              <label>{t("Name")}</label>
              <input
                type="text"
                name="category"
                id="category"
                value={values.category}
                onChange={handleChange}
              />
              {errors.category && (
                <p className="errorMessage">{errors.category}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form_section_buttons">
          <hr className="divider" />

          <div className="buttons_area">
            <button type="button" onClick={() => setShow(false)}>
              {t("Cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={
                `add_product_submit_btn` + (isSubmitting ? " disabled_btn" : "")
              }
            >
              {isSubmitting ? (
                <Loader />
              ) : itsEdit ? (
                t("Edit Category")
              ) : (
                t("Create Category")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
