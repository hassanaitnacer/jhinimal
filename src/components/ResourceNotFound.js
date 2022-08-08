// prop type
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const ResourceNotFound = ({ title, message, titleEnd = '!', messageEnd = '.' }) => (
    <Box>
        <Typography gutterBottom align="center" variant="subtitle1">
            {title}
            {titleEnd}
        </Typography>
        <Typography variant="body2" align="center">
            {message}
            {messageEnd}
        </Typography>
    </Box>
);

ResourceNotFound.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    titleEnd: PropTypes.string,
    messageEnd: PropTypes.string
};

export default ResourceNotFound;
