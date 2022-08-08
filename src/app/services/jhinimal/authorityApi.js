// apis
import baseApi from './baseApi';

// ----------------------------------------------------------------------

const authorityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthorities: builder.query({
      query: () => ({
        endpoint: '/api/authorities',
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Authorities', id })), { type: 'Authorities', id: 'PARTIAL-LIST' }]
          : [{ type: 'Authorities', id: 'PARTIAL-LIST' }],
    }),
  }),
});

export const { useGetAuthoritiesQuery } = authorityApi;

export default authorityApi;
