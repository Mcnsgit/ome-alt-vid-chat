import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import App from './App.jsx'
//import  Register from './components/Auth/RegisterForm.jsx';
//import  LoginForm from './components/Auth/LoginForm.jsx';
//import  ProfileForm  from './components/Profile/ProfileForm.jsx';
//import  ChatInterface  from './components/Chat/ChatInterface.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</StrictMode>,
)
