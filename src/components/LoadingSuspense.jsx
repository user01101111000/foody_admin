import "../containers/login/style/Login.css";
import Loader from "../containers/login/components/LoginBox/components/Loader";

export default function LoadingSuspense() {
  return (
    <section className="LoadingSuspense">
      <Loader />
    </section>
  );
}
