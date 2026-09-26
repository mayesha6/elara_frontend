/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import RegisterImg from "@/assets/images/logimg.png";
import IconImg from "@/assets/elara.png";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import {
  useForgotPasswordMutation,
    usePasswordVerifyOtpMutation,
  useResetPasswordMutation,
} from "@/redux/api/authApi";

// ---------- Validation Schemas ----------
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const otpVerificationSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ForgetPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type OtpVerificationFormData = z.infer<typeof otpVerificationSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

type Step = "email" | "otp" | "password" | "success";

export default function ForgetPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP box UI states
  const [otpRefs] = useState<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);

  // API mutations
  const [forgotPassword, { isLoading: isSendingEmail }] =
    useForgotPasswordMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] =
    usePasswordVerifyOtpMutation();
  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetPasswordMutation();

  const isLoading = isSendingEmail || isVerifyingOtp || isResettingPassword;

  // Forms
  const emailForm = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const otpForm = useForm<OtpVerificationFormData>({
    resolver: zodResolver(otpVerificationSchema),
    mode: "onBlur",
    defaultValues: {
      otp: "",
    },
  });

  const passwordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  // OTP input handlers
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
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otpValues[index]) {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = "";
        setOtpValues(newOtpValues);
        return;
      }

      if (index > 0) {
        otpRefs[index - 1]?.focus();
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = "";
        setOtpValues(newOtpValues);
      }
    }
  };

  useEffect(() => {
    otpForm.setValue("otp", otpValues.join(""));
  }, [otpValues, otpForm]);

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  // Handlers
  const handleEmailSubmit = async (data: ForgetPasswordFormData) => {
    try {
      const normalizedEmail = data.email.trim().toLowerCase();

      setEmail(normalizedEmail);
      setOtpValues(["", "", "", "", "", ""]);
      otpForm.reset({ otp: "" });

      await forgotPassword({ email: normalizedEmail }).unwrap();

      setStep("otp");
      setCountdown(120);
      toast.success("Reset code sent to your email");
    } catch (error: any) {
      console.error("Failed to send reset email:", error);
      const message = error?.data?.message || "Failed to send reset email";
      if (error?.status === 429 || message.toLowerCase().includes("already sent")) {
        setStep("otp");
        setCountdown(120);
        toast.info(message || "OTP already sent. Please enter the code from your email.");
        return;
      }
      toast.error(message);
    }
  };

  const handleOtpSubmit = async (data: OtpVerificationFormData) => {
    try {
      const cleanOtp = data.otp.trim();

      await verifyOtp({
        email,
        otp: cleanOtp,
      }).unwrap();

      setStep("password");
      toast.success("Code verified successfully");
    } catch (error: any) {
      console.error("Failed to verify OTP:", error);

      const message = error?.data?.message || "Invalid verification code";

      if (
        message.toLowerCase().includes("expired") ||
        message.toLowerCase().includes("does not exist")
      ) {
        setOtpValues(["", "", "", "", "", ""]);
        otpForm.reset({ otp: "" });
        otpRefs[0]?.focus();
        toast.error("OTP expired. Please resend and use the latest code.");
        return;
      }

      toast.error(message);
    }
  };

  const handlePasswordSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPassword({
        email,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      setStep("success");
      toast.success("Password reset successfully");
    } catch (error: any) {
      console.error("Failed to reset password:", error);
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  const handleResendOtp = async () => {
    try {
      await forgotPassword({ email }).unwrap();
      setOtpValues(["", "", "", "", "", ""]);
      otpForm.reset({ otp: "" });
      setCountdown(120);
      otpRefs[0]?.focus();
      toast.success("A new OTP has been sent. Please use the latest code.");
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast.error(error?.data?.message || "Failed to resend OTP");
    }
  };

  const getTitle = () => {
    switch (step) {
      case "email":
        return "Forget Password";
      case "otp":
        return "Enter Verification Code";
      case "password":
        return "Reset Password";
      case "success":
        return "Password Reset Successful";
      default:
        return "Forget Password";
    }
  };

  const getDescription = () => {
    switch (step) {
      case "email":
        return "Please enter the email address that you used when creating your account";
      case "otp":
        return `We've sent a verification code to ${email}. Please enter the code below to verify your account.`;
      case "password":
        return "Create a new password for your account";
      case "success":
        return "Your password has been updated successfully";
      default:
        return "";
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
                  {getTitle()}
                </h1>
                <p className="text-sm sm:text-base text-gray-500">
                  {getDescription()}
                </p>
              </div>

              {step === "email" && (
                <form
                  onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...emailForm.register("email")}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg transition-colors ${
                          emailForm.formState.errors.email
                            ? "border-red-500 bg-red-50 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {emailForm.formState.errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {emailForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    {isSendingEmail ? "Sending..." : "Send Reset Link"}
                  </button>

                  <div className="text-center mt-4">
                    <Link
                      href="/login"
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Back to Login
                    </Link>
                  </div>
                </form>
              )}

              {step === "otp" && (
                <form
                  onSubmit={otpForm.handleSubmit(handleOtpSubmit)}
                  className="space-y-6"
                >
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
                          maxLength={6}
                          value={otpValues[index]}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          disabled={isLoading}
                          className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      ))}
                    </div>

                    {otpForm.formState.errors.otp && (
                      <p className="text-sm text-red-600 mt-1">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    {isVerifyingOtp ? "Verifying OTP..." : "Verify OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSendingEmail || countdown > 0}
                    className="w-full border border-orange-500 text-orange-500 hover:bg-orange-50 disabled:opacity-50 font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    {isSendingEmail
                      ? "Sending..."
                      : countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    disabled={isLoading}
                    className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
                  >
                    Back
                  </button>
                </form>
              )}

              {step === "password" && (
                <form
                  onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        {...passwordForm.register("password")}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 pl-10 pr-12 border rounded-lg transition-colors ${
                          passwordForm.formState.errors.password
                            ? "border-red-500 bg-red-50 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 disabled:opacity-50"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {passwordForm.formState.errors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {passwordForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        {...passwordForm.register("confirmPassword")}
                        disabled={isLoading}
                        className={`w-full px-4 py-3 pl-10 pr-12 border rounded-lg transition-colors ${
                          passwordForm.formState.errors.confirmPassword
                            ? "border-red-500 bg-red-50 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 disabled:opacity-50"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-600 mt-1">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    {isResettingPassword ? "Resetting..." : "Reset Password"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("otp")}
                    disabled={isLoading}
                    className="w-full text-sm text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50"
                  >
                    Back
                  </button>
                </form>
              )}

              {step === "success" && (
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-green-100 rounded-full p-4">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Password Reset Successful
                    </h2>
                    <p className="text-sm text-gray-500">
                      You can now log in using your new password.
                    </p>
                  </div>

                  <Link
                    href="/login"
                    className="block w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Continue to Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}