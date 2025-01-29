import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ProtectedRoutes({ component: Component }) {
  const token = cookies.get("TOKEN");
  
  // If there's a token, render the component
  if (token) {
    return <Component />;
  }
  
  // If there's no token, redirect to the login page
  return <Navigate to="/" replace />;
}

ProtectedRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default ProtectedRoutes;