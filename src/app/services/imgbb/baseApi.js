// redux toolkit
import { createApi } from '@reduxjs/toolkit/query/react';

// base queries
import axiosBaseQuery from './axiosBaseQuery';

// ----------------------------------------------------------------------

export default createApi({
  reducerPath: 'imgbb',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_IMGBB_HOST,
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
