import { Leaderboard } from '@/app/ui/models/Leaderboard.model';
import { Score } from '@models/Score.model';
import { User } from '@models/User.model';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  metadata: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  result: T;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const state = getState() as { users: { token: string } };
      const token = state.users.token;
      if (!token) return headers;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getScores: builder.query<Score[], { page: number; limit: number; orderBy: string }>({
      query: ({ page, limit, orderBy }) =>
        `scores?page=${page}&limit=${limit}&showDeleted=1&orderBy=${orderBy}&order=desc`,
      transformResponse: (response: ApiResponse<Score[]>) => response.result
    }),
    getScoresByIdUser: builder.query<
      Score[],
      { page: number; limit: number; id: string; game: string }
    >({
      query: ({ page, limit, id, game }) =>
        `users/scores/${id}?page=${page}&limit=${limit}&game=${game}&orderBy=createdAt&order=desc`,
      transformResponse: (response: ApiResponse<Score[]>) => response.result
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
    updateScore: builder.mutation<Score, Partial<Score>>({
      query: ({ id, game, score }) => ({
        url: `scores/${id}`,
        method: 'PATCH',
        body: { game, score }
      })
    }),
    getAllUsers: builder.query<User[], { page: number; limit: number }>({
      query: ({ page, limit }) => `users/admin/?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<User[]>) => response.result
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body
      })
    }),
    getUserProfile: builder.query<User, string>({
      query: (id) => `users/profile/${id}`,
      transformResponse: (response: ApiResponse<User>) => response.result
    }),
    getLeaderboard: builder.query<Leaderboard[], { page: number; limit: number; game: string }>({
      query: ({ page, limit, game }) => `scores/leaderboard/${game}?page=${page}&limit=${limit}`,
      transformResponse: (response: ApiResponse<Leaderboard[]>) => response.result
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (body: Partial<User>) => ({
        url: `users/profile/${body.id}`,
        method: 'PATCH',
        body: { ...body, id: undefined }
      })
    }),
    toggleUserStatus: builder.mutation<User, { id: string; status: boolean }>({
      query: ({ id, status }) => ({
        url: `users/admin/${id}`,
        method: 'PATCH',
        body: { status }
      })
    })
  })
});

export const {
  useGetScoresQuery,
  useDeleteScoreMutation,
  useCreateNewScoreMutation,
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useGetLeaderboardQuery,
  useUpdateProfileMutation,
  useGetScoresByIdUserQuery,
  useToggleUserStatusMutation,
  useUpdateScoreMutation
} = apiSlice;
