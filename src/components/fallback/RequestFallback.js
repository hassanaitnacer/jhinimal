import PropTypes from 'prop-types';

// @mui
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// hooks
import useLocales from '../../hooks/useLocales';

// components
import { EmptyFolderIllustration } from '../../assets';

// ----------------------------------------------------------------------

const RequestFallbackContent = ({ title, description }) => (
  <Container>
    <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
      <EmptyFolderIllustration height="150px" />
      <Typography sx={{ mt: 3 }} gutterBottom align="center" variant="subtitle1">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2" align="center">
        {description}
      </Typography>
    </Box>
  </Container>
);

RequestFallbackContent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// ----------------------------------------------------------------------

const CenterStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const MESSAGES = {
  404: {
    title: 'http.fallback.404.title',
    description: 'http.fallback.404.description',
  },
  '4xx': {
    title: 'http.fallback.4xx.title',
    description: 'http.fallback.4xx.description',
  },
  '5xx': {
    title: 'http.fallback.5xx.title',
    description: 'http.fallback.5xx.description',
  },
};

const RequestFallback = ({ status, isBusy, children, centered = false }) => {
  const { t } = useLocales();

  let contentProps;

  if (isBusy) return null;

  if (status === 404) contentProps = MESSAGES['404'];
  else if (status >= 400 && status <= 499) contentProps = MESSAGES['4xx'];
  else if (status >= 500 && status <= 599) contentProps = MESSAGES['5xx'];

  if (contentProps) {
    if (centered)
      return (
        <CenterStyle>
          <RequestFallbackContent title={t(contentProps.title)} description={t(contentProps.description)} />
        </CenterStyle>
      );

    return <RequestFallbackContent title={t(contentProps.title)} description={t(contentProps.description)} />;
  }

  return <>{children}</>;
};

RequestFallback.propTypes = {
  status: PropTypes.number,
  isBusy: PropTypes.bool.isRequired,
  children: PropTypes.node,
  centered: PropTypes.bool,
};

export default RequestFallback;
