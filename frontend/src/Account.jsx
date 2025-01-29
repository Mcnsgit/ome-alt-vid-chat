import { Col, Row } from "react-bootstrap";
import Login from "./components/Auth/LoginForm";
import Register from "./components/Auth/RegisterForm";

export default function Account() {
  return (
    <Row>
      {/* Register */}
      <Col xs={12} sm={12} md={6} lg={6}>
        <Register />
      </Col>

      {/* Login */}
      <Col xs={12} sm={12} md={6} lg={6}>
        <Login />
      </Col>
    </Row>
  );
}