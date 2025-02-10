import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AuthButton = ({ icon: Icon, text, onClick, variant }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--cyber-teal)',
          boxShadow: '0 0 15px rgba(0,245,212,0.5)'
        };
      case 'secondary':
        return {
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)'
        };
      case 'accent':
        return {
          background: 'var(--neon-pink)',
          boxShadow: '0 0 15px rgba(255,107,107,0.5)'
        };
      default:
        return {};
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="inter btn btn-lg d-flex align-items-center justify-content-center gap-2 w-100 text-white"
      style={getButtonStyle()}
    >
      {Icon && <Icon size={20} />}
      {text}
    </motion.button>
  );
};

AuthButton.propTypes = {
  icon: PropTypes.elementType,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent']).isRequired
};

export default AuthButton;