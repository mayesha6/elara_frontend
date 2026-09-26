"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import RegisterImg from "@/assets/images/logimg.png";
import IconImg from "@/assets/elara.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useResetPasswordMutation } from "@/redux/api/authApi";

// Define the schema
const forgotPasswordSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the type from the schema
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function CreatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: paramEmail,
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const emailToUse = (data.email || paramEmail).trim().toLowerCase();
      if (!emailToUse) {
        toast.error("Email address is required to reset password.");
        return;
      }

      await resetPassword({
        email: emailToUse,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      toast.success("Password updated successfully! Please login with your new password.");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      const errorMessage =
        err?.data?.message || err?.message || "Failed to set password. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop: Side by side layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Image */}
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

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12 lg:px-8">
          <div className="w-full max-w-md border-2 border-cyan-400 rounded-2xl bg-white p-6 lg:p-8">
            <div className="w-full max-w-md">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <Link href="/">
                  <span className="text-3xl font-black tracking-tight text-slate-900 select-none">
                    Elara<span className="text-[#1877F2]">.</span>
                  </span>
                </Link>
              </div>

              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">
                  Create New Password
                </h1>
                <p className="text-sm sm:text-base text-gray-500">
                  Please enter new password for your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Password Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password")}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg transition-colors ${
                        errors.password
                          ? "border-red-500 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-50 focus:outline-none focus:border-red-500"
                          : "border-gray-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 mt-6"
                >
                  {isLoading ? "Setting Password..." : "Set Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}