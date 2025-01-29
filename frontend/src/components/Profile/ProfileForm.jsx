import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { Particles } from '@tsparticles/react';
import ReactConfetti from 'react-confetti';
import { useState } from 'react'

export function ProfileForm() {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState(false);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-vh-100 gradient-bg position-relative overflow-hidden"
    >
      {confetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
      <Particles
        options={{
          particles: {
            number: { value: 30 },
            size: { value: 2 },
            move: { speed: 1 },
            links: { enable: false }
          }
        }}
        className="position-absolute top-0 start-0 w-100 h-100"
      />

      <div className="position-relative container py-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="btn btn-link text-teal poppins mb-5"
        >
          <ArrowLeft size={20} className="me-2" />
          Back to Home
        </motion.button>

        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-dark rounded-4 p-4 shadow-lg glassmorphism-effect"
        >
          <h2 className="poppins fw-bold text-teal mb-4 neon-text">
            <ShieldAlert size={28} className="me-2" />
            Profile Setup
          </h2>

          <form className="gap-3 d-flex flex-column">
            {[
              { label: "Display Name", type: "text", placeholder: "Anonymous User" },
              { label: "Interests", type: "text", placeholder: "Gaming, Music, Tech" },
              { label: "Preferred Language", type: "select", options: ["English", "Spanish", "French"] }
            ].map((field, i) => (
              <div key={field.label}>
                <label className="text-light inter mb-2">{field.label}</label>
                {field.type === 'select' ? (
                  <select className="form-control bg-gray-800 text-light border-dark">
                    {field.options?.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="form-control bg-gray-800 text-light border-dark"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setConfetti(true);
                setTimeout(() => navigate("/chat"), 2000);
              }}
              className="poppins btn-lg gradient-teal border-0 mt-4"
            >
              Start Secure Chatting
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.main>
  );
}
export default ProfileForm