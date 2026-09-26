"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Trash2, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { persistor } from "@/redux/store";

type AccountType = "INDIVIDUAL" | "ORGANIZATION";

type Department = string;

type ProfileSettingsFormValues = {
  name: string;
  department: Department | "";
  accountType: AccountType | "";
  picture: FileList | string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type MeResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    department: Department;
    accountType: AccountType;
    isDeleted: boolean;
    isActive: string;
    isVerified: boolean;
    auths: unknown[];
    createdAt: string;
    updatedAt: string;
    picture?: string;
  };
};

type DepartmentResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
};

import {
  useGetMeQuery,
  useGetDepartmentQuery,
  useUpdateUserMutation,
  useUserAccountDeleteMutation,
} from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────
   Delete Confirmation Modal
───────────────────────────────────────────── */
function DeleteAccountModal({
  isOpen,
  isLoading,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>
        <h3 className="text-center text-xl font-bold text-slate-900">
          Delete Account?
        </h3>
        <p className="mt-2 text-center text-sm text-slate-500">
          This action is{" "}
          <span className="font-semibold text-red-500">permanent</span> and
          cannot be undone. All your data will be deleted immediately.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Deleting…" : "Yes, Delete My Account"}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function ProfileSettings() {
  const [previewUrl, setPreviewUrl] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: meData, isLoading: isMeLoading } = useGetMeQuery(undefined) as {
    data?: MeResponse;
    isLoading: boolean;
  };

  const { data: departmentData, isLoading: isDepartmentLoading } =
    useGetDepartmentQuery("") as {
      data?: DepartmentResponse;
      isLoading: boolean;
    };

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading }] =
    useUserAccountDeleteMutation();

  const user = meData?.data;
  const departments = departmentData?.data ?? [];

  const isProduction =
    process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost") &&
    !window.location.hostname.includes("127.0.0.1");

  const defaultValues = useMemo<ProfileSettingsFormValues>(
    () => ({
      name: user?.name ?? "",
      department: user?.department ?? "",
      accountType: user?.accountType ?? "",
      picture: user?.picture ?? "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }),
    [user?.name, user?.department, user?.accountType, user?.picture],
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsFormValues>({ defaultValues });

  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name ?? "",
      department: user.department ?? "",
      accountType: user.accountType ?? "",
      picture: user.picture ?? "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [user, reset]);

  const pictureValue = watch("picture");
  const newPasswordValue = watch("newPassword");
  const watchedName = watch("name");
  const watchedDepartment = watch("department");
  const watchedAccountType = watch("accountType");

  useEffect(() => {
    if (!pictureValue) {
      setPreviewUrl("");
      return;
    }
    if (typeof pictureValue === "string") {
      setPreviewUrl(pictureValue);
      return;
    }
    if (pictureValue instanceof FileList && pictureValue.length > 0) {
      const file = pictureValue[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
    setPreviewUrl("");
  }, [pictureValue]);

  /* ── Submit (update profile) ── */
  const onSubmit = async (data: ProfileSettingsFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("department", data.department);
      formData.append("accountType", data.accountType);
      formData.append("oldPassword", data.oldPassword || "");
      formData.append("newPassword", data.newPassword || "");
      formData.append("confirmPassword", data.confirmPassword || "");
      if (data.picture instanceof FileList && data.picture.length > 0) {
        const file = data.picture[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
          toast.error("Invalid file type. Only PNG, JPEG, and WebP images are allowed.");
          return;
        }
        formData.append("files", file);
      }
      const response = await updateUser(formData).unwrap();
      toast.success(response?.message || "Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile settings");
    }
  };

  const onInvalid = () => toast.error("Please fix the form errors");

  /* ── Delete account ── */
  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteUser(undefined).unwrap();
      if (response.success) {
        toast.success("Account deleted successfully");
        router.push("/");
        Cookies.remove("accessToken", {
          domain: isProduction ? ".elara.com" : undefined,
          secure: isProduction,
          sameSite: "Lax",
        });
        Cookies.remove("refreshToken", {
          domain: isProduction ? ".elara.com" : undefined,
          secure: isProduction,
          sameSite: "Lax",
        });
        dispatch(logout());
        await persistor.purge();
        localStorage.removeItem("persist:root");
        localStorage.removeItem("user");
        setShowDeleteModal(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete account");
    }
  };

  if (isMeLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <p className="text-sm text-slate-500">Loading profile…</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Delete Modal ── */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        isLoading={isDeleteLoading}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      <div className="min-h-screen bg-slate-50 p-6 md:p-10">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Profile Settings
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage your personal information and update your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onInvalid)} autoComplete="off">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* ── Left card ── */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full ring-4 ring-slate-100">
                      {previewUrl ? (
                        <Image
                          src={previewUrl}
                          alt="Profile"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-sm text-slate-400">No Image</span>
                      )}
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-slate-900">
                      {watchedName || ""}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {watchedDepartment || ""}
                    </p>
                    <span className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      {watchedAccountType || ""}
                    </span>
                    {user?.email && (
                      <p className="mt-3 text-sm text-slate-500">
                        {user.email}
                      </p>
                    )}

                    {/* ── Delete section ── */}
                    <div className="mt-6 w-full border-t border-slate-100 pt-5">
                      <p className="mb-3 text-xs text-slate-400">Danger Zone</p>
                      <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 size={15} />
                        Delete Account
                      </button>
                      <p className="mt-2 text-xs text-slate-400">
                        Permanently removes your account and all data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right cards ── */}
              <div className="space-y-6 lg:col-span-2">
                {/* Update Profile */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-5">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Update Profile
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Edit your basic profile information below.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        autoComplete="name"
                        {...register("name", {
                          required: "Full name is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary"
                        placeholder="Enter your name"
                      />
                      {errors.name?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.name.message)}
                        </p>
                      )}
                    </div>

                    {/* Department */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Update Department
                      </label>
                      <select
                        autoComplete="off"
                        {...register("department", {
                          required: "Department is required",
                        })}
                        disabled={isDepartmentLoading}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <option value="">
                          {isDepartmentLoading
                            ? "Loading departments…"
                            : "Select department"}
                        </option>
                        {departments.map((dept) => (
                          <option key={dept._id} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {errors.department?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.department.message)}
                        </p>
                      )}
                    </div>

                    {/* Department */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Current Department
                      </label>
                      <p className="mt-1 text-base w-full rounded-xl border border-slate-300 bg-white px-4 py-3  ">
                        {user?.department}
                      </p>
                    </div>

                    {/* Account Type */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Account Type
                      </label>
                      <select
                        autoComplete="off"
                        {...register("accountType", {
                          required: "Account type is required",
                        })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
                      >
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="ORGANIZATION">Organization</option>
                      </select>
                      {errors.accountType?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.accountType.message)}
                        </p>
                      )}
                    </div>

                    {/* Profile Picture */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        autoComplete="off"
                        accept="image/png, image/jpeg, image/webp"
                        {...register("picture")}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary"
                      />
                      {errors.picture?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.picture.message)}
                        </p>
                      )}
                      {previewUrl && (
                        <div className="mt-4">
                          <div className="relative h-24 w-24 overflow-hidden rounded-xl ring-1 ring-slate-200">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Update Password */}
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                  <div className="mb-5">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Update Password
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Make sure your new password is strong and secure.
                    </p>
                  </div>

                  <div className="grid gap-5">
                    {/* Old Password */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Old Password
                      </label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          autoComplete="new-password"
                          {...register("oldPassword")}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary"
                          placeholder="Enter old password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showOldPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.oldPassword?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.oldPassword.message)}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          autoComplete="new-password"
                          {...register("newPassword", {
                            validate: (value) => {
                              if (!value) return true;
                              return (
                                value.length >= 6 ||
                                "Password must be at least 6 characters"
                              );
                            },
                          })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showNewPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.newPassword?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.newPassword.message)}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          {...register("confirmPassword", {
                            validate: (value) => {
                              if (!newPasswordValue && !value) return true;
                              if (!value) return "Please confirm your password";
                              return (
                                value === newPasswordValue ||
                                "Passwords do not match"
                              );
                            },
                          })}
                          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword?.message && (
                        <p className="mt-1 text-xs text-red-500">
                          {String(errors.confirmPassword.message)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || isUpdating}
                    className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting || isUpdating ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
