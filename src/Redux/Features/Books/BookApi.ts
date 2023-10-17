import { Api } from '@/Redux/Api/apiSlice';

const BookApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchTerm) => `/books?searchTerm=${searchTerm}`,
      providesTags: ['searchTerms'],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `/book/${data.id}`,
        method: 'PATCH',
        body: data.updatedData,
      }),
    }),
    postReviews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/Reviews/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reviews'],
    }),
    getReviews: builder.query({
      query: (id) => `/Reviews/${id}`,
      providesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostBookMutation,
  useUpdateBookMutation,
  usePostReviewsMutation,
  useGetReviewsQuery,
} = BookApi;
