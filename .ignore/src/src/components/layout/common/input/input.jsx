// src/components/common/forms/Input.jsx
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  id,
  className = '',
  required = false,
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-200"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={id}
        className={`
          w-full rounded-lg bg-gray-700 border-gray-600
          text-white placeholder-gray-400
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          transition duration-200
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;