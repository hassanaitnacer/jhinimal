// rtk
import { isRejected, isFulfilled } from '@reduxjs/toolkit';

// notistack
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export const rtkQueryNotifier = () => (next) => (action) => {
  if (action.meta?.arg.type === 'mutation' && action.payload?.meta.method !== 'get') {
    let variant;

    if (isFulfilled(action)) {
      variant = 'success';
    } else if (isRejected(action)) {
      variant = 'error';
    }

    if (variant) {
      let message;

      if (action?.payload?.status === 0) {
        message = 'texts.couldNotConnectMakeSureConnectedToInternet';
      } else {
        message = `http.${variant}.${action.meta.arg.endpointName}`;
      }

      if (message) {
        enqueueSnackbar(message, { variant });
      }
    }
  }

  return next(action);
};
