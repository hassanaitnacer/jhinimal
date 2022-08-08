// react
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// routes
import Router from './routes';

// components
import ThemeProvider from './theme';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import RequestFallback from './components/fallback/RequestFallback';

// redux
import { useGetCurrentUserMutation } from './app/services/jhinimal/userApi';
import { setToken } from './app/slices/auth';

// utils
import { getSession } from './utils/jwt';

// ----------------------------------------------------------------------

export default () => {
  const dispatch = useDispatch();
  const [getCurrentUser, { isUninitialized, isLoading, error, data }] = useGetCurrentUserMutation();

  const token = getSession();

  const loadCurrentUser = useCallback(async () => {
    if (token) {
      await getCurrentUser().unwrap();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(setToken({ token }));
      loadCurrentUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <NotistackProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <MotionLazyContainer>
                <RequestFallback
                  status={data?.status || error?.status}
                  isBusy={!!(token && (isUninitialized || isLoading))}
                  centered
                >
                  <ProgressBarStyle />

                  <ScrollToTop />
                  <Router />
                </RequestFallback>
              </MotionLazyContainer>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </NotistackProvider>
    </ThemeProvider>
  );
};
