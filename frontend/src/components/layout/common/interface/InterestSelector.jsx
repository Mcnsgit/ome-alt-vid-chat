import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';


const interests = [];


const InterestSelector = () => {
  const [selected, setSelected] = useState([]);
  const [confetti, setConfetti] = useState(false);

  const handleSelect = (interest) => {
    setSelected([...selected, interest]);
    if (selected.length % 3 === 0) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  return (
    <div className="position-relative">
      {confetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
      
      <div className="d-flex flex-wrap gap-2">
        {interests.map(interest => (
          <motion.button
            key={interest}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelect(interest)}
            className="btn rounded-pill"
            style={{
              background: selected.includes(interest) 
                ? 'var(--cyber-teal)' 
                : 'rgba(255,255,255,0.1)'
            }}
          >
            #{interest}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default InterestSelector