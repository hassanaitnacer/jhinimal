// query serializer
import qs from 'qs';

// apis
import baseApi from './baseApi';

// ----------------------------------------------------------------------

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params = null) => ({
        endpoint: '/api/admin/users',
        params,
        paramsSerializer: (params) => qs.stringify(params),
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: 'Users', id })), { type: 'Users', id: 'PARTIAL-LIST' }]
          : [{ type: 'Users', id: 'PARTIAL-LIST' }],
    }),

    getUser: builder.mutation({
      query: (username) => ({
        endpoint: `/api/admin/users/${username}`,
      }),
    }),

    addUser: builder.mutation({
      query: (data) => ({
        endpoint: '/api/admin/users',
        method: 'POST',
        data,
      }),
      invalidatesTags: [{ type: 'Users', id: 'PARTIAL-LIST' }],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        endpoint: '/api/admin/users',
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Users', id },
        { type: 'Users', id: 'PARTIAL-LIST' },
      ],
    }),

    deleteUser: builder.mutation({
      query: (username) => ({
        endpoint: `/api/admin/users/${username}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Users', id },
        { type: 'Users', id: 'PARTIAL-LIST' },
      ],
    }),

    getCurrentUser: builder.mutation({
      query: () => ({
        endpoint: '/api/account',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetCurrentUserMutation,
} = userApi;

export default userApi;
