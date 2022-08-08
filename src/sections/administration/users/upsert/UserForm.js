// prop types
import PropTypes from 'prop-types';

// react
import { useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// hook form
import { useForm, Controller } from 'react-hook-form';

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, FormControlLabel, Switch } from '@mui/material';

// hooks
import useLocales from '../../../../hooks/useLocales';

// components
import Label from '../../../../components/Label';
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
  RHFAuthorityAutocompleteAsync,
  RHFLangKeyAutocompleteAsync,
} from '../../../../components/hook-form';

// apis
import { useAddUserMutation, useUpdateUserMutation } from '../../../../app/services/jhinimal/userApi';
import { useUploadMutation } from '../../../../app/services/imgbb/uploadApi';

// utils
import { fData } from '../../../../utils/formatNumber';
import { mapUserStatus } from '../../../../utils/dataMappers';
import { toCamelCase } from '../../../../utils/formatString';

// ----------------------------------------------------------------------

const UserForm = ({ isEdit, currentUser }) => {
  const { t } = useLocales();

  const navigate = useNavigate();

  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadMutation();
  const isUpserting = isAdding || isUpdating || isUploading;

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      imageUrl: currentUser?.imageUrl || '',
      activated: currentUser?.activated,
      email: currentUser?.email || '',
      langKey: currentUser?.langKey || null,
      login: currentUser?.login || '',
      authorities: currentUser?.authorities || [],
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue, control, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    } else if (!isEdit) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    if (data.imageUrl !== defaultValues.imageUrl) {
      const formData = new FormData();
      formData.set('image', data.imageUrl);

      const {
        data: { data: uploadData },
      } = await uploadImage(formData).unwrap();

      data.imageUrl = uploadData.url;
    }

    if (isEdit) {
      await updateUser(data).unwrap();
    } else {
      await addUser(data).unwrap();
    }

    navigate(-1);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'imageUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.activated ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {t(`labels.${toCamelCase(mapUserStatus(values.activated))}`, { context: 'male' })}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="imageUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    {t('labels.allowed', { context: 'female' })} *.jpeg, *.jpg, *.png, *.gif
                    <br />
                    {t('labels.maxSizeOf', { size: fData(3145728) })}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="activated"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {t('labels.banned', { context: 'male' })}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('texts.bannedUserCanNotSignIn')}
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              {/* First name */}
              <RHFTextField name="firstName" label={t('labels.firstName')} />

              {/* Last name */}
              <RHFTextField name="lastName" label={t('labels.lastName')} />

              {/* Username */}
              <RHFTextField name="login" label={t('labels.username')} />

              {/* Email */}
              <RHFTextField name="email" label={t('labels.email')} />

              {/* Authorities */}
              <RHFAuthorityAutocompleteAsync
                id="authorities"
                multiple
                name="authorities"
                label={t('labels.authority_other')}
              />

              {/* Lang key */}
              <RHFLangKeyAutocompleteAsync id="langKey" name="langKey" label={t('labels.language_one')} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton disabled={isUpserting} type="submit" variant="contained" loading={isUpserting}>
                {t(!isEdit ? 'labels.create' : 'labels.save')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

UserForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default UserForm;
