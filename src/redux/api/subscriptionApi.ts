import { baseApi } from "./baseApi";

export interface PlanItem {
  _id: string;
  name: string;
  description?: string;
  price: number | string;
  interval?: string;
  userLimit: number;
  allocatedPoints?: number;
  features?: string[];
  stripePriceId?: string;
}

export interface PlansResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: PlanItem[];
}

export interface CheckoutResponse {
  statusCode: number;
  success: boolean;
  message: string;
  checkoutUrl?: string;
  data?: {
    checkoutUrl?: string;
  };
}

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlansList: builder.query<PlansResponse, void>({
      query: () => ({
        url: "/plan",
        method: "GET",
      }),
      providesTags: ["Plans"],
    }),

    createCheckoutSession: builder.mutation<CheckoutResponse, { planId: string }>({
      query: (data) => ({
        url: "/subscription/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    getMySubscription: builder.query<unknown, void>({
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
