"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";

export default function SuccessPage() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const { refetch } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token) {
      refetch(); // Refetch user info to get the updated subscription plan
    }
  }, [token, refetch]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
            <CheckCircle2 size={40} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#0b3c5d]">Payment Successful!</h1>
          <p className="text-gray-500 text-sm">
            Thank you for subscribing! Your transaction was completed successfully, and your points have been allocated to your wallet.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={() => router.push("/user")}
            className="w-full flex items-center justify-center gap-2 bg-[#0b3c5d] hover:bg-[#082a42] text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Go to Dashboard <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
