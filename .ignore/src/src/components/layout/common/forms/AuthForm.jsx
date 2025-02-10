// src/components/common/forms/AuthForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from '../buttons/Button';

export default function AuthForm({ mode = 'login' }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
    const [login, setLogin] = useState(false);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        
        console.log("Attempting login with email:", formData.email);
    
        const configuration = {
          method: "post",
          url: "https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/login",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: formData,
        };
      
        axios(configuration)
          .then((result) => {
            console.log("Login response:", result.data);
            cookies.set("TOKEN", result.data.token, {
              path: "/",
              expires: new Date(result.data.expires)
            });
            setLogin(true);
            setError("");
            navigate("/profile");
          })
          .catch((error) => {
            setError(error.response?.data?.message || "Login failed");
          });
      };
    
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
      if (mode === 'login') {
        // Handle login
        // await login(data);
        navigate('/user/profile');
      } else {
        // Handle register
        // await register(data);
        navigate('/auth/login');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-2xl font-bold text-white text-center mb-8">
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </h1>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        name="email"
        required
        placeholder="Enter your email"
      />
      
      <Input
        label="Password"
        type="password"
        name="password"
        required
        placeholder="Enter your password"
      />
      
      {mode === 'register' && (
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm your password"
        />
      )}
      
      <Button 
        type="submit"
        isLoading={isLoading}
        className="w-full"
      >
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </Button>
      
      <p className="text-center text-gray-400">
        {mode === 'login' ? (
          <>
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/login')}
              className="text-indigo-400 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </form>
  );
}

AuthForm.propTypes = {
  mode: PropTypes.oneOf(['login', 'register'])
};