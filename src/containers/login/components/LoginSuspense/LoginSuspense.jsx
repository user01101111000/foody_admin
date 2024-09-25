import "../../style/Login.css";
import { PuffLoader } from "react-spinners";
export default function LoginSuspense() {
  return (
    <section className="Login">
      <PuffLoader color="white" size={50} />
    </section>
  );
}
