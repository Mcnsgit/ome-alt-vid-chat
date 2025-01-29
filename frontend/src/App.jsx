import { useState } from 'react'
import { Container, Col, Row, Card , Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Video, UserCircle2, UserPlus } from "lucide-react";
import Hero from './components/layout/Landing';
import {motion } from 'framer-motion'
import AuthButton from './components/layout/common/buttons/AuthButton';
import LoginForm  from './components/Auth/LoginForm';
import './App.css'

// App Component
const App = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Container className="position-relative py-5">

      <Row className="justify-content-center mt-5">
        <div className="d-flex flex-column gap-3" style={{ maxWidth: '400px' }}>
        <Col>
          <AuthButton
            icon={Video}
            text="Continue Anonymously"
            variant="secondary"
            onClick={() => navigate("/profileForm")}
            />
          </Col>
          <Col>
          <AuthButton
            icon={UserCircle2}
            text="Sign In"
            variant="primary"
            onClick={() => navigate("/signin")}
            />
            </Col>
            <Col>
          <AuthButton
            icon={UserPlus}
            text="Create Account"
            variant="accent"
            onClick={() => navigate("/register")}
            />
            </Col>
        </div>
      </Row>
      
      {showLogin && (
        <LoginForm onToggleForm={() => setShowLogin(false)} />
      )}
    </Container>
  );
};

export default App;