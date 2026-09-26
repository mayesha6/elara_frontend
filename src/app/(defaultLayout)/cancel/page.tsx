"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 animate-bounce">
            <XCircle size={40} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-[#0b3c5d]">Payment Cancelled</h1>
          <p className="text-gray-500 text-sm">
            Your checkout process was cancelled. No charges were made to your card. If you ran into any issues, please feel free to try again.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <button
            onClick={() => router.push("/pricing")}
            className="w-full flex items-center justify-center gap-2 bg-[#0b3c5d] hover:bg-[#082a42] text-white py-3 rounded-xl font-semibold transition-colors"
          >
            <ArrowLeft size={16} /> Back to Pricing
          </button>
        </div>
      </div>
    </div>
  );
}
