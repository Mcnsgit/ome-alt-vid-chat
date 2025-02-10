import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Save, UserCircle } from "lucide-react";
import { Particles } from '@tsparticles/react';
import ReactConfetti from 'react-confetti';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_URL = 'https://video-chat-app-auth-8e4fccddfb7f.herokuapp.com/profile';

export function ProfileForm() {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState({
    displayName: '',
    interests: '',
    preferredLanguage: 'english',
    gender: 'any',
    location: '',
    bio: ''
  });

  const token = cookies.get('TOKEN'); // Directly use the token

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [token, navigate]);
  
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(API_URL, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        setConfetti(true);
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formFields = [
    { 
      label: "Display Name", 
      name: "displayName", 
      type: "text", 
      placeholder: "Anonymous User",
      required: true
    },
    { 
      label: "Interests", 
      name: "interests", 
      type: "text", 
      placeholder: "Gaming, Music, Tech" 
    },
    { 
      label: "Preferred Language", 
      name: "preferredLanguage", 
      type: "select", 
      options: ["English", "Spanish", "French"] 
    },
    { 
      label: "Gender", 
      name: "gender", 
      type: "select", 
      options: ["Any", "Male", "Female", "Other"] 
    },
    { 
      label: "Location", 
      name: "location", 
      type: "text", 
      placeholder: "City, Country" 
    },
    { 
      label: "Bio", 
      name: "bio", 
      type: "textarea", 
      placeholder: "Tell us about yourself..." 
    }
  ];

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
          <div className="d-flex align-items-center mb-4">
            <UserCircle size={40} className="text-teal me-3" />
            <div>
              <h2 className="poppins fw-bold text-teal mb-1 neon-text">
                Profile Setup
              </h2>
              <p className="text-light-50 mb-0">Customize your chat experience</p>
            </div>
          </div>
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="gap-3 d-flex flex-column">
            {formFields.map((field) => (
              <div key={field.name} className="mb-3">
                <label className="text-light inter mb-2">
                  {field.label}
                  {field.required && <span className="text-danger">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    className="form-control bg-gray-800 text-light border-dark"
                  >
                    {field.options.map(opt => (
                      <option key={opt} value={opt.toLowerCase()}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    className="form-control bg-gray-800 text-light border-dark"
                    placeholder={field.placeholder}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    className="form-control bg-gray-800 text-light border-dark"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="poppins btn-lg gradient-teal border-0 mt-4 d-flex align-items-center justify-content-center gap-2"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Profile & Continue
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.main>
  );
}

export default ProfileForm;