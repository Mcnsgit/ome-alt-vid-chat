import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion"; 
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();


export default function Login() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    const configuration = {
      method: "post",
      url: "https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/register",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true,
      data: {
        email,
        password,
      },
    };
  
    axios(configuration)
      .then((result) => {
        cookies.set("TOKEN", result.data.token, {
          expires: result.data.expires,
          path: "/",
        });
        window.location.href = "/auth";
        setLogin(true);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLogin(false);
      });
  };
  
  //const handleLogout = (e) => { 
  //  e.preventDefault();
  //  cookies.remove("TOKEN", { path: "/" });
  //  window.location.href = "/auth";
  //}

  

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="btn btn-link text-teal poppins mb-5"
        >
          <ArrowLeft size={20} className="me-2" />
          Back to Home
        </motion.button>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
      </Form>
    </>
  );
}
//import { motion } from 'framer-motion';
//import { Form } from 'react-bootstrap';
//import { Mail, Lock, UserCircle2 } from 'lucide-react';
//import PropTypes from 'prop-types';
//import { useState } from 'react';
//import axios from 'axios';
//import Cookies from 'universal-cookie';
//import AuthButton from '../layout/common/buttons/AuthButton';

//const cookies = new Cookies();

//const LoginForm = ({ onToggleForm }) => {
//  const [formData, setFormData] = useState({ email: '', password: '' });
//  const [login, setLogin] = useState(false);
//  const [errors, setErrors] = useState({});

//  const handleSubmit = async (e) => {
//    e.preventDefault();
//    // Add your form validation and submission logic here
//    const configuration = {
//      method: "post",
//      url: "https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/login",
//      data: {
//        ...formData,
//      }
//    };

//    //make api call
//    axios(configuration)
//      .then((result) => {
//        //set the cookie
//        cookies.set("TOKEN", result.data.token, {
//          path: '/',
//        });
//        //redirect user to the aut page
//        window.location.href = '/auth';
        
//        setLogin(true);
//      })
//      .catch((error) => {
//        error = new Error();
//      });
//  };

//  return (
//    <motion.div
//      initial={{ opacity: 0, y: 20 }}
//      animate={{ opacity: 1, y: 0 }}
//      exit={{ opacity: 0, y: -20 }}
//      className="bg-dark rounded-4 p-4 shadow-lg mx-auto"
//      style={{ maxWidth: '500px' }}
//    >
//      <div className="text-center mb-4">
//        <h2 className="poppins text-white mb-3">Welcome Back</h2>
//      </div>

//      <Form className="gap-3 d-flex flex-column" onSubmit={handleSubmit}>
//        {[
//          { icon: Mail, type: 'email', placeholder: 'Email' },
//          { icon: Lock, type: 'password', placeholder: 'Password' }
//        ].map((field, i) => (
//          <motion.div
//            key={field.type}
//            initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
//            animate={{ x: 0, opacity: 1 }}
//            className="mb-3"
//          >
//            <Form.Label className="text-light inter d-flex gap-2">
//              <field.icon size={18} />
//              {field.placeholder}
//            </Form.Label>
//            <Form.Control
//              type={field.type}
//              className="bg-gray-800 border-dark text-light p-3"
//              onChange={(e) =>
//                setFormData((prev) => ({
//                  ...prev,
//                  [field.type]: e.target.value
//                }))
//              }
//              isInvalid={!!errors[field.type]}
//            />
//            <Form.Control.Feedback type="invalid">
//              {errors[field.type]}
//            </Form.Control.Feedback>
//          </motion.div>
//        ))}

//        <div className="d-flex justify-content-between align-items-center">
//          <AuthButton
//            icon={UserCircle2}
//            text="Sign In"
//            variant="primary"
//            onClick={(e) => handleSubmit(e)}
//          />
//        </div>
//            {/* display success message */}
//        {login ? (
//          <p className="text-success">You Are Logged in Successfully</p>
//        ) : (
//          <p className="text-danger">You Are Not Logged in</p>
//        )}

//        <div className="text-center mt-3">
//          <span className="text-light inter">New here? </span>
//          <button
//            onClick={onToggleForm}
//            className="btn btn-link text-teal poppins"
//          >
//            Create Account
//          </button>
//        </div>
//      </Form>
//    </motion.div>
//  );
//};

//LoginForm.propTypes = {
//  onToggleForm: PropTypes.func.isRequired
//};

//export default LoginForm;