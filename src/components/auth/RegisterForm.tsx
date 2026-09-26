/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Eye, EyeOff } from "lucide-react";
// import { toast } from "sonner";
// import Image from "next/image";
// import RegisterImg from "@/assets/images/logimg.png";
// import IconImg from "@/assets/elara.png";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation";
// import { useRegisterMutation } from "@/redux/api/authApi";

// const signupSchema = z
//   .object({
//     fullName: z.string().min(2, "Full name must be at least 2 characters"),
//     email: z.string().email("Please enter a valid email"),
//     department: z.string().min(1, "Please select a department"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string().min(6, "Confirm password is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// type SignupFormData = z.infer<typeof signupSchema>;

// export default function RegisterForm() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [registerUser, { isLoading }] = useRegisterMutation();
//   const searchParams = useSearchParams();
//   const name = searchParams.get("name");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<SignupFormData>({
//     resolver: zodResolver(signupSchema),
//   });

//   const onSubmit = async (data: SignupFormData) => {
//     try {
//       let payload;

//       if (name === "ORGANIZATION") {
//         payload = {
//           name: data.fullName,
//           email: data.email,
//           password: data.password,
//           department: data.department,
//           accountType: "ORGANIZATION",
//         };
//       } else {
//         payload = {
//           name: data.fullName,
//           email: data.email,
//           password: data.password,
//           department: data.department,
//           accountType: "INDIVIDUAL",
//         };
//       }

//       const response = await registerUser(payload).unwrap();

//       toast.success(
//         response?.message ||
//           "User Created Successfully. OTP sent to email. Please verify your account.",
//       );

//       router.push(`/otp-verify?email=${encodeURIComponent(data.email)}`);
//     } catch (error: any) {
//       console.error("Signup error:", error);

//       if (error?.data?.errors) {
//         Object.entries(error.data.errors).forEach(([field, messages]: any) => {
//           const message = messages?.[0] || "Something went wrong";

//           if (field === "name")
//             setError("fullName", { type: "server", message });
//           if (field === "email") setError("email", { type: "server", message });
//           if (field === "password")
//             setError("password", { type: "server", message });
//           if (field === "department")
//             setError("department", { type: "server", message });
//         });
//       }

//       toast.error(
//         error?.data?.message || "Registration failed. Please try again later",
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex flex-col lg:flex-row min-h-screen">
//         {/* Left side - Image */}
//         <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
//           <div className="relative w-full h-full min-h-screen">
//             <Image
//               src={RegisterImg}
//               alt="Elara Dashboard"
//               fill
//               className="lg:object-contain xl:object-cover"
//               priority
//             />
//           </div>
//         </div>

//         {/* Right side - Form */}
//         <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-6 lg:p-8">
//           <div className="w-full max-w-md border-2 border-cyan-400 rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
//             {/* Logo */}
//             <div className="flex justify-center mb-6">
//               <Image
//                 src={IconImg}
//                 alt="Elara Dashboard"
//                 width={500}
//                 height={500}
//                 className="w-36 h-16 object-contain"
//                 priority
//               />
//             </div>

