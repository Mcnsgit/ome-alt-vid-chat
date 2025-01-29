import { OverlayTrigger, Tooltip, Offcanvas } from 'react-bootstrap';
import { motion } from 'framer-motion';
//import Lottie from 'react-lottie';
//import animationData from './animations/chat-bubble.json';
import {useState} from 'react';
import PropTypes, { string } from 'prop-types'

const ChatBubble = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="d-flex align-items-center gap-3 my-2"
  >
    <div 
      className="p-3 rounded-4"
      style={{
        background: 'linear-gradient(135deg, #8A2BE2, #FF6B6B)',
        maxWidth: '70%'
      }}
    >
      <p className="mb-0 text-white">{message}</p>
    </div>
  </motion.div>
);

const ChatInterface = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="position-fixed bottom-0 end-0 m-3">
      <button
        onClick={() => setShowChat(!showChat)}
        className="btn btn-lg rounded-circle"
        style={{ background: 'var(--cyber-teal)' }}
      >
        💬
      </button>

      <Offcanvas show={showChat} onHide={() => setShowChat(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Live Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatBubble message="Hey there! 👋" />
          <ChatBubble message="Want to talk about React?" />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

ChatBubble.PropTypes = {
    message: string,
}
export default ChatInterface