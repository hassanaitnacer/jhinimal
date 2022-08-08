import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// yup
import * as Yup from 'yup';

// hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { Stack, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useLocales from '../../../hooks/useLocales';

// components
import { FormProvider, RHFTextField, RHFCheckbox, RHFPasswordField } from '../../../components/hook-form';

// utils
import { setSession } from '../../../utils/jwt';

// apis
import { useSignInMutation } from '../../../app/services/jhinimal/authApi';
import { useGetCurrentUserMutation } from '../../../app/services/jhinimal/userApi';

// routes
import { PATH_ACCOUNT } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default () => {
  // mounted ref
  const isMountedRef = useIsMountedRef();

  const { t } = useLocales();

  // mutation
  const [signIn, { isLoading: isSigningIn, isError }] = useSignInMutation();
  const [getCurrentUser, { isLoading: isGettingCurrentUser }] = useGetCurrentUserMutation();
  const isLoading = isSigningIn || isGettingCurrentUser;

  // create a login yup schema
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  // default form values
  const defaultValues = {
    username: '',
    password: '',
    rememberMe: false,
  };

  // use from with a resolver and default values
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  /**
   * Handle on form submit.
   * @param {*} credentials
   */
  const onSubmit = async (credentials) => {
    const { data } = await signIn(credentials).unwrap();

    if (credentials.rememberMe) {
      setSession(data.id_token);
    }

    await getCurrentUser().unwrap();
  };

  useEffect(() => {
    if (isError && isMountedRef.current) {
      reset();
    }
  }, [isError, reset, isMountedRef]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Username */}
        <RHFTextField name="username" label={t('labels.username')} />

        {/* Password */}
        <RHFPasswordField name="password" label={t('labels.password')} />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="rememberMe" label={t('labels.rememberMe')} />
        <Link component={RouterLink} variant="subtitle2" to={PATH_ACCOUNT.reset.request}>
          {t('labels.forgotYourPasswordQuestion')}
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
        {t('labels.signIn')}
      </LoadingButton>
    </FormProvider>
  );
};
