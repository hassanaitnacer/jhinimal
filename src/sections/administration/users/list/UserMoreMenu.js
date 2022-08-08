// prop types
import PropTypes from 'prop-types';

// react
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// @mui
import { MenuItem, IconButton } from '@mui/material';

// routes
import { PATH_ADMIN } from '../../../../routes/paths';

// components
import Iconify from '../../../../components/Iconify';
import MenuPopover from '../../../../components/MenuPopover';
import useLocales from '../../../../hooks/useLocales';

// ----------------------------------------------------------------------

const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};

// ----------------------------------------------------------------------

const UserMoreMenu = ({ onDelete, user }) => {
  const [open, setOpen] = useState(null);

  const { t } = useLocales();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={() => onDelete(user)} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {t('labels.delete')}
        </MenuItem>

        <MenuItem component={RouterLink} to={`${PATH_ADMIN.user.root}/${user.login}/edit`}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {t('labels.edit')}
        </MenuItem>
      </MenuPopover>
    </>
  );
};

UserMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  user: PropTypes.object,
};

export default UserMoreMenu;
