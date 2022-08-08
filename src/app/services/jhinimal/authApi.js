import emptyApi from './baseApi';

// ----------------------------------------------------------------------

const authApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        endpoint: '/api/authenticate',
        method: 'POST',
        data: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;

export default authApi;
