import { Routes, Route, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useMemo } from "react";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfileForm from "./components/Profile/ProfileForm";
import io from 'socket.io-client';
import VideoChatInterface from "./components/Chat/VideoChatInterface"; // Add this import
import { Settings } from "lucide-react";

const SERVER = import.meta.env.VITE_APP_SERVER_URL || "https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/";

export default function App() {
  const socket = useMemo(() => io(SERVER, {
    transports: ['websocket'],
    upgrade: false
  }), []);

  return (
    <div className="cyber-app">
      <nav className="cyber-nav">
        <Link to="/" className="brand-logo neon-text">
          CHATR0N
        </Link>
        <div className="nav-links">
          <Link to="/settings" className="nav-link">
            <Settings size={18} />
          </Link>
          {/* Add more links as needed */}
        </div>
      </nav>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video-chat" element={<VideoChatInterface socket={socket} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<ProfileForm />} />
          </Route>
          {/* Add additional routes here */}
        </Routes>
      </Container>
    </div>
  );
}