// src/components/common/buttons/Button.jsx
//import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';
import { Button } from 'react-bootstrap';


const variants = {
  primary: 'bg-indigo-600 hover:bg-indigo-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  danger: 'bg-red-600 hover:bg-red-700',
  success: 'bg-green-600 hover:bg-green-700'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

export default function ButtonOp({ 
  children, 
  variant = 'primary', 
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
  ...props 
}) {
  return (
    <Button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative rounded-lg font-medium text-white transition-colors
        flex items-center justify-center
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}

ButtonOp.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};