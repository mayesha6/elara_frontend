"use client";
import React, { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useVerifyPaymentSessionMutation } from "@/redux/api/subscriptionApi";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { getValidStripeSessionId } from "@/utils/paymentVerification";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const rawSessionId = searchParams.get("session_id") || searchParams.get("sessionId");
  const validSessionId = getValidStripeSessionId(rawSessionId);

  const [verifyStatus, setVerifyStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");

  const { refetch } = useGetMeQuery();
  const [verifyPaymentSession] = useVerifyPaymentSessionMutation();

  useEffect(() => {
    let isMounted = true;

    async function performVerification() {
      if (!validSessionId) {
        if (isMounted) {
          setVerifyStatus("error");
          setErrorMessage("Missing or invalid payment session ID. Payment could not be verified.");
        }
        return;
      }

      try {
        const res = await verifyPaymentSession({
          sessionId: validSessionId,
        }).unwrap();

        if (res?.success) {
          if (isMounted) {
            setVerifyStatus("success");
            toast.success("Payment verified successfully!");
            refetch();
          }
        } else {
          if (isMounted) {
            setVerifyStatus("error");
            setErrorMessage(res?.message || "Stripe payment verification failed.");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorObj = err as { data?: { message?: string } };
          setVerifyStatus("error");
          setErrorMessage(errorObj?.data?.message || "Payment verification service error. Please contact support.");
        }
      }
    }

    performVerification();

    return () => {
      isMounted = false;
    };
  }, [validSessionId, verifyPaymentSession, refetch]);

  if (verifyStatus === "verifying") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
          <div className="flex justify-center">
            <Loader2 size={44} className="text-orange-500 animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0b3c5d]">Verifying Payment...</h1>
            <p className="text-gray-500 text-sm">
              Please wait while we verify your Stripe transaction with the backend server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (verifyStatus === "error") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-red-50/50 border border-red-100 shadow-sm">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500">
              <AlertCircle size={40} />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-red-700">Verification Failed</h1>
            <p className="text-gray-600 text-sm">
              {errorMessage || "We could not verify your payment transaction. Please contact support if your account was charged."}
            </p>
          </div>
          <div className="pt-4">
            <button
              onClick={() => {
                let dashboardUrl = "https://dashboard.greetely.com";
                if (typeof window !== "undefined" && window.location.hostname.includes("localhost")) {
                  dashboardUrl = "http://localhost:3010";
                }
                window.location.href = dashboardUrl;
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0b3c5d] hover:bg-[#082a42] text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Go to Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#0b3c5d]">Payment Verified & Successful!</h1>
          <p className="text-gray-500 text-sm">
            Thank you for your payment! Your transaction was verified with Stripe, and your subscription/profile data has been updated.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={() => {
              let dashboardUrl = "https://dashboard.greetely.com";
              if (typeof window !== "undefined") {
                if (window.location.hostname.includes("localhost")) {
                  dashboardUrl = "http://localhost:3010";
                }
              }
              window.location.href = dashboardUrl;
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#0b3c5d] hover:bg-[#082a42] text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Go to Dashboard <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}


