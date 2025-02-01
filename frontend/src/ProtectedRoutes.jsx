// ProtectedRoutes.jsx
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ProtectedRoutes() {
  const token = cookies.get("TOKEN");
  
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;