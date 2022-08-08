import { m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';

// components
import Page from '../../components/Page';
import { MotionContainer, varBounce } from '../../components/animate';

// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default () => {
  const { t } = useLocales();

  const navigate = useNavigate();

  return (
    <Page title={t('labels.pageNotFound', null, 'toTitleCase')} sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                {t('texts.sorryPageNotFound')}
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>{t('texts.sorryWeCouldNotFindPage')}</Typography>

            <Button
              onClick={() => {
                navigate(-1);
              }}
              sx={{ mt: { xs: 5, sm: 10 } }}
              size="large"
              variant="contained"
            >
              {t('labels.goBackToPreviousPage')}
            </Button>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
};
