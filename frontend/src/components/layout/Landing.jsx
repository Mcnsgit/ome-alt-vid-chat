// components/layout/Landing.jsx
import { Particles } from '@tsparticles/react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Video } from "lucide-react";
import GenderSelectionDropdown from './genderSlectionDropwdown';
import InterestInputBox from './common/input/interestsInputbox';
//import AuthButton from './common/buttons/AuthButton';

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
    const navigate = useNavigate();
  
    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>   
            <FloatingAvatars />
            <h1 className="text-white">Welcome to Our Dating App</h1>
            <p className="text-white">Connect with people of the same gender and find your true love.</p>
            <GenderSelectionDropdown />
            <InterestInputBox />
                    <Button variant="link" size="lg" onClick={() => navigate("/video-chat")}>
                        Start Chatting
                    </Button>
                <Video size={20} />
                Start Video Chat Now

        </Container>
    );
};

export default Hero;