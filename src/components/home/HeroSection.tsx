"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// 👇 Update this path to match your actual image file
import heroImg from "@/assets/images/hero.png";

import Link from "next/link";
import AccountTypeModal from "@/components/common/AccountTypeModal";

const HeroSection = () => {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const tokenKeep = Cookies.get("accessToken");

  const domain = typeof window !== "undefined" ? window.location.origin : "";

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

  const handleSendRecognition = () => {
    if (tokenKeep) {
      let prefix = "user/dashboard";
      try {
        const decoded = jwtDecode<{ role?: string }>(tokenKeep);
        const role = decoded?.role;

        let orgName = "";
        try {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const parsed = JSON.parse(storedUser);
            if (role === "ORGANIZATION_ADMIN") {
              orgName = parsed.companyName || parsed.name || "";
            } else if (role === "DEPARTMENT_ADMIN") {
              const orgObj = parsed.organizationId;
              orgName = orgObj?.companyName || orgObj?.name || (typeof orgObj === "string" ? orgObj : "");
            }
          }
        } catch (e) {
          console.error("Failed to parse user from localStorage:", e);
        }

        if (role === "SUPER_ADMIN") prefix = "super-admin";
        else if (role === "ORGANIZATION_ADMIN") {
          prefix = orgName ? slugify(orgName) : "org-admin";
        } else if (role === "DEPARTMENT_ADMIN") {
          prefix = orgName ? `${slugify(orgName)}/dept-admin/dashboard` : "dept-admin/dashboard";
        } else if (role === "USER") prefix = "user/dashboard";
      } catch (err) {
        console.error("Token decoding failed", err);
      }

      const dashboardBaseUrl =
        domain === "http://localhost:3041"
          ? "http://localhost:3010"
          : "https://dashboard.elara.com";

      window.location.href = `${dashboardBaseUrl}/${prefix}`;
    }
  };
  return (
    <section className="container md:mx-auto rounded-2xl bg-[#EEF3FB] flex items-center px-6 md:px-12 py-8 md:py-6 overflow-hidden mt-8">
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 lg:gap-16">
        {/* ── Left Content ── */}
        <div className="flex-1 md:max-w-[560px] w-auto text-center md:text-left">
          {/* Headline */}
          <h1 className="text-xl md:text-3xl lg:text-5xl font-medium leading-[1.1] tracking-tight text-primary mb-5">
            Recognition in
            <br />
            Seconds <span className="text-[#1B7A9E]">Powered</span>
            <br />
            <span className="text-[#1B7A9E]">by AI.</span>
          </h1>

          {/* Sub-copy */}
          <p className="text-[#555] text-[0.97rem] sm:text-base leading-relaxed mb-8 max-w-[410px]">
            Create meaningful workplace appreciation without writing a single
            word. Professional, structured, and measurable recognition for
            modern teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {tokenKeep ? (
              <>
                <button
                  onClick={handleSendRecognition}
                  className="w-full lg:w-auto flex items-center gap-2 bg-primary hover:bg-primary active:scale-95 text-white font-semibold text-sm px-6 py-4 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Open Workspace
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <>
                {/* Primary — orange filled */}
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-95 text-white font-semibold text-sm px-6 py-4 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Create Account
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </button>

                {/* Secondary — orange outlined */}
                <Link
                  href={"/login"}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 border border-primary text-primary hover:bg-[#eff6ff] active:scale-95 font-semibold text-sm px-6 py-4 rounded-lg transition-all duration-200 bg-white shadow-sm"
                >
                  Sign in to Elara
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </Link>
              </>
            )}
          </div>

          <AccountTypeModal
            isOpen={isAccountModalOpen}
            onClose={() => setIsAccountModalOpen(false)}
          />

          {/* Trust line */}
          <p className="text-[#999] text-sm">
            No complex setup. No writing required.
          </p>
        </div>

        {/* ── Right Image ── */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src={heroImg}
            alt="Elara app preview on laptop and mobile"
            className="w-full max-w-[480px] md:max-w-[560px] lg:max-w-[660px] object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
