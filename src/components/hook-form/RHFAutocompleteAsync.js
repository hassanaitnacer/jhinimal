// props
import PropTypes from 'prop-types';

// react
import { useState } from 'react';

// form
import { useFormContext, Controller } from 'react-hook-form';

// @mui
import { TextField, Autocomplete, CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

const RHFAutocompleteAsync = ({ name, label, loading, ...other }) => {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error;
        const message = error?.message;

        return (
          <Autocomplete
            {...field}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event, data) => field.onChange(data)}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                fullWidth
                SelectProps={{ native: true }}
                error={checkError}
                helperText={message}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
};

RHFAutocompleteAsync.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  loading: PropTypes.bool,
};

export default RHFAutocompleteAsync;
