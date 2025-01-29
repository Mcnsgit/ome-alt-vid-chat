import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import App from './App.jsx'
import  Register from './components/Auth/RegisterForm.jsx';
import  LoginForm from './components/Auth/LoginForm.jsx';
import  ProfileForm  from './components/Profile/ProfileForm.jsx';
import  ChatInterface  from './components/Chat/ChatInterface.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Home" element-={<App />} />
      <Route path="/signin" element={<LoginForm type="signin"/>}/>
      <Route path="/register" element={<Register type="register"/>}/>
      <Route path="/profileForm" element={<ProfileForm type="profileForm" />}/>
      <Route path="/chat" element={<ChatInterface />} />
      </Routes>

    </Router>
  </StrictMode>,
)
