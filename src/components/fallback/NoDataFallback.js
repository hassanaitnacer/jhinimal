// props
import PropTypes from 'prop-types';

// @mui
import { Box, Typography, Container } from '@mui/material';

// components
import { EmptyFolderIllustration } from '../../assets';

// ----------------------------------------------------------------------

const NoDataFallback = ({ title, description }) => (
  <Container>
    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
      <EmptyFolderIllustration height="125px" />
      <Typography sx={{ mt: 3 }} gutterBottom align="center" variant="subtitle1">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2" align="center">
        {description}
      </Typography>
    </Box>
  </Container>
);

NoDataFallback.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default NoDataFallback;
