import { useFormik } from "formik";
import upload from "../../assets/icons/cloud_upload.svg";
import { useState } from "react";
import { addOfferSchema } from "../../utils/schema";
import Loader from "../../containers/login/components/LoginBox/components/Loader";
import { useTranslation } from "react-i18next";

export default function AddOfferContent({
  callback = async () => {},
  initialValues = [],
  setShow = () => {},
  itsEdit = false,
}) {
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
      title: initialValues?.[2]?.data || "",
      description: initialValues?.[3]?.data || "",
      file: initialValues?.[1]?.data || "",
    },
    validationSchema: addOfferSchema(t),
    onSubmit,
  });

  async function onSubmit(values) {
    await callback(values);
    resetForm();
  }

  return (
    <div className="AddProductContent">
      <h1>{itsEdit ? t("Edit Offer") : t("Create Offer")}</h1>

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
            {itsEdit ? t("EditOfferDescription") : t("AddOfferDescription")}
          </h1>

          <div className="form_section2_input_box">
            <div className="input_box">
              <label>{t("Title")}</label>
              <input
                type="text"
                name="title"
                id="title"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && <p className="errorMessage">{errors.title}</p>}
            </div>

            <div className="input_box">
              <label>{t("Description")}</label>
              <textarea
                rows={5}
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="errorMessage">{errors.description}</p>
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
                t("Update Offer")
              ) : (
                t("Create Offer")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
