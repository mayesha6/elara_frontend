"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import { persistor, RootState } from "@/redux/store";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const searchParams = useSearchParams();
  const token = useSelector((state: RootState) => state.auth?.token);

  const { data: profileData, isLoading: isProfileLoading } = useGetMeQuery(
    undefined,
    { skip: !token },
  );

  const user = profileData?.data ?? null;
  const tokenKeep = Cookies.get("accessToken");

  // ✅ Only true when both cookie AND user data are loaded
  const isAuthenticated = !!tokenKeep && !!user;

  // ✅ Only show spinner when there's actually a token/cookie to wait for
  const isLoadingAuth =
    (isProfileLoading && !!token) || (!!tokenKeep && !user && !!token);

  const domain = typeof window !== "undefined" ? window.location.origin : "";
  const isProduction =
    process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost") &&
    !window.location.hostname.includes("127.0.0.1");

  useEffect(() => {
    const logoutParam = searchParams.get("logout");
    if (logoutParam === "true") {
      const cookieOptions = {
        domain: ".elara.com",
        path: "/",
        secure: true,
        sameSite: "Lax" as const,
      };
      Cookies.remove("accessToken", cookieOptions);
      Cookies.remove("refreshToken", cookieOptions);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const cookieOptions = {
        domain: isProduction ? ".elara.com" : undefined,
        secure: isProduction,
        sameSite: "Lax" as const,
        path: "/",
      };
      Cookies.remove("accessToken", cookieOptions);
      Cookies.remove("refreshToken", cookieOptions);
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });

      dispatch(logout());
      await persistor.purge();
      localStorage.removeItem("persist:root");
      localStorage.removeItem("user");

      setIsDropdownOpen(false);
      router.push("/"); // ✅ hard navigate instead of refresh + refetch
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Recognition & Reward", href: "/recognition" },
    { name: "Pricing", href: "/pricing" },
    { name: "Redeem", href: "/redeem" },
    { name: "Resources", href: "/resources" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

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

  const getDashboardHref = (role?: string) => {
    let prefix = "user/dashboard";
    if (role === "SUPER_ADMIN") {
      prefix = "super-admin";
    } else if (role === "ORGANIZATION_ADMIN") {
      const orgName = user?.companyName || user?.name || "org-admin";
      prefix = slugify(orgName);
    } else if (role === "DEPARTMENT_ADMIN") {
      const orgObj = user?.organizationId;
      const orgName = orgObj?.companyName || orgObj?.name || (typeof orgObj === "string" ? orgObj : "dept-admin");
      prefix = `${slugify(orgName)}/dept-admin/dashboard`;
    } else if (role === "USER") {
      prefix = "user/dashboard";
    }

    let dashboardBaseUrl = "https://dashboard.elara.com";
    if (domain === "http://localhost:3041") {
      dashboardBaseUrl = "http://localhost:3010";
    }
    return `${dashboardBaseUrl}/${prefix}`;
  };

  const getRoleLabel = (role?: string) => {
    if (role === "SUPER_ADMIN") return "Super Admin";
    if (role === "ORGANIZATION_ADMIN") return "Org Admin";
    if (role === "DEPARTMENT_ADMIN") return "Dept Admin";
    if (role === "EMPLOYEE") return "Employee";
    return "User";
  };

  const getRoleBadgeClass = (role?: string) => {
    if (role === "SUPER_ADMIN") return "bg-purple-100 text-purple-700";
    if (role === "ORGANIZATION_ADMIN") return "bg-indigo-100 text-indigo-700";
    if (role === "DEPARTMENT_ADMIN") return "bg-amber-100 text-amber-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="container mx-auto h-18 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 select-none">
              Elara<span className="text-[#1877F2]">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 mx-6">
            {navLinks.map((link, index) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm whitespace-nowrap transition-colors duration-200
                    ${isActive
                      ? "text-gray-900 font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gray-900 after:rounded-full"
                      : "text-gray-500 font-medium hover:text-gray-900"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {isLoadingAuth ? (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 size={18} className="animate-spin" />
                <span className="text-sm">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 bg-primary hover:bg-black text-white rounded-full px-3 py-[6px] transition-colors duration-400"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border-1 border-white overflow-hidden">
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-orange-600 font-semibold text-lg">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="text-left text-xs text-white capitalize">
                      {getRoleLabel(user.role)}
                    </p>
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                      {user.wallet && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            Balance:
                          </span>
                          <span className="text-xs font-semibold text-orange-600">
                            {user.wallet.pointsBalance} pts
                          </span>
                        </div>
                      )}
                      <span
                        className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${getRoleBadgeClass(user.role)}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </div>

                    <div className="py-2">
                      {[
                        {
                          name: isSuperAdmin ? "Admin Dashboard" : "Dashboard",
                          href: getDashboardHref(user?.role),
                          icon: LayoutDashboard,
                        }
                      ].map((link, index) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={index}
                            href={link.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${isActive
                              ? "bg-orange-50 text-orange-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                              }`}
                          >
                            <Icon
                              size={18}
                              className={
                                isActive
                                  ? "text-orange-500"
                                  : "text-gray-400"
                              }
                            />
                            <span>{link.name}</span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <LogOut size={18} />
                      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold tracking-wide text-orange-500 hover:opacity-75 transition-opacity"
                >
                  LOGIN
                </Link>
                <Link
                  href="/demo"
                  className="px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 hover:-translate-y-px transition-all duration-200"
                >
                  Try Demo
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-[18px] bg-transparent border-none cursor-pointer p-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`block w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`block w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ${isMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 right-0 bg-white z-[45] border-b border-gray-200 shadow-lg md:hidden transition-all duration-300 ${isMenuOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
      >
        {navLinks.map((link, index) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors duration-200 ${isActive
                ? "text-orange-500 bg-orange-50 font-bold"
                : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                }`}
            >
              {link.name}
            </Link>
          );
        })}

        {/* Mobile User Section */}
        {isLoadingAuth ? (
          <div className="px-6 py-4 flex items-center gap-2 text-gray-400">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-sm">Loading profile...</span>
          </div>
        ) : isAuthenticated ? (
          <>
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden">
                  {user.picture ? (
                    <Image
                      src={user.picture}
                      alt="User Avatar"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-orange-600 font-semibold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  {user.wallet && (
                    <p className="text-xs text-orange-600 font-medium mt-0.5">
                      {user.wallet.pointsBalance} pts balance
                    </p>
                  )}
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getRoleBadgeClass(user.role)}`}
                  >
                    {getRoleLabel(user.role)}
                  </span>
                </div>
              </div>
            </div>

            {[
              {
                name: isSuperAdmin ? "Admin Dashboard" : "Dashboard",
                href: getDashboardHref(user?.role),
                icon: LayoutDashboard,
              }
            ].map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-b border-gray-100 transition-colors duration-200 ${isActive
                    ? "text-orange-500 bg-orange-50"
                    : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                    }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-b border-gray-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center px-5 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded-md hover:bg-orange-50 transition-colors"
            >
              LOGIN
            </Link>
            <Link
              href="/demo"
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-center px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
