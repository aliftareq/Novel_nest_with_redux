import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://novelnest-server.vercel.app/',
  }),
  tagTypes: ['Reviews', 'searchTerms'],
  endpoints: () => ({}),
});
