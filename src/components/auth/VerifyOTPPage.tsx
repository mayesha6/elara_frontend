// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import RegisterImg from "@/assets/images/logimg.png";
// import IconImg from "@/assets/elara.png";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/api/authApi";
// import * as z from "zod";

// const otpSchema = z.object({
//   otp: z
//     .string()
//     .min(6, "OTP must be 6 digits")
//     .max(6, "OTP must be 6 digits")
//     .regex(/^\d{6}$/, "OTP must contain only numbers"),
// });

// type OtpFormData = z.infer<typeof otpSchema>;

// export default function VerifyOTPPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") || "";

//   const [otpRefs] = useState<(HTMLInputElement | null)[]>([]);
//   const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
//   const [countdown, setCountdown] = useState(0);

//   const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
//   const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

//   const {
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<OtpFormData>({
//     resolver: zodResolver(otpSchema),
//     mode: "onBlur",
//   });

//   const handleOtpChange = (index: number, value: string) => {
//     const newValue = value.replace(/[^0-9]/g, "");

//     if (newValue.length > 1) {
//       const digits = newValue.split("");
//       const newOtpValues = [...otpValues];

//       for (let i = index; i < 6 && i - index < digits.length; i++) {
//         newOtpValues[i] = digits[i - index];
//       }

//       setOtpValues(newOtpValues);

//       const nextIndex = Math.min(index + digits.length, 5);
//       otpRefs[nextIndex]?.focus();
//     } else {
//       const newOtpValues = [...otpValues];
//       newOtpValues[index] = newValue;
//       setOtpValues(newOtpValues);

//       if (newValue && index < 5) {
//         otpRefs[index + 1]?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (
//     index: number,
//     e: React.KeyboardEvent<HTMLInputElement>
//   ) => {
//     if (e.key === "Backspace" && !otpValues[index] && index > 0) {
//       otpRefs[index - 1]?.focus();
//     }
//   };

//   useEffect(() => {
//     setValue("otp", otpValues.join(""));
//   }, [otpValues, setValue]);

//   useEffect(() => {
//     if (countdown <= 0) return;

//     const interval = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [countdown]);

//   const onSubmit = async (data: OtpFormData) => {
//     if (!email) {
//       toast.error("Email not found. Please register again.");
//       return;
//     }

//     try {
//       const response = await verifyOtp({
//         email,
//         otp: Number(data.otp),
//       }).unwrap();

//       toast.success(response?.message || "OTP verified successfully!");
//       router.push("/login");
//     } catch (error: any) {
//       console.error("OTP verification error:", error);
//       toast.error(
//         error?.data?.message || "Failed to verify OTP. Please try again."
//       );
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!email) {
//       toast.error("Email not found. Please register again.");
//       return;
//     }

//     try {
//       const response = await resendOtp({ email }).unwrap();
//       toast.success(response?.message || "OTP resent successfully");
//       setCountdown(60);
//       setOtpValues(["", "", "", "", "", ""]);
//       setValue("otp", "");
//       otpRefs[0]?.focus();
//     } catch (error: any) {
//       console.error("Resend OTP error:", error);
//       toast.error(
//         error?.data?.message || "Failed to resend OTP. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex flex-col lg:flex-row min-h-screen">
//         <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center relative">
//           <div className="relative w-full h-full min-h-screen">
//             <Image
//               src={RegisterImg}
//               alt="Elara Dashboard"
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//         </div>

//         <div className="flex-1 flex items-center justify-center px-4 py-12 lg:px-8">
//           <div className="w-full max-w-md border-2 border-cyan-400 rounded-2xl bg-white p-6 lg:p-8">
//             <div className="w-full max-w-md">
//               <div className="flex justify-center mb-6">
//                 <Image
//                   src={IconImg}
//                   alt="Elara Dashboard"
//                   width={500}
//                   height={500}
//                   className="w-36 h-16 object-contain"
//                   priority
//                 />
//               </div>

//               <div className="text-center mb-8">
//                 <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                   Enter Verification Code
//                 </h1>
//                 <p className="text-sm sm:text-base text-gray-500">
//                   We&apos;ve sent a verification code to{" "}
//                   <span className="font-medium text-gray-700">{email}</span>.
//                   Please enter the code below to verify your account.
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 <div className="space-y-3">
//                   <label className="block text-sm font-medium text-gray-700">
//                     OTP
//                   </label>

//                   <div className="flex gap-2 justify-between">
//                     {[0, 1, 2, 3, 4, 5].map((index) => (
//                       <input
//                         key={index}
//                         ref={(el) => {
//                           otpRefs[index] = el;
//                         }}
//                         type="text"
//                         inputMode="numeric"
//                         maxLength={1}
//                         value={otpValues[index]}
//                         onChange={(e) => handleOtpChange(index, e.target.value)}
//                         onKeyDown={(e) => handleKeyDown(index, e)}
//                         className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
//                       />
//                     ))}
//                   </div>

//                   {errors.otp && (
//                     <p className="text-sm text-red-600 mt-1">
//                       {errors.otp.message}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isVerifying}
//                   className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
//                 >
//                   {isVerifying ? "Verifying OTP..." : "Verify OTP"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleResendOtp}
//                   disabled={isResending || countdown > 0}
//                   className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
//                 >
//                   {isResending
//                     ? "Sending..."
//                     : countdown > 0
//                     ? `Resend in ${countdown}s`
//                     : "Resend OTP"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import RegisterImg from "@/assets/images/logimg.png";
import IconImg from "@/assets/elara.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/api/authApi";
import * as z from "zod";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otpRefs] = useState<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(120);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
  });

  const handleOtpChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, "");

    if (newValue.length > 1) {
      const digits = newValue.split("");
      const newOtpValues = [...otpValues];

      for (let i = index; i < 6 && i - index < digits.length; i++) {
        newOtpValues[i] = digits[i - index];
      }

      setOtpValues(newOtpValues);

      const nextIndex = Math.min(index + digits.length, 5);
      otpRefs[nextIndex]?.focus();
    } else {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = newValue;
      setOtpValues(newOtpValues);

      if (newValue && index < 5) {
        otpRefs[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs[index - 1]?.focus();
    }
  };

  // ✅ NEW: handles paste from clipboard on any of the 6 inputs
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    if (!pastedText) return;

    const newOtpValues = [...otpValues];
    for (let i = 0; i < 6; i++) {
      newOtpValues[i] = pastedText[i] || "";
    }

    setOtpValues(newOtpValues);

    // Focus the last filled box (or box 5 if full OTP pasted)
    const lastFilledIndex = Math.min(pastedText.length - 1, 5);
    otpRefs[lastFilledIndex]?.focus();
  };

  useEffect(() => {
    setValue("otp", otpValues.join(""));
  }, [otpValues, setValue]);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const onSubmit = async (data: OtpFormData) => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    try {
      const response = await verifyOtp({
        email,
        otp: Number(data.otp),
      }).unwrap();

      toast.success(response?.message || "OTP verified successfully!");
      router.push("/login");
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error(
        error?.data?.message || "Failed to verify OTP. Please try again.",
      );
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    try {
      const response = await resendOtp({ email }).unwrap();
      toast.success(response?.message || "OTP resent successfully");
      setCountdown(120);
      setOtpValues(["", "", "", "", "", ""]);
      setValue("otp", "");
      otpRefs[0]?.focus();
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast.error(
        error?.data?.message || "Failed to resend OTP. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center relative">
          <div className="relative w-full h-full min-h-screen">
            <Image
              src={RegisterImg}
              alt="Elara Dashboard"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12 lg:px-8">
          <div className="w-full max-w-md border-2 border-cyan-400 rounded-2xl bg-white p-6 lg:p-8">
            <div className="w-full max-w-md">
              <div className="flex justify-center mb-6">
                <Link href="/">
                  <span className="text-3xl font-black tracking-tight text-slate-900 select-none">
                    Elara<span className="text-[#1877F2]">.</span>
                  </span>
                </Link>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Enter Verification Code
                </h1>
                <p className="text-sm sm:text-base text-gray-500">
                  We&apos;ve sent a verification code to{" "}
                  <span className="font-medium text-gray-700">{email}</span>.
                  Please enter the code below to verify your account.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>

                  <div className="flex gap-2 justify-between">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          otpRefs[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={6} // ✅ changed from 1 → 6 to allow paste
                        value={otpValues[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste} // ✅ added
                        className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                      />
                    ))}
                  </div>

                  {errors.otp && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.otp.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {isVerifying ? "Verifying OTP..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending || countdown > 0}
                  className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  {isResending
                    ? "Sending..."
                    : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend OTP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
