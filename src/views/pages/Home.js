// @mui
import { Container, Typography } from '@mui/material';

// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

export default () => {
  const { themeStretch } = useSettings();

  const { t } = useLocales();

  return (
    <Page title={t('labels.home', null, 'toTitleCase')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" paragraph>
          {t('labels.home')}
        </Typography>
        <Typography gutterBottom>{t('texts.foolProgrammersQuote')}</Typography>
      </Container>
    </Page>
  );
};
