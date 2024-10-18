import { Score } from '@/app/ui/models/Score.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log(API_URL);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getScores: builder.query<Score[], void>({
      query: () => 'scores'
    }),
    deleteScore: builder.mutation<void, string>({
      query: (id) => ({
        url: `scores/${id}`,
        method: 'DELETE'
      })
    }),
    createNewScore: builder.mutation<Score, Partial<Score>>({
      query: (body) => ({
        url: 'scores',
        method: 'POST',
        body
      })
    })
  })
});

export const { useGetScoresQuery, useDeleteScoreMutation, useCreateNewScoreMutation } = apiSlice;
