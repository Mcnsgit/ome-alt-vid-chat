// hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    user: null,
    loading: false,
    error: null,
  });

  const navigate = useNavigate();

  const apiRequest = async (url, data) => {
    setAuthState({ ...authState, loading: true, error: null });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Authentication failed");
      }

      const result = await response.json();
      localStorage.setItem("authToken", result.token);
      setAuthState({ user: result.user, loading: false, error: null });
      navigate(result.user.isAnonymous ? "/profile" : "/dashboard");
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: error.message,
      });
    }
  };

  return { ...authState, apiRequest };
};
