import "./style/Login.css";
import Navbar from "./components/Navbar/Navbar";
import LoginBox from "./components/LoginBox/LoginBox";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function LoginContainer() {
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;

  return (
    <section className="Login">
      <Navbar />

      <LoginBox />
    </section>
  );
}
