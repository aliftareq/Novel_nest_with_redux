import { Api } from '@/Redux/Api/apiSlice';

export type IUser = {
  email: string | null;
};

const userApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePostUserMutation } = userApi;
