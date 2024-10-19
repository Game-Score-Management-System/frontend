import { Score } from '@models/Score.model';
import { User } from '@models/User.model';
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
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => 'users/admin'
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body
      })
    }),
    getUserProfile: builder.query<User, string>({
      query: (id) => `users/profile/${id}`
    })
  })
});

export const {
  useGetScoresQuery,
  useDeleteScoreMutation,
  useCreateNewScoreMutation,
  useGetAllUsersQuery,
  useGetUserProfileQuery
} = apiSlice;
