import "./AddProductContent.css";
import { useFormik } from "formik";
import upload from "../../assets/icons/cloud_upload.svg";
import { useState } from "react";
import CustomSelect from "../Header/components/CustomSelect";
import { addProductSchema } from "../../utils/schema";
import Loader from "../../containers/login/components/LoginBox/components/Loader";
import { useTranslation } from "react-i18next";
import useCreateProductMutation from "../../hooks/api/useCreateProductMutation";
import { showToast } from "../../utils/showToast.js";
import useGetAllRestaurantsQuery from "../../hooks/api/useGetAllRestaurantsQuery";
import useUpdateProductMutation from "../../hooks/api/useUpdateProductMutation";

export default function AddProductContent({
  label = "",
  setShow = () => {},
  initialValues = {},
  itsEdit = false,
}) {
  const [file, setFile] = useState("");
  const { mutateAsync } = useCreateProductMutation();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useGetAllRestaurantsQuery();
  const { mutateAsync: updateProduct } = useUpdateProductMutation();

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
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      price: initialValues?.price || "",
      file: "",
      restaurant: initialValues?.restaurant || "",
    },
    validationSchema: addProductSchema(t),
    onSubmit,
  });

  async function onSubmit(values) {
    if (itsEdit) {
      const data = {
        ...values,
        id: initialValues.id,
      };

      await updateProduct(data);

      setShow(false);
      showToast(t("toast11"));
    } else {
      await mutateAsync(values);
      resetForm();
      setShow(false);

      showToast(t("toast1"));
    }
  }

  return (
    <div className="AddProductContent">
      <h1>{label.keyName == "Add" ? t("addProduct") : t("Edit Product")}</h1>

      <form className="addProduct_form" onSubmit={handleSubmit}>
        <div className="form_section form_section1">
          <div className="form_section1_image_area">
            <h1>{t("UploadImage")}</h1>
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
            {label.keyName == "Add"
              ? t("AddProductDescription")
              : t("EditProductDescription")}
          </h1>

          <div className="form_section2_input_box">
            <div className="input_box">
              <label>{t("Name")}</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && <p className="errorMessage">{errors.name}</p>}
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

            <div className="input_box">
              <label>{t("Price")}, $</label>
              <input
                type="number"
                name="price"
                id="price"
                value={values.price}
                onChange={handleChange}
              />
              {errors.price && <p className="errorMessage">{errors.price}</p>}
            </div>

            <div className="input_box">
              <label>{t("Restaurants")}</label>

              {isLoading ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <CustomSelect
                  label={t("Select a restaurant")}
                  list={data.map((x) => x.fields.name.stringValue)}
                  selectedValue={values.restaurant}
                  onChange={setFieldValue}
                  keyName="restaurant"
                  zIndex={2}
                />
              )}

              {errors.restaurant && (
                <p className="errorMessage">{errors.restaurant}</p>
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
              ) : label.buttonName == "Create Product" ? (
                t("Create Product")
              ) : (
                t("Edit Product")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
