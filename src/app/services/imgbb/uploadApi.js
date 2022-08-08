// apis
import baseApi from './baseApi';

// ----------------------------------------------------------------------

const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (data) => ({
        endpoint: '/1/upload',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useUploadMutation } = uploadApi;

export default uploadApi;
