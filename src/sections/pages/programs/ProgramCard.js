// props
import PropTypes from 'prop-types';

// react
import { Link as RouterLink } from 'react-router-dom';

// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// components
import Label from '../../../components/Label';
import Image from '../../../components/Image';

// utils
import cssStyles from '../../../utils/cssStyles';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 0.5, color: theme.palette.primary.dark }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
  opacity: 0.75,
}));

// ----------------------------------------------------------------------

const ProgramCard = ({ program }) => {
  const theme = useTheme();

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Label
          variant="filled"
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            textTransform: 'uppercase',
            color: theme.palette.primary.dark,
          }}
        >
          {program.abbrev}
        </Label>
        <OverlayStyle />
        <Image alt={program.title} src={`data:${program.image_content_type};base64,${program.image}`} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" component={RouterLink}>
          <Typography variant="subtitle1" noWrap>
            {program.title}
          </Typography>
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {program.description}
        </Typography>
      </Stack>
    </Card>
  );
};

ProgramCard.propTypes = {
  program: PropTypes.object.isRequired,
};

export default ProgramCard;
