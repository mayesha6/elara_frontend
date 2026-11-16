import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    passwordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify-reset-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query<{ statusCode?: number; success?: boolean; data?: Record<string, unknown> }, void | undefined>({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    userAccountDelete: builder.mutation({
      query: () => ({
        url: `/user/delete-own-profile`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    logoutUser: builder.mutation<unknown, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    restoreAccount: builder.mutation({
      query: (data) => ({
        url: "/user/restore-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    resendRestoreOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/resend-restore-otp",
        method: "POST",
        body: data,
      }),
    }),

    getDepartment: builder.query<unknown, string | void | undefined>({
      query: () => "/department/public",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  usePasswordVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useUserAccountDeleteMutation,
  useGetDepartmentQuery,
  useLogoutUserMutation,
  useRestoreAccountMutation,
  useResendRestoreOtpMutation,
} = authApi;
