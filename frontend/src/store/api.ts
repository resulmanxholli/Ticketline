import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthResponse } from "../types/auth";
import type { User } from "../types/user";
import type { RootState } from "./store";

export const seatlyApi = createApi({
  reducerPath: "seatlyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
        query: (body) => ({ url: '/auth/login', method: 'POST', body })
    }),
    register: builder.mutation<AuthResponse, { name: string; email: string; password: string; role?: "attendee" | "organizer" }>({
        query: (body) => ({ url: '/auth/register', method: 'POST', body})
    }),
    me: builder.query<{ user: User }, void>({
        query: () => ({ url: '/auth/me', method: 'GET' })
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = seatlyApi;
