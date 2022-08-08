import PropTypes from 'prop-types';

// @mui
import { Tooltip } from '@mui/material';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ICONS = {
  activated: VerifiedOutlinedIcon,
  banned: NoAccountsIcon,
};

const UserStatusIcon = ({ name, text, ...other }) => {
  const { palette } = useTheme();

  const Icon = ICONS[name];

  return (
    <Tooltip
      sx={{
        color: palette.accountStatus[name],
        verticalAlign: 'middle',
      }}
      title={text}
      {...other}
    >
      <Icon fontSize="small" />
    </Tooltip>
  );
};

UserStatusIcon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)),
  text: PropTypes.string.isRequired,
};

export default UserStatusIcon;
