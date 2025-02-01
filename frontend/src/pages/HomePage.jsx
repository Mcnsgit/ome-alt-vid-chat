//import { Col, Row } from "react-bootstrap";
import Login from "../components/Auth/LoginForm";
import Register from "../components/Auth/RegisterForm";

import { Col, Row, Container, Offcanvas } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Video, Settings, Shield, Zap } from "react-feather";
import Landing from "../components/layout/Landing";

// ====== Enhanced Auth Components ======
const CyberButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="btn btn-lg rounded-pill px-4 cyber-gradient"
    onClick={onClick}
  >
    <Zap size={18} className="me-2" />
    {children}
  </motion.button>
);

 const HomePage = ({ type }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add auth logic here
  };

  return (
    
      <Landing />
    
    
  );
};

export default HomePage;