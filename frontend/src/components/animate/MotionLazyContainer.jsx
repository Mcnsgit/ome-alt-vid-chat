import PropTypes from 'prop-types';
import { LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------


const loadFeatures = () => import('./features.jsx').then((res) => res.default);

MotionLazyContainer.propTypes = {
  children: PropTypes.node
};

export default function MotionLazyContainer({ children }) {
  return (
    <LazyMotion strict features={loadFeatures}>
      {children}
    </LazyMotion>
  );
}
