import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace={true} />;

  const id = jwtDecode(user)?.user_id;

  console.log(id);
  console.log(`${import.meta.env.VITE_ADMIN_ID}`);
  console.log(id == `${import.meta.env.VITE_ADMIN_ID}`);

  if (id == `${import.meta.env.VITE_ADMIN_ID}`) return children;


}
