// props
import PropTypes from 'prop-types';

// react
import { forwardRef, useCallback } from 'react';

// @mui
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Typography, Card, CardActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// notistack
import { useSnackbar, SnackbarContent } from 'notistack';

// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  card: ({ palette, shape }) => ({
    width: '100%',
    backgroundColor: palette.grey[palette.mode === 'light' ? 0 : 800],
    color: palette.grey[palette.mode === 'light' ? 900 : 0],
    borderRadius: shape.borderRadius,
  }),
  typography: ({ typography }) => ({
    fontWeight: typography.fontWeightMedium,
    flex: 1,
  }),
  actionRoot: {
    padding: '8px',
    justifyContent: 'space-between',
  },
  expand: ({ palette, direction }) => ({
    padding: '8px 8px',
    transform: 'rotate(0deg)',
    transition: 'all .2s',
    color: palette.grey[palette.mode === 'light' ? 900 : 0],
    margin: direction === 'rtl' ? '0 12px 0 0' : '0 0 0 12px',
  }),
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const BasicSnackbar = forwardRef(({ id, variant, ...props }, ref) => {
  const { t } = useLocales();

  const theme = useTheme();
  const classes = useStyles(theme);

  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          {props.iconVariant[variant] && props.iconVariant[variant]}
          <Typography variant="body2" className={classes.typography}>
            {t(props.message)}
          </Typography>
          <div>
            <IconButton size="small" className={classes.expand} onClick={handleDismiss}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
});

BasicSnackbar.displayName = 'BasicSnackbar';

BasicSnackbar.propTypes = {
  id: PropTypes.number.isRequired,
  variant: PropTypes.string.isRequired,
  iconVariant: PropTypes.shape({
    info: PropTypes.element,
    success: PropTypes.element,
    warning: PropTypes.element,
    error: PropTypes.element,
  }),
  message: PropTypes.string.isRequired,
};

export default BasicSnackbar;
