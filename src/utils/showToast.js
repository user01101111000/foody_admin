import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showToast(label) {
  toast.success(label, {
    position: "top-right",
    className: "toast_container_header",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

export function showErrorToast(label) {
  toast.error(label, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
