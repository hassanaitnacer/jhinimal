import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

// hooks
import useAuth from '../hooks/useAuth';

// routes
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

const AuthGuard = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={PATH_AUTH.signIn} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
