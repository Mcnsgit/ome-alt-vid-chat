import  { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    setError("");

    // set configurations
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
        setRegister(true);
        console.log(result);
        setError("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setRegister(false);
        setError(error.response?.data?.message || "Registration failed");
      });
  };

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
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
          Register
        </Button>

        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
        {error && <p className="text-danger">{error}</p>}
      </Form>
    </>
  );
}

//import { useState } from 'react';
//import { motion } from 'framer-motion';
//import { Form, Button } from 'react-bootstrap';
//import { Mail, Lock, User, UserPlus } from 'lucide-react';
//import PropTypes from 'prop-types';
//import { useAuth } from '../../hooks/useAuth';
//import AuthButton from '../layout/common/buttons/AuthButton';
//import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
//import { ArrowLeft } from 'lucide-react';

//export function Register() {
//  //initial state
//  const [email, setEmail] = useState();
//  const [password, setPassword] = useState("");
//  const [register, setRegister] = useState(false);
  

//  const navigate = useNavigate();
//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    const configuration = {
//      method: "post",
//      url: `https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/register || http://localhost:3000/register`,
//      data: {
//        email,
//        password,
//      },
//    };

//    //make api call
//    axios(configuration)
//      .then((result) => {
//        setRegister(true);
//      })
//      .catch((error) => {
//        error = new Error();
//      });
//  };


//  return (
//    <motion.div
//      initial={{ opacity: 0, y: 20 }}
//      animate={{ opacity: 1, y: 0 }}
//      className="auth-card"
//    >
//      <div className="auth-header">
//        <h2 className="neon-text">Create Account</h2>
//        <p className="text-accent">Join our secure community</p>
//      </div>
//      <motion.button
//          whileHover={{ scale: 1.05 }}
//          onClick={() => navigate("/")}
//          className="btn btn-link text-teal poppins mb-5"
//        >
//          <ArrowLeft size={20} className="me-2" />
//          Back to Home
//        </motion.button>
//      <Form onSubmit={(e) => handleSubmit(e)}>
//        {/* email */}
//        <Form.Group controlId="formBasicEmail">
//          <Form.Label>Email address</Form.Label>
//          <Form.Control
//            type="email"
//            name="email"
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//            placeholder="Enter email"
//          />
//        </Form.Group>

//        {/* password */}
//        <Form.Group controlId="formBasicPassword">
//          <Form.Label>Password</Form.Label>
//          <Form.Control
//            type="password"
//            name="password"
//            value={password}
//            onChange={(e) => setPassword(e.target.value)}
//            placeholder="Password"
//          />
//        </Form.Group>

//        {/* submit button */}
//        <Button
//          variant="primary"
//          type="submit"
//          onClick={(e) => handleSubmit(e)}
//        >
//          Register
//        </Button>

//        {/* display success message */}
//        {register ? (
//          <p className="text-success">You Are Registered Successfully</p>
//        ) : (
//          <p className="text-danger">You Are Not Registered</p>
//        )}
//      </Form>
//    </motion.div>
//  );
//};



//export default Register;