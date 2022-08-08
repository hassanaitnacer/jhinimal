import PropTypes from 'prop-types';
import { useEffect } from 'react';

// yup
import * as Yup from 'yup';

// hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useLocales from '../../../hooks/useLocales';

// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// apis
import { useRequestResetPasswordMutation } from '../../../app/services/jhinimal/accountApi';

// ----------------------------------------------------------------------

const RequestResetForm = ({ onSuccess }) => {
  // mounted ref
  const isMountedRef = useIsMountedRef();

  const { t } = useLocales();

  // mutation
  const [requestResetPassword, { isLoading, isError }] = useRequestResetPasswordMutation();

  // create a request reset password yup schema
  const RequestResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required(t('validation.required')).email(t('validation.email')),
  });

  // default form values
  const defaultValues = {
    email: '',
  };

  // use from with a resolver and default values
  const methods = useForm({
    resolver: yupResolver(RequestResetPasswordSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  /**
   * Handle on form submit.
   * @param {*} credentials
   */
  const onSubmit = async ({ email }) => {
    await requestResetPassword(email);
    onSuccess(email);
  };

  useEffect(() => {
    if (isError && isMountedRef.current) {
      reset();
    }
  }, [isError, reset, isMountedRef]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mb: 3 }}>
        {/* Email */}
        <RHFTextField name="email" label={t('labels.email')} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        {t('labels.send')}
      </LoadingButton>
    </FormProvider>
  );
};

RequestResetForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default RequestResetForm;
