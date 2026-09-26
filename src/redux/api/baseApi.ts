import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/authSlice";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    const url = typeof args === "string" ? args : args.url;
    // Don't attempt to refresh token if the failed request was already the refresh endpoint
    if (url.includes("/auth/refresh-token")) {
      api.dispatch(logout());
      return result;
    }

    try {
      const refreshTokenVal =
        Cookies.get("refreshToken") ||
        (api.getState() as RootState).auth?.refresh_token;

      if (!refreshTokenVal) {
        api.dispatch(logout());
        return result;
      }

      const refreshResult = await fetch(
        `${baseUrl}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshTokenVal }),
          credentials: "include",
        }
      );

      if (refreshResult.ok) {
        const refreshResponse = await refreshResult.json();
        const newAccessToken =
          refreshResponse?.data?.accessToken || refreshResponse?.accessToken;
        const newRefreshToken =
          refreshResponse?.data?.refreshToken || refreshResponse?.refreshToken;

        if (newAccessToken) {
          api.dispatch(
            setUser({
              token: newAccessToken,
              ...(newRefreshToken ? { refresh_token: newRefreshToken } : {}),
            })
          );
          // Retry the original query with the new access token
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
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
