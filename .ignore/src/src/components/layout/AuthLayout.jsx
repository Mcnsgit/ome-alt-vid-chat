// src/layouts/AuthLayout.jsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // Redirect to video chat if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/app/video-chat" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <Outlet />
      </div>
    </div>
  );
}