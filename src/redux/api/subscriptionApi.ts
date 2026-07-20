import { baseApi } from "./baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlansList: builder.query<any, void>({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),

    createCheckoutSession: builder.mutation<any, { planId: string }>({
      query: (data) => ({
        url: "/subscription/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    getMySubscription: builder.query<any, void>({
      query: () => ({
        url: "/subscription/me",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetPlansListQuery,
  useCreateCheckoutSessionMutation,
  useGetMySubscriptionQuery,
} = subscriptionApi;
