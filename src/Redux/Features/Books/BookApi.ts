import { Api } from '@/Redux/Api/apiSlice';

const BookApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `/books`,
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComments: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = BookApi;