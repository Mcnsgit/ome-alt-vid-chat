// components/layout/Landing.jsx
import { Particles } from '@tsparticles/react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Add this back
import { Video } from "lucide-react";
import { motion } from 'framer-motion';
import GenderSelectionDropdown from './genderSlectionDropwdown';
import InterestInputBox from './common/input/interestsInputbox';

const FloatingAvatars = () => (
    <Particles
      options={{
        particles: {
          number: { value: 30 },
          size: { value: 2 },
          move: { speed: 1 },
          links: { enable: false }
        }
      }}
    />
);

export const Hero = () => {
    const navigate = useNavigate(); // Add this back
  
    return (
   <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
            <FloatingAvatars />
            <h1 className="text-white">Welcome to Our Dating App</h1>
            <p className="text-white">Connect with people of the same gender and find your true love.</p>
            <GenderSelectionDropdown />
            <InterestInputBox />
            
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/video-chat')}
                className="btn btn-lg d-flex align-items-center gap-2"
                style={{
                    background: 'var(--cyber-teal)',
                    boxShadow: '0 0 20px rgba(0, 245, 212, 0.5)'
                }}
            >
                <Video size={20} />
                Start Video Chat Now
            </motion.button>
</div>
    );
};

export default Hero;