import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography, Link } from '@mui/material';

// i18next
import { Trans } from 'react-i18next';

// components
import Page from '../../../components/Page';
import LanguagePopover from '../../../components/LanguagePopover';

// sections
import { RequestResetForm } from '../../../sections/account/reset';

// hooks
import useLocales from '../../../hooks/useLocales';

// apis
import { useRequestResetPasswordMutation } from '../../../app/services/jhinimal/accountApi';

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
  const [email, setEmail] = useState();

  const { t } = useLocales();

  // mutation
  const [requestResetPassword, { isLoading }] = useRequestResetPasswordMutation();

  const onLinkRequestedSuccess = (email) => {
    setEmail(email);
  };

  const handleResendLinkClick = async () => {
    await requestResetPassword(email);
  };

  return (
    <Page title={t('labels.resetPassword', null, 'toTitleCase')}>
      <RootStyle>
        <HeaderStyle>
          <LanguagePopover />
        </HeaderStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            {email ? (
              <Stack direction="row" alignItems="center">
                <Box sx={{ flexGrow: 1 }} textAlign="center">
                  <Typography variant="h4" gutterBottom>
                    {t('labels.checkYourInbox')}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    <Trans i18nKey="texts.ifYouHaveNotReceivedCheckSpamOrResend">
                      If you haven't received anything, please check spam or
                      <Link
                        sx={{ cursor: isLoading ? 'progress' : 'pointer' }}
                        variant="subtitle2"
                        underline="none"
                        onClick={handleResendLinkClick}
                      >
                        resend the link again.
                      </Link>
                    </Trans>
                  </Typography>
                </Box>
              </Stack>
            ) : (
              <>
                <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                  <Box sx={{ flexGrow: 1 }} textAlign="center">
                    <Typography variant="h4" gutterBottom>
                      {t('labels.forgotYourPasswordQuestion')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {t('texts.pleaseEnterEmailAssociatedWeWillEmailYou')}
                    </Typography>
                  </Box>
                </Stack>

                <RequestResetForm onSuccess={onLinkRequestedSuccess} />
              </>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};
