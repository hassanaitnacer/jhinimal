import PropTypes from 'prop-types';
import { LazyMotion } from 'framer-motion';

// ----------------------------------------------------------------------

// eslint-disable-next-line import/extensions
const loadFeatures = () => import('./features.js').then((res) => res.default);

const MotionLazyContainer = ({ children }) => (
  <LazyMotion strict features={loadFeatures}>
    {children}
  </LazyMotion>
);

MotionLazyContainer.propTypes = {
  children: PropTypes.node,
};

export default MotionLazyContainer;
