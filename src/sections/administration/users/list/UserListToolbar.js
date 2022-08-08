// prop types
import PropTypes from 'prop-types';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, InputAdornment } from '@mui/material';

// hooks
import useLocales from '../../../../hooks/useLocales';

// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

const UserListToolbar = ({ numSelected, filterTerm, onFilterTermChange, onDelete }) => {
  const { t } = useLocales();

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {t('labels.rowsSelected', { count: numSelected })}
        </Typography>
      ) : (
        <InputStyle
          stretchStart={240}
          value={filterTerm}
          onChange={onFilterTermChange}
          placeholder={`${t('labels.search')}...`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      )}

      {numSelected > 0 && (
        <Tooltip title={t('labels.delete')}>
          <IconButton onClick={onDelete}>
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
};

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterTerm: PropTypes.string,
  onFilterTermChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default UserListToolbar;
