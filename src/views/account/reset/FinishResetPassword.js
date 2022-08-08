import { useSearchParams, Navigate } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';

// components
import Page from '../../../components/Page';
import LanguagePopover from '../../../components/LanguagePopover';

// sections
import { FinishResetForm } from '../../../sections/account/reset';

// hooks
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default () => {
  const { t } = useLocales();

  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');

  if (!key) return <Navigate to="/" />;

  return (
    <Page title={t('labels.resetPassword', null, 'toTitleCase')}>
      <RootStyle>
        <HeaderStyle>
          <LanguagePopover />
        </HeaderStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {t('labels.resetYourPassword')}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{t('labels.provideYourNewPasswordBelow')}</Typography>
              </Box>
            </Stack>

            <FinishResetForm resetKey={key} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};
