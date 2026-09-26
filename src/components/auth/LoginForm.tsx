/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
import LoginImg from "@/assets/images/logimg.png";
import IconImg from "@/assets/elara.png";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { useLoginMutation, useResendOtpMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getSafeRedirectUrl } from "@/utils/safeRedirect";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface JwtPayload {
  userId?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const isProduction =
    process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost") &&
    !window.location.hostname.includes("127.0.0.1");

  // ✅ Master cookie cleaner
  const clearAllCookies = () => {
    const cookieNames = ["accessToken", "refreshToken"];
    const domains = [
      ".elara.com",
      "elara.com",
      "dashboard.elara.com",
      ".dashboard.elara.com",
      window.location.hostname,
    ];

    cookieNames.forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/; secure; samesite=Lax`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/`;
      });
      // js-cookie fallback
      Cookies.remove(name, { path: "/" });
      Cookies.remove(name, { domain: ".elara.com", path: "/" });
      Cookies.remove(name, { domain: "elara.com", path: "/" });
    });
  };

  // ✅ Login onSubmit
  const onSubmit = async (data: LoginFormData) => {
    try {
      setUserEmail(data.email);

      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (response?.success) {
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        const user = response?.data?.user;

        if (!accessToken || !refreshToken || !user) {
          toast.error("Login failed", {
            description: "Invalid server response",
          });
          return;
        }

        // ✅ Step 1: Clear ALL old cookies first
        clearAllCookies();

        // ✅ Step 2: Single consistent cookie options
        const cookieOptions: Cookies.CookieAttributes = {
          domain: isProduction ? ".elara.com" : undefined,
          secure: isProduction,
          sameSite: "Lax",
          path: "/",
          ...(data.rememberMe ? { expires: 30 } : {}),
        };

        // ✅ Step 3: Set cookies ONCE
        Cookies.set("accessToken", accessToken, cookieOptions);
        Cookies.set("refreshToken", refreshToken, cookieOptions);

        // ✅ Step 4: localStorage
        localStorage.setItem("user", JSON.stringify(user));
        if (data.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        // ✅ Step 5: Redux
        dispatch(setUser({ token: accessToken, refresh_token: refreshToken }));

        // ✅ Step 6: Decode role
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const role = decoded?.role || user?.role;

        const getRoleLabel = (r?: string) => {
          if (r === "SUPER_ADMIN") return "Super Admin";
          if (r === "ORGANIZATION_ADMIN") return "Organization Admin";
          if (r === "DEPARTMENT_ADMIN") return "Department Admin";
          return "User";
        };

        toast.success(`Welcome back, ${user?.name || "User"}!`, {
          description: `Logged in as ${getRoleLabel(role)}`,
        });

        reset();

        // ✅ Step 7: Redirect
        const rawRedirect = sessionStorage.getItem("redirectAfterLogin") || searchParams.get("redirect");
        if (rawRedirect) {
          sessionStorage.removeItem("redirectAfterLogin");
          const safeRedirect = getSafeRedirectUrl(rawRedirect, "");
          if (safeRedirect) {
            window.location.href = safeRedirect;
            return;
          }
        }

        const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";
        const dashboardBaseUrl = currentOrigin.includes("localhost")
          ? "http://localhost:3010"
          : "https://dashboard.elara.com";

        let dashboardPath = "/";
        if (role === "SUPER_ADMIN") {
          dashboardPath = "/super-admin";
        } else if (role === "ORGANIZATION_ADMIN") {
          const orgName = user?.companyName || user?.name || "org-admin";
          dashboardPath = `/${slugify(orgName)}`;
        } else if (role === "DEPARTMENT_ADMIN") {
          const orgObj = user?.organizationId;
          const orgName = orgObj?.companyName || orgObj?.name || (typeof orgObj === "string" ? orgObj : "dept-admin");
          dashboardPath = `/${slugify(orgName)}/dept-admin/dashboard`;
        } else if (role === "USER") {
          dashboardPath = "/user/dashboard";
        }

        window.location.href = `${dashboardBaseUrl}${dashboardPath}`;
      } else {
        toast.error("Login failed", {
          description: "Invalid email or password",
        });
        setError("root", { message: "Invalid email or password" });
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error?.data?.message || error?.message || "Please try again later";
      toast.error("Login failed", { description: errorMessage });
      setError("root", { message: errorMessage });
    }
  };
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const handleVerifyEmail = async () => {
    if (!userEmail) {
      toast.error("Email not found");
      return;
    }

    try {
      await resendOtp({ email: userEmail }).unwrap();

      toast.success("OTP sent to your email!");
      router.push(`/otp-verify?email=${encodeURIComponent(userEmail)}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
          <div className="relative w-full h-full min-h-screen">
            <Image
              src={LoginImg}
              alt="Elara Dashboard"
              fill
              className="lg:object-contain xl:object-cover"
              priority
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-md border-2 border-cyan-400 rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@gmail.com"
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition disabled:opacity-50"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-12 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register("rememberMe")}
                    type="checkbox"
                    disabled={isLoading}
                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>

                <Link
                  href="/forget-password"
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              {errors.root && (
                <div className="text-sm text-red-500 text-center bg-red-50 py-3 px-3 rounded-md space-y-2">
                  <p>{errors.root.message}</p>
                </div>
              )}

              {errors.root?.message?.includes("not verified") && (
                <div className="text-sm text-red-500 text-center bg-red-50 py-3 px-3 rounded-md space-y-2">
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={resendLoading}
                    className="text-xs font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-md transition"
                  >
                    {resendLoading ? "Sending..." : "Verify Email"}
                  </button>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-6"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Account Creation Links */}
            <div className="mt-6 space-y-3">
              <Link href="/register?name=ORGANIZATION" className="block mb-4">
                <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-2 rounded-lg transition">
                  Create Organization Account
                </button>
              </Link>
              <Link href="/register" className="block">
                <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 rounded-lg transition">
                  Create Individual Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
