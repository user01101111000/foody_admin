import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

const basicSchema = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .min(3, t("Username must be at least 3 characters"))
      .required(t("Username is required")),

    password: yup
      .string()
      .min(8, t("Password must be at least 8 characters"))
      .matches(
        passwordRules,
        t(
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
      )
      .required(t("Password is required")),
  });
};

const addProductSchema = (t) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(1, t("Name must be at least 1 characters"))
      .required(t("Name is required")),

    description: yup
      .string()
      .min(5, t("Description must be at least 5 characters"))
      .required(t("Description is required")),

    price: yup
      .number()
      .positive(t("Price must be a positive number"))
      .required(t("Price is required")),

    file: yup
      .mixed()
      .test("required", t("File is required"), (value) => value !== "")
      .required(t("File is required")),

    restaurant: yup
      .string()
      .min(1, t("Restaurant must be at least 1 characters"))
      .required(t("Restaurant is required")),
  });
};

const addRestaurantSchema = (t) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(1, t("Name must be at least 1 characters"))
      .required(t("Name is required")),

    cuisine: yup
      .string()
      .min(5, t("Description must be at least 5 characters"))
      .required(t("Description is required")),

    price: yup
      .number()
      .positive(t("Price must be a positive number"))
      .required(t("Price is required")),

    minute: yup
      .number()
      .positive(t("Minute must be a positive number"))
      .required(t("Minute is required")),

    address: yup
      .string()
      .min(5, t("Address must be at least 5 characters"))
      .required(t("Address is required")),

    file: yup
      .mixed()
      .test("required", t("File is required"), (value) => value !== "")
      .required(t("File is required")),

    category: yup
      .string()
      .min(1, t("Category must be at least 2 characters"))
      .required(t("Category is required")),
  });
};

const addCategorySchema = (t) => {
  return yup.object().shape({
    category: yup
      .string()
      .min(2, t("Category must be at least 2 characters"))
      .required(t("Category is required")),
    file: yup
      .mixed()
      .test("required", t("File is required"), (value) => value !== "")
      .required(t("File is required")),
  });
};

const addOfferSchema = (t) => {
  return yup.object().shape({
    title: yup
      .string()
      .min(1, t("Name must be at least 1 characters"))
      .required(t("Name is required")),
    description: yup
      .string()
      .min(5, t("Description must be at least 5 characters"))
      .required(t("Description is required")),
    file: yup
      .mixed()
      .test("required", t("File is required"), (value) => value !== "")
      .required(t("File is required")),
  });
};

const updateAdminSchema = (t) => {
  return yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, t("Password must be at least 8 characters"))
      .matches(
        passwordRules,
        t(
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
      )
      .required(t("Old password is required")),
    newPassword: yup
      .string()
      .min(8, t("Password must be at least 8 characters"))
      .matches(
        passwordRules,
        t(
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        )
      )
      .required(t("Password is required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
};

const updateAdminSchema2 = (t) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("Email must be a valid email address"))
      .required(t("Email is required")),
  });
};

export {
  basicSchema,
  addProductSchema,
  addRestaurantSchema,
  addCategorySchema,
  addOfferSchema,
  updateAdminSchema,
  updateAdminSchema2,
};
