// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, VStack } from 'rsuite';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

const NAVIGATION_CONFIG = {
  public: [
    { label: "Home", key: "home", path: "/" },
    { label: "About", key: "about", path: "/about" },
    { label: "Video Chat", key: "video-chat", path: "/video-chat" },
    { label: "Login", key: "login", path: "/login" },
    { label: "Register", key: "register", path: "/register" }
  ],
  authenticated: [
    { label: "Home", key: "home", path: "/" },
    { label: "About", key: "about", path: "/about" },
    { label: "Video Chat", key: "video-chat", path: "/video-chat" },
    { label: "Profile", key: "profile", path: "/profile" },
    { label: "Settings", key: "settings", path: "/settings" },
    { label: "Logout", key: "logout", path: "/logout" }
  ]
};

export const Navbar = ({ active, onSelect, ...props }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [currentKey, setCurrentKey] = useState(active || 'home');

  const handleNavigation = (eventKey) => {
    setCurrentKey(eventKey);
    
    if (eventKey === 'logout') {
      logout();
      navigate('/login');
      return;
    }

    const navItems = isAuthenticated 
      ? NAVIGATION_CONFIG.authenticated 
      : NAVIGATION_CONFIG.public;

    const navItem = navItems.find(item => item.key === eventKey);
    if (navItem) {
      navigate(navItem.path);
    }

    // Call parent onSelect if provided
    onSelect?.(eventKey);
  };

  const navItems = isAuthenticated 
    ? NAVIGATION_CONFIG.authenticated 
    : NAVIGATION_CONFIG.public;

  return (
    <div className="fixed top-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <VStack spacing={20} align="center">
        <Nav 
          {...props} 
          activeKey={currentKey} 
          onSelect={handleNavigation}
          appearance="subtle"
          className="p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {navItems.map(item => (
              <Nav.Item
                key={item.key}
                eventKey={item.key}
                className={`
                  px-4 py-2 rounded-md transition-colors
                  hover:bg-gray-800
                  ${currentKey === item.key ? 'bg-gray-800 text-blue-400' : 'text-gray-300'}
                `}
              >
                {item.label}
              </Nav.Item>
            ))}
          </div>

          {isAuthenticated && (
            <div className="flex items-center text-sm text-gray-300">
              <span className="mr-4">Welcome, {user?.name || 'User'}</span>
            </div>
          )}
        </Nav>
      </VStack>
    </div>
  );
};

Navbar.propTypes = {
  active: PropTypes.string,
  onSelect: PropTypes.func
};
export default Navbar;