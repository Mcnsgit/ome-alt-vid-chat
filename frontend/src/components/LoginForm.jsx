import { useState } from 'react';
import { useAuth } from './AuthProvider';
import EmailForm from './EmailForm';
import InterestSelector from './InterestSelector';
import GoogleIcon from './GoogleIcon';

// components/LoginForm.js
export default function LoginForm() {
  const { login } = useAuth();
  const [method, setMethod] = useState('anonymous');

  return (
    <div className="auth-container">
      <button onClick={() => login('google')}>
        <GoogleIcon /> Continue with Google
      </button>
      
      <div className="divider">OR</div>
      
      <select onChange={(e) => setMethod(e.target.value)}>
        <option value="anonymous">Try as Guest</option>
        <option value="email">Email Login</option>
      </select>

      {method === 'email' && (
        <EmailForm onSubmit={(data) => login('email', data)} />
      )}

      {method === 'anonymous' && (
        <InterestSelector onSubmit={(interests) => 
          login('anonymous', { interests })} 
        />
      )}
    </div>
  );
}