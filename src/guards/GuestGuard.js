import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

const GuestGuard = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
