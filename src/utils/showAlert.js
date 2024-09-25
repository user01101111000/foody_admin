import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const showErrorSwal = (s1, s2) => {
  withReactContent(Swal).fire({
    icon: "error",
    title: s1,
    text: s2,
    showConfirmButton: false,
    timer: 1500,
  });
};

const alertShow = async (callback = async () => {}, t = () => {}) => {
  withReactContent(Swal)
    .fire({
      title: t("deleteSwalt1"),
      text: t("deleteSwalt2"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d63626",
      cancelButtonColor: "trasnparent",
      confirmButtonText: t("delete"),
      cancelButtonText: t("Cancel"),
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await callback();
        Swal.fire({
          title: t("deleted"),
          text: t("deleteSwalt3"),
          confirmButtonText: t("ok"),
          icon: "success",
        });
      }
    });
};

export { showErrorSwal, alertShow };
