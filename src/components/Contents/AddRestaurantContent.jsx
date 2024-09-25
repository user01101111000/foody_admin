import { useFormik } from "formik";
import upload from "../../assets/icons/cloud_upload.svg";
import { useState } from "react";
import CustomSelect from "../../components/Header/components/CustomSelect";
import { addRestaurantSchema } from "../../utils/schema";
import Loader from "../../containers/login/components/LoginBox/components/Loader";
import { useTranslation } from "react-i18next";
import { showToast } from "../../utils/showToast";
import useCreateRestaurantMutation from "../../hooks/api/useCreateRestaurantMutation";
import useGetAllRestaurantsAndCategoriesQuery from "../../hooks/api/useGetAllRestaurantsAndCategoriesQuery";
import useUpdateRestaurantMutation from "../../hooks/api/useUpdateRestaurantMutation";

export default function AddRestaurantContent({
  initialValues = {},
  setShow = () => {},
  itsEdit = false,
}) {
  const [file, setFile] = useState("");
  const { t } = useTranslation();

  const { mutateAsync: addCallback } = useCreateRestaurantMutation();
  const { mutateAsync: updateCallback } = useUpdateRestaurantMutation();

  const { data, isLoading, isError } = useGetAllRestaurantsAndCategoriesQuery();

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
      cuisine: initialValues?.cuisine || "",
      price: initialValues?.price || "",
      minute: initialValues?.minute || "",
      file: initialValues?.file || "",
      address: initialValues?.address || "",
      category: initialValues?.category || "",
    },
    validationSchema: addRestaurantSchema(t),
    onSubmit,
  });

  async function onSubmit(values) {
    if (!itsEdit) {
      await addCallback(values);

      showToast(t("toast4"));
    } else {
      const data = {
        ...values,
        id: initialValues.id,
      };
      await updateCallback(data);

      showToast(t("toast44"));
    }

    resetForm();
    setShow(false);
  }

  return (
    <div className="AddProductContent">
      <h1>{t("AddRestaurant")}</h1>

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
          <h1>{t("AddRestaurantInformation")}</h1>

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
              <label>{t("Cuisine")}</label>
              <textarea
                rows={5}
                name="cuisine"
                id="cuisine"
                value={values.cuisine}
                onChange={handleChange}
              ></textarea>
              {errors.cuisine && (
                <p className="errorMessage">{errors.cuisine}</p>
              )}
            </div>

            <div className="input_box">
              <label>{t("Delivery Price")} $</label>
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
              <label>{t("Delivery Minute")}</label>
              <input
                type="number"
                name="minute"
                id="minute"
                value={values.minute}
                onChange={handleChange}
              />
              {errors.minute && <p className="errorMessage">{errors.minute}</p>}
            </div>

            <div className="input_box">
              <label>{t("Address")}</label>
              <input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="errorMessage">{errors.address}</p>
              )}
            </div>

            <div className="input_box">
              <label>{t("Category")}</label>

              {isLoading ? (
                <Loader />
              ) : (
                <CustomSelect
                  label={t("Select a category")}
                  list={data[1].map((x) => x.fields.name.stringValue)}
                  selectedValue={values.category}
                  onChange={setFieldValue}
                  keyName="category"
                  zIndex={2}
                />
              )}

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
                t("Update Restaurant")
              ) : (
                t("Create Restaurant")
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
