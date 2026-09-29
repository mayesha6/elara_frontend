import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401
  ) {
    const url = typeof args === "string" ? args : args.url;
    // Don't attempt to refresh token if the failed request was already the refresh endpoint
    if (url.includes("/auth/refresh-token")) {
      api.dispatch(logout());
      return result;
    }

    try {
      const refreshResult = await fetch(
        `${baseUrl}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (refreshResult.ok) {
        api.dispatch(setUser({}));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } catch {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "User",
    "Products",
    "Service",
    "Categories",
    "Consultations",
    "Plans",
    "SubCategory",
    "TopDeals",
    "UserOrders",
    "UserBookings",
    "UserSubscriptions",
    "UserCoupons",
    "Store",
    "Coupon",
    "Subscription",
    "Cart",
    "Payment",
    "MessageChat",
    "Notification",
    "UserConsultations",
    "UserReviews",
    "specialistReviews",
    "Feature",
    "Platform",
    "SpecialOffer",
  ],
  endpoints: () => ({}),
});
