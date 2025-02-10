// src/AppRouter.jsx
import { Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import ProtectedRoute from './ProtectedRoutes.jsx';
import { VideoChatProvider } from '../context/VideoContext.jsx';

// Page imports
import LoginPage from '../Pages/auth/LoginPage';
import NotFoundPAge from '../Pages/404ErrorPage.jsx';
import RegisterPage from '../Pages/auth/RegisterPage';
import HomePage from '../Pages/HomePage';
import AboutPage from '../Pages/AboutPage';
import VideoChatPage from '../Pages/videoChat/VideoChatPage';
import ProfilePage from '../Pages/user/ProfilePage';
import SettingsPage from '../Pages/user/SettingsPage';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
  </div>
);

// Wrap VideoChatPage with VideoChatProvider
const VideoChatWrapper = () => (
  <VideoChatProvider>
    <VideoChatPage />
  </VideoChatProvider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="video-chat" element={<VideoChatWrapper />} />
      <Route path="*" element={<NotFoundPAge />} />
    </Route>
  )
);

function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

export default AppRouter;