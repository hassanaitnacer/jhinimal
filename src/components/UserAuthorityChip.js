import PropTypes from 'prop-types';

// @mui
import { Chip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

// ----------------------------------------------------------------------

const ICONS = {
  user: PersonIcon,
  admin: AdminPanelSettingsIcon,
};

const UserAuthorityChip = ({ name, text, ...other }) => {
  const Icon = ICONS[name];

  return <Chip icon={<Icon />} size="small" label={text} sx={{ display: 'flex' }} {...other} />;
};

UserAuthorityChip.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)),
  text: PropTypes.string.isRequired,
};

export default UserAuthorityChip;
