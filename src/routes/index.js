// react
import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_ACCOUNT, PATH_ADMIN, PATH_AUTH, PATH_MAIN } from './paths';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen showLogoOverlay={!pathname.includes('/')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default () =>
  useRoutes([
    // Auth
    {
      path: PATH_AUTH.root,
      children: [
        {
          path: 'sign-in',
          element: (
            <GuestGuard>
              <SignIn />
            </GuestGuard>
          ),
        },
      ],
    },

    // Account
    {
      path: PATH_ACCOUNT.root,
      children: [
        {
          path: 'reset',
          children: [
            { element: <Navigate to={PATH_ACCOUNT.reset.request} replace />, index: true },
            {
              path: 'request',
              element: (
                <GuestGuard>
                  <RequestResetPassword />
                </GuestGuard>
              ),
            },
            {
              path: 'finish',
              element: (
                <GuestGuard>
                  <FinishResetPassword />
                </GuestGuard>
              ),
            },
          ],
        },
      ],
    },

    // Administration
    {
      path: PATH_ADMIN.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Administration />, index: true },
        {
          path: 'users',
          children: [
            { element: <UserList />, index: true },
            { path: 'create', element: <UserUpsert /> },
            { path: ':username/edit', element: <UserUpsert /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to={PATH_MAIN.notFound} replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [{ element: <Home />, index: true }],
    },
    { path: '*', element: <Navigate to={PATH_MAIN.notFound} replace /> },
  ]);

// IMPORT COMPONENTS

// Authentication
const SignIn = Loadable(lazy(() => import('../views/auth/sign-in/SignIn')));

// Account
const FinishResetPassword = Loadable(lazy(() => import('../views/account/reset/FinishResetPassword')));
const RequestResetPassword = Loadable(lazy(() => import('../views/account/reset/RequestResetPassword')));

// Main
const Home = Loadable(lazy(() => import('../views/pages/Home')));
const NotFound = Loadable(lazy(() => import('../views/pages/NotFound')));

// Administration
const Administration = Loadable(lazy(() => import('../views/administration')));
const UserList = Loadable(lazy(() => import('../views/administration/users/UserList')));
const UserUpsert = Loadable(lazy(() => import('../views/administration/users/UserUpsert')));
