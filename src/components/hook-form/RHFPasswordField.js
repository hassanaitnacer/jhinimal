import PropTypes from 'prop-types';
// react
import { useState } from 'react';
// @mui
import { IconButton, InputAdornment } from '@mui/material';
//
import RHFTextField from './RHFTextField';
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

const RHFPasswordField = ({ name, label, ...other }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <RHFTextField
            name={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                    </InputAdornment>
                )
            }}
            {...other}
        />
    );
};

RHFPasswordField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string
};

export default RHFPasswordField;