//             {/* Heading */}
//             <div className="text-center mb-8">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                 Create Account
//               </h1>
//               <p className="text-sm sm:text-base text-gray-500">
//                 Sign up to get started
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               {/* Full Name Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   {...register("fullName")}
//                   type="text"
//                   placeholder="Sofur Rahman"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                 />
//                 {errors.fullName && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.fullName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <input
//                   {...register("email")}
//                   type="email"
//                   placeholder="crm@gmail.com"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               {/* Department Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Department
//                 </label>
//                 <select
//                   {...register("department")}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white text-gray-900"
//                 >
//                   <option value="">Select a department</option>
//                   <option value="Sales">Sales</option>
//                   <option value="Marketing">Marketing</option>
//                   <option value="Engineering">Engineering</option>
//                   <option value="Human Resources">Human Resources</option>
//                   <option value="Finance">Finance</option>
//                   <option value="Operations">Operations</option>
//                   <option value="Customer Support">Customer Support</option>
//                   <option value="Legal">Legal</option>
//                   <option value="Product">Product</option>
//                   <option value="Design">Design</option>
//                 </select>
//                 {errors.department && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.department.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Enter Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     {...register("password")}
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     {...register("confirmPassword")}
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-12"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff size={20} />
//                     ) : (
//                       <Eye size={20} />
//                     )}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-6"
//               >
//                 {isLoading ? "Creating Account..." : "Create Account"}
//               </button>
//             </form>

//             {/* Login Link */}
//             <p className="text-center text-sm text-gray-600 mt-6">
//               Already have an account?{" "}
//               <Link
//                 href="/login"
//                 className="text-orange-500 hover:text-orange-600 font-medium"
//               >
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import RegisterImg from "@/assets/images/logimg.png";
import IconImg from "@/assets/elara.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  useGetDepartmentQuery,
  useRegisterMutation,
} from "@/redux/api/authApi";

type SignupFormData = {
  fullName: string;
  email: string;
  department?: string;
  companyName?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterMutation();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  // ✅ Fetch departments from API
  const { data: departmentData, isLoading: isDepartmentLoading } =
    useGetDepartmentQuery("");

  const departments: { _id: string; name: string }[] =
    departmentData?.data ?? [];

  const signupSchema = useMemo(() => {
    return z
      .object({
        fullName: z.string().min(2, "Full name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email"),
        department: z.string().optional(),
        companyName: z.string().optional(),
        phone: z.string().optional(),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password is required"),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      })
      .superRefine((data, ctx) => {
        if (name === "ORGANIZATION") {
          if (!data.companyName || data.companyName.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Organization name is required",
              path: ["companyName"],
            });
          }
          if (!data.phone || data.phone.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Phone number is required",
              path: ["phone"],
            });
          }
        } else {
          if (!data.department || data.department.trim() === "") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please select a department",
              path: ["department"],
            });
          }
        }
      });
  }, [name]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      department: "Personal Account", // ✅ Personal Account selected by default
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
        department: name === "ORGANIZATION" ? "Organization" : data.department,
        accountType: name === "ORGANIZATION" ? "ORGANIZATION" : "INDIVIDUAL",
        companyName: name === "ORGANIZATION" ? data.companyName : undefined,
        phone: name === "ORGANIZATION" ? data.phone : undefined,
      };

      const response = await registerUser(payload).unwrap();

      toast.success(
        response?.message ||
          "User Created Successfully. OTP sent to email. Please verify your account.",
      );

      router.push(`/otp-verify?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      console.error("Signup error:", error);

      if (error?.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, messages]: any) => {
          const message = messages?.[0] || "Something went wrong";
          if (field === "name")
            setError("fullName", { type: "server", message });
          if (field === "email") setError("email", { type: "server", message });
          if (field === "password")
            setError("password", { type: "server", message });
          if (field === "department")
            setError("department", { type: "server", message });
        });
      }

      toast.error(
        error?.data?.message || "Registration failed. Please try again later",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
          <div className="relative w-full h-full min-h-screen">
            <Image
              src={RegisterImg}
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
                Create Account
              </h1>
              <p className="text-sm sm:text-base text-gray-500">
                Sign up to get started
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {name === "ORGANIZATION" ? (
                <>
                  {/* Organization Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      {...register("companyName")}
                      type="text"
                      placeholder="Acme Corporation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Full Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Full Name
                    </label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Sofur Rahman"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      type="text"
                      placeholder="01712345678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="crm@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      {...register("fullName")}
                      type="text"
                      placeholder="Sofur Rahman"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="crm@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Department Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      {...register("department")}
                      disabled={isDepartmentLoading}
                      defaultValue="Personal Account"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {isDepartmentLoading
                          ? "Loading departments..."
                          : "Personal Account"}
                      </option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-6"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
