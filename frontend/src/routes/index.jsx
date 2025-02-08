import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";
import LoadingScreen from "../components/LoadingScreen";

const LINK = import.meta.env.VITE_APP_LINK_IP;

const Loadable = (Component) => {
  const LoadableComponent = (props) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`;

  return LoadableComponent;
};

export default function Router() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get(`https://${LINK}/`, {
          headers: {
            Authorization: accessToken ? "JWT " + accessToken : null,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        });

        if (response.data.user) {
          setUser(response.data.user);
          toast.info("Welcome " + response.data.user.username);
        }
      } catch (error) {
        console.error(`Something went wrong: ${error}`);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout isAuthenticated={user} />,
      children: [
        { element: <LoginPage />, path: "login" },
        { element: <RegisterPage />, path: "register" },
        { element: <ResetPasswordPage />, path: "reset-password" },
        { element: <NewPasswordPage />, path: "new-password" },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout user={user} />,
      children: [
        { path: "/", element: <RandomVideoPage user={user} /> },
        { path: "404", element: <Page404 /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(lazy(() => import("../pages/auth/ResetPassword")));
const NewPasswordPage = Loadable(lazy(() => import("../pages/auth/NewPassword")));
const RandomVideoPage = Loadable(lazy(() => import("../pages/videochat/RandomVideo")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));