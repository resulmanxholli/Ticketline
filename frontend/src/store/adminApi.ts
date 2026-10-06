import type { AdminStats, AdminUser } from "../types/admin";
import type { Role } from "../types/user";
import { seatlyApi } from "./api";

export const adminApi = seatlyApi.injectEndpoints({
  endpoints: (builder) => ({
    adminStats: builder.query<AdminStats, void>({
      query: () => "/admin/stats",
      providesTags: ["AdminStats"],
    }),
    adminUsers: builder.query<{ users: AdminUser[] }, void>({
      query: () => "/admin/users",
      providesTags: ["AdminUsers"],
    }),
    createUser: builder.mutation<
      { user: AdminUser },
      { name: string; email: string; password: string; role: "organizer" | "admin" }
    >({
      query: (body) => ({ url: "/admin/users", method: "POST", body }),
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),
    updateUserRole: builder.mutation<{ user: AdminUser }, { id: string; role: Role }>({
      query: ({ id, role }) => ({ url: `/admin/users/${id}/role`, method: "PATCH", body: { role } }),
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),
  }),
});

export const {
  useAdminStatsQuery,
  useAdminUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
} = adminApi;