// redux toolkit
import { createApi } from '@reduxjs/toolkit/query/react';

// base queries
import axiosBaseQuery from './axiosBaseQuery';

// ----------------------------------------------------------------------

export default createApi({
  reducerPath: 'jhinimal',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_JHINIMAL_HOST,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const { token } = getState().auth;

      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      return headers;
    },
  }),
  tagTypes: ['Users', 'Authorities'],
  endpoints: () => ({}),
});
