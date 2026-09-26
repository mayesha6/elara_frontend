"use client";
import { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/api/authApi";
import {
  useGetPlansListQuery,
  useCreateCheckoutSessionMutation,
} from "@/redux/api/subscriptionApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { setUser, setRefreshToken } from "@/redux/features/authSlice";

interface Plan {
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

export default function PricingPlanSection() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  // Auto-login if token is passed in query parameters (useful for local dev and redirects)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get("token");
      const urlRefreshToken = urlParams.get("refreshToken");
      if (urlToken) {
        dispatch(setUser({ token: urlToken }));
        if (urlRefreshToken) {
          dispatch(setRefreshToken({ refresh_token: urlRefreshToken }));
        }
        // Clean up the token query param from URL
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, "", cleanUrl);
      }
    }
  }, [dispatch]);

  const { data: meRes } = useGetMeQuery(undefined, { skip: !token });
  const user = meRes?.data;

  const { data: plansRes, isLoading: isPlansLoading } = useGetPlansListQuery();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const [activeTab, setActiveTab] = useState<"individual" | "organization">("individual");
  const [subscribingId, setSubscribingId] = useState<string | null>(null);

  // Automatically switch tab to organization if the logged-in user is an Organization Admin
  useEffect(() => {
    if (user && user.role === "ORGANIZATION_ADMIN") {
      setActiveTab("organization");
    }
  }, [user]);

  const handleSubscribe = async (plan: Plan) => {
    if (!token) {
      toast.error("Please login to purchase a subscription.");
      router.push(`/login?redirect=/pricing`);
      return;
    }

    if (plan.price === 0 || plan.price === "Free" || !plan.stripePriceId) {
      toast.info("Free Plan is active by default upon signup.");
      return;
    }

    try {
      setSubscribingId(plan._id);
      const res = await createCheckoutSession({ planId: plan._id }).unwrap();
      const checkoutUrl = res?.checkoutUrl || res?.data?.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error("Failed to generate checkout session.");
      }
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string }; message?: string };
      toast.error(errorObj?.data?.message || errorObj?.message || "Failed to initiate payment");
    } finally {
      setSubscribingId(null);
    }
  };

  if (isPlansLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[350px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-gray-500">Loading pricing plans...</p>
      </div>
    );
  }

  const backendPlans: Plan[] = plansRes?.data || [];

  // Filter plans based on B2C vs B2B criteria
  const individualPlans = backendPlans.filter(
    (p: Plan) => p.userLimit === 1 || p.price === 0
  );
  const organizationPlans = backendPlans.filter(
    (p: Plan) => p.userLimit > 1
  );

  const displayedPlans = activeTab === "individual" ? individualPlans : organizationPlans;

  const isCurrentPlan = (plan: Plan) => {
    if (!user) return false;
    // If user's current plan is null and plan is free plan
    if (!user.currentPlan && (plan.price === 0 || plan.price === "Free")) {
      return true;
    }
    // Check if matching ID
    const userPlanId = typeof user.currentPlan === "object" ? user.currentPlan?._id : user.currentPlan;
    return userPlanId === plan._id;
  };

  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="md:text-3xl text-2xl font-medium tracking-tight text-[#0b3c5d] lg:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-2 text-sm text-[#666] sm:text-base">
            Simple, transparent pricing for individuals and teams of all sizes.
          </p>

          {/* Toggle Tabs */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("individual")}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${activeTab === "individual"
                    ? "bg-[#0b3c5d] text-white shadow"
                    : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                For Individuals
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("organization")}
                className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${activeTab === "organization"
                    ? "bg-[#0b3c5d] text-white shadow"
                    : "text-gray-500 hover:text-gray-900"
                  }`}
              >
                For Organizations
              </button>
            </div>
          </div>
        </div>

        {displayedPlans.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No plans available for this category yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto justify-center">
            {displayedPlans.map((plan: Plan) => {
              const active = isCurrentPlan(plan);
              const isSubscribing = subscribingId === plan._id;
              const isFree = plan.price === 0 || plan.price === "Free";

              return (
                <div
                  key={plan._id}
                  className={`rounded-2xl p-6 shadow-sm border transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${active
                      ? "bg-blue-50/50 border-[#0b3c5d]/30"
                      : "bg-[#eff6ff] border-gray-100"
                    }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="md:text-2xl text-xl font-bold leading-none text-[#0b3c5d]">
                        {plan.name}
                      </h3>
                      {active && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0b3c5d] text-white">
                          Current Plan
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-[#555] min-h-[40px]">{plan.description}</p>

                    <div className="mt-4 flex items-end gap-1">
                      <span className="lg:text-4xl text-3xl font-extrabold leading-none text-[#0b3c5d]">
                        {isFree ? "Free" : `$${plan.price}`}
                      </span>
                      <span className="pb-1 text-sm font-medium text-gray-500">
                        / {plan.interval === "MONTH" ? "Monthly" : plan.interval === "YEAR" ? "Yearly" : plan.interval}
                      </span>
                    </div>

                    <div className="mt-5 rounded-xl bg-white px-4 py-5 border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Core Access</p>

                      {plan.userLimit > 1 && (
                        <p className="text-xs font-medium text-indigo-600 mb-3 bg-indigo-50/80 px-2.5 py-1 rounded-lg inline-block">
                          Up to {plan.userLimit} Users included
                        </p>
                      )}
                      {(plan.allocatedPoints ?? 0) > 0 && (
                        <p className="text-xs font-medium text-amber-600 mb-3 bg-amber-50/80 px-2.5 py-1 rounded-lg inline-block ml-1">
                          {plan.allocatedPoints} Points / month
                        </p>
                      )}

                      <ul className="space-y-3">
                        {plan.features?.map((feature: string) => (
                          <li key={feature} className="flex items-start gap-2 text-sm text-[#444]">
                            <FaCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={active || isSubscribing}
                    onClick={() => handleSubscribe(plan)}
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${active
                        ? "bg-gray-200 text-gray-500 cursor-default"
                        : isSubscribing
                          ? "bg-indigo-400 text-white cursor-wait"
                          : "bg-[#0b3c5d] hover:bg-[#082a42] text-white focus:ring-[#0b3c5d]"
                      }`}
                  >
                    {isSubscribing ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {active ? "Current Active Plan" : isFree ? "Free Plan" : "Subscribe Now"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
