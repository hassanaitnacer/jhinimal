import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
//
import { varFade } from './variants';

// ----------------------------------------------------------------------

const TextAnimate = ({ text, variants, sx, ...other }) => (
  <Box
    component={m.h1}
    sx={{
      typography: 'h1',
      overflow: 'hidden',
      display: 'inline-flex',
      ...sx,
    }}
    {...other}
  >
    {text.split('').map((letter, index) => (
      <m.span key={index} variants={variants || varFade().inUp}>
        {letter}
      </m.span>
    ))}
  </Box>
);

TextAnimate.propTypes = {
  text: PropTypes.string.isRequired,
  variants: PropTypes.object,
  sx: PropTypes.object,
};

export default TextAnimate;
