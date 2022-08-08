import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
import { FormProvider, RHFPasswordField } from '../../../components/hook-form';

// apis
import { useResetPasswordMutation } from '../../../app/services/jhinimal/accountApi';

// routes
import { PATH_AUTH } from '../../../routes/paths';

// ----------------------------------------------------------------------

const FinishResetForm = ({ resetKey }) => {
  // mounted ref
  const isMountedRef = useIsMountedRef();

  const { t } = useLocales();

  const navigate = useNavigate();

  // mutation
  const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();

  // create a reset password yup schema
  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required(t('validation.required')),
    passwordConfirmation: Yup.string().required(t('validation.required')),
  });

  // default form values
  const defaultValues = {
    newPassword: '',
    passwordConfirmation: '',
  };

  // use from with a resolver and default values
  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError } = methods;

  /**
   * Handle on form submit.
   * @param {*} credentials
   */
  const onSubmit = async ({ newPassword, passwordConfirmation }) => {
    if (newPassword !== passwordConfirmation) {
      setError('passwordConfirmation', { message: t('validation.passwordsDoNotMatch') });
      return;
    }

    await resetPassword({
      key: resetKey,
      newPassword,
    });

    navigate(PATH_AUTH.signIn);
  };

  useEffect(() => {
    if (isError && isMountedRef.current) {
      reset();
    }
  }, [isError, reset, isMountedRef]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ mb: 3 }}>
        {/* Password */}
        <RHFPasswordField name="newPassword" label={t('labels.newPassword')} />

        {/* Password confirmation  */}
        <RHFPasswordField name="passwordConfirmation" label={t('labels.passwordConfirmation')} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        {t('labels.confirm')}
      </LoadingButton>
    </FormProvider>
  );
};

FinishResetForm.propTypes = {
  resetKey: PropTypes.string.isRequired,
};

export default FinishResetForm;
