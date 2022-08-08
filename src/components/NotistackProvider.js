// props
import PropTypes from 'prop-types';

// provider
import { SnackbarProvider } from 'notistack';

// @mui
import { alpha } from '@mui/material/styles';
import { Box } from '@mui/material';

// components
import Iconify from './Iconify';
import { BasicSnackbar } from './notistack';

// ----------------------------------------------------------------------

const SnackbarIcon = ({ icon, color }) => (
  <Box
    component="span"
    sx={{
      mr: 1.5,
      width: 40,
      height: 40,
      display: 'flex',
      borderRadius: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      color: `${color}.main`,
      bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
      margin: ({ direction }) => (direction === 'ltr' ? '0 12px 0 0' : '0 0 0 12px'),
    }}
  >
    <Iconify icon={icon} width={24} height={24} />
  </Box>
);

SnackbarIcon.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
};

// ----------------------------------------------------------------------

const NotistackProvider = ({ children }) => (
  <SnackbarProvider
    dense
    maxSnack={5}
    preventDuplicate
    autoHideDuration={3000}
    variant="default"
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    iconVariant={{
      info: <SnackbarIcon icon={'eva:info-fill'} color="info" />,
      success: <SnackbarIcon icon={'eva:checkmark-circle-2-fill'} color="success" />,
      warning: <SnackbarIcon icon={'eva:alert-triangle-fill'} color="warning" />,
      error: <SnackbarIcon icon={'eva:alert-circle-fill'} color="error" />,
    }}
    Components={{
      default: BasicSnackbar,
      info: BasicSnackbar,
      success: BasicSnackbar,
      warning: BasicSnackbar,
      error: BasicSnackbar,
    }}
  >
    {children}
  </SnackbarProvider>
);

NotistackProvider.propTypes = {
  children: PropTypes.node,
};

export default NotistackProvider;
