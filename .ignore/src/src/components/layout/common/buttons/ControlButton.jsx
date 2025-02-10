// src/components/common/ControlButton.jsx
import PropTypes from 'prop-types';

const ControlButton = ({ 
  icon, 
  onClick, 
  active, 
  tooltip,
  className = '',
  disabled = false 
}) => {
  const baseClasses = `
    p-4 rounded-full text-white
    transition-all duration-200
    flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const activeClasses = active
    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
    : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500';

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          ${baseClasses}
          ${activeClasses}
          ${className}
        `}
        type="button"
        aria-label={tooltip}
      >
        <span className="material-icons">{icon}</span>
      </button>
      
      {tooltip && (
        <div className="
          absolute -top-10 left-1/2 transform -translate-x-1/2
          px-2 py-1 bg-black bg-opacity-75 text-white text-sm
          rounded whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
        ">
          {tooltip}
        </div>
      )}
    </div>
  );
};

ControlButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default ControlButton;