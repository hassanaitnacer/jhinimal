// react
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// @mui
import { Container } from '@mui/material';

// routes
import { PATH_ADMIN } from '../../../routes/paths';

// hooks
import useSettings from '../../../hooks/useSettings';
import useLocales from '../../../hooks/useLocales';

// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { RequestFallback } from '../../../components/fallback';

// sections
import { UserForm } from '../../../sections/administration/users/upsert';

// redux
import { useGetUserMutation } from '../../../app/services/jhinimal/userApi';

// ----------------------------------------------------------------------

export default () => {
  const [data, setData] = useState(null);

  const { username = null } = useParams();

  const isEdit = username !== null;
  const title = isEdit ? 'labels.editResource' : 'labels.newResource';

  const [getUser, { isLoading, isUninitialized, error }] = useGetUserMutation();

  const { t } = useLocales();

  const { themeStretch } = useSettings();

  useEffect(() => {
    (async () => {
      if (isEdit) {
        setData(await getUser(username).unwrap());
      }
    })();
  }, [isEdit, getUser, username]);

  return (
    <Page
      title={t(
        title,
        {
          resource: t('labels.user', { context: 'male', count: 1 }),
          context: 'male',
        },
        'toTitleCase'
      )}
    >
      <RequestFallback status={data?.status || error?.status} isBusy={isEdit && (isUninitialized || isLoading)}>
        {(!isEdit || data) && (
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading={t(
                title,
                {
                  resource: t('labels.user', { context: 'male', count: 1 }),
                  context: 'male',
                },
                'toSentenceCase'
              )}
              links={[
                { name: t('labels.administration_one'), href: PATH_ADMIN.root },
                { name: t('labels.user_other'), href: PATH_ADMIN.user.root },
                { name: !isEdit ? t('labels.create') : `@${data.data.login}` },
              ]}
            />
            <UserForm isEdit={isEdit} currentUser={data?.data} />
          </Container>
        )}
      </RequestFallback>
    </Page>
  );
};
