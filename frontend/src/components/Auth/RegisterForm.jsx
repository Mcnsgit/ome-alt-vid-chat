import  { useState } from "react";
import { Form, Button,Row, Col } from "react-bootstrap";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

export default function Register() {
  // initial state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    gender: "Any",
    interests: [],
    location: ""
  });
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Attempting registration with:", { formData });
  
    const configuration = {
      method: "post",
      url: "https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/register",
      headers: {
        'Content-Type': 'application/json',
      },
      data:
      formData
    };
  
    axios(configuration)
      .then((result) => {
        console.log("Registration successful:", result);
        setRegister(true);
      })
      .catch((error) => {
        console.error("Registration error:", error.response?.data || error);
        setRegister(false);
        setError(error.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div className="auth-card p-4 rounded shadow">
      <h2 className="mb-4">Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Interests (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., gaming, music, technology"
            onChange={(e) => setFormData({
              ...formData, 
              interests: e.target.value.split(',').map(i => i.trim())
            })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Create Account
        </Button>

        {register && (
          <div className="alert alert-success mt-3">
            Registration successful! Redirecting to login...
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
      </Form>
    </div>
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