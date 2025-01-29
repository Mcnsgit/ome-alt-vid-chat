import { motion } from 'framer-motion';
import { Particles } from '@tsparticles/react';

const FloatingAvatars = () => (
    <Particles
    options={{
        particles:{
            number: {value:30  },
            size: { value: 2 },
            move: { speed: 1 },
            links: { enable: false }
        }
    }}
    />
);

const Hero = () => (
    <section className="vh-100 gradient-bg position-relative">
        <div className="position-absolute w-100 h-100">
            <FloatingAvatars />
        </div>
        <motion.div
            initial={{ y: 50, opacity:0}}
            animate={{ y:0, opacity:1}}
            className='text-center position-relative text-white'
            >
                <h1 className='display-3 fw-bold poppins neon-text'>
                    Meet the World, One Chat at a time
                </h1>

                <motion.button
                whileHover={{ scale: 1.05}}
                whileTap={{ scale: 0.95}}
                className='btn btn-lg mt-4 text-white'
                style={{
                    background: 'var(--cyber-teal)',
                    boxShadow: '0 0 20px rgba(0, 245, 212,0.5)'
                }}
                >
                    Start Chatting Now
                </motion.button>
            </motion.div>
    </section>
    )


    export default Hero;