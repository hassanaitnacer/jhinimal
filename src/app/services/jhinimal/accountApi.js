// apis
import baseApi from './baseApi';

// ----------------------------------------------------------------------

const accountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation({
      query: (data) => ({
        endpoint: '/api/account/reset-password/finish',
        method: 'POST',
        data,
      }),
    }),
    requestResetPassword: builder.mutation({
      query: (data) => ({
        endpoint: '/api/account/reset-password/init',
        method: 'POST',
        headers: {
          'content-type': 'text/plain',
        },
        data,
      }),
    }),
  }),
});

export const { useResetPasswordMutation, useRequestResetPasswordMutation } = accountApi;

export default accountApi;
