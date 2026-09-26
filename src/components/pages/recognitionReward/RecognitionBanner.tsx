// import { CheckCircle2, Plus } from "lucide-react";
// import { Button } from "../../ui/button";

// const RecognitionBanner = () => {
//   const features = [
//     "AI-Assisted Messages",
//     "Instant Sending",
//     "Reward Points",
//   ];

//   return (
//     <section className="container mx-auto mt-8 px-4">
//       <div className="rounded-[24px] bg-[#EEF3FB] px-6 py-8 md:px-10 lg:px-14 lg:py-10">
//         <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-10 lg:gap-14">
//           {/* Left Content */}
//           <div className="w-full max-w-[560px] text-center md:text-left">
//             <h2 className="text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111827]md:text-[46px]">
//               Recognition That <span className="text-[#0b3c5d]">Builds</span>
//               <br />
//               <span className="text-[#0b3c5d]">Stronger Teams</span>
//             </h2>

//             <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-[#5B6472] md:text-[15px]">
//               Our recognition and reward system makes it easy for employees and
//               managers to celebrate meaningful contributions. From everyday
//               appreciation to major milestones, every recognition moment
//               strengthens team connections and motivates continued success.
//             </p>

//             <Button className="mt-7 h-[42px] rounded-md bg-[#FF7A1A] px-5 text-[13px] font-semibold text-white shadow-none hover:bg-[#eb6f16]">
//               <Plus className="mr-2 h-4 w-4" />
//               Send Recognition
//             </Button>
//           </div>

//           {/* Right Card */}
//           <div className="w-full max-w-[380px]">
//             <div className="rounded-[10px] bg-white p-3 shadow-[0_18px_35px_rgba(15,23,42,0.16)]">
//               {/* Orange top card */}
//               <div className="rounded-[8px] bg-[#FF7A1A] p-4 text-white">
//                 <div className="flex items-start gap-2">
//                   <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/50">
//                     <span className="block h-2 w-2 rounded-full bg-white" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[10px] font-medium leading-none text-white/80">
//                       Send Recognition
//                     </p>
//                     <h3 className="mt-1 text-[15px] font-semibold leading-none">
//                       Team Appreciation
//                     </h3>
//                   </div>
//                 </div>

//                 <div className="mt-4 rounded-[6px] bg-white/12 px-3 py-2.5">
//                   <p className="text-[10px] font-semibold text-white/85">
//                     Recognition Message
//                   </p>
//                   <p className="mt-1 text-[11px] leading-4 text-white/95">
//                     Great job on the project launch! Your dedication made all
//                     the difference.
//                   </p>
//                 </div>
//               </div>

//               {/* Feature list */}
//               <div className="mt-3 space-y-2">
//                 {features.map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-center gap-2 rounded-[6px] bg-[#F6F7F9] px-3 py-3"
//                   >
//                     <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
//                     <span className="text-[12px] font-medium text-[#6B7280]">
//                       {item}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RecognitionBanner;

"use client";

import { CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const LOGIN_URL = "/login"; // ← your login route

// ── Simple Login Prompt Modal ─────────────────────────────────────────────────
function LoginPromptModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-[360px] rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Content */}
        <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF3FB] mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0b3c5d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <h2 className="text-[18px] font-extrabold text-[#111827]">
            Login Required
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-[#6B7280]">
            You need to be logged in to send recognition to your team members.
          </p>
        </div>

        <div className="h-px bg-[#F3F4F6] mx-6" />

        {/* Buttons */}
        <div className="flex gap-3 px-6 py-5">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 h-[42px] rounded-lg border border-[#E5E7EB] text-[13px] font-semibold text-[#374151]"
          >
            Cancel
          </Button>
          <Link
            href={LOGIN_URL}
            className="flex-1 h-[42px] rounded-lg bg-[#FF7A1A] flex items-center justify-center text-[13px] font-semibold text-white hover:bg-[#eb6f16] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Banner ────────────────────────────────────────────────────────────────────
const RecognitionBanner = () => {
  const features = ["AI-Assisted Messages", "Instant Sending", "Reward Points"];

  // 👇 Replace with your real auth check
  const tokenKeep = Cookies.get("accessToken");

  const domain = typeof window !== "undefined" ? window.location.origin : "";

  const [showModal, setShowModal] = useState(false);

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
    } else {
      setShowModal(true); // ← this will now actually fire
    }
  };

  return (
    <>
      {showModal && <LoginPromptModal onClose={() => setShowModal(false)} />}

      <section className="container mx-auto mt-8 px-4">
        <div className="rounded-[24px] bg-[#EEF3FB] px-6 py-8 md:px-10 lg:px-14 lg:py-10">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-10 lg:gap-14">
            {/* Left */}
            <div className="w-full max-w-[560px] text-center md:text-left">
              <h2 className="text-2xl font-extrabold leading-[1.15] tracking-[-0.02em] text-[#111827] md:text-[46px]">
                Recognition That <span className="text-[#0b3c5d]">Builds</span>
                <br />
                <span className="text-[#0b3c5d]">Stronger Teams</span>
              </h2>
              <p className="mt-5 max-w-[500px] text-[14px] leading-7 text-[#5B6472] md:text-[15px]">
                Our recognition and reward system makes it easy for employees
                and managers to celebrate meaningful contributions. From
                everyday appreciation to major milestones, every recognition
                moment strengthens team connections and motivates continued
                success.
              </p>
              <Button
                onClick={handleSendRecognition}
                className="mt-7 h-[42px] rounded-md bg-[#FF7A1A] px-5 text-[13px] font-semibold text-white shadow-none hover:bg-[#eb6f16]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Send Recognition
              </Button>
            </div>

            {/* Right Card */}
            <div className="w-full max-w-[380px]">
              <div className="rounded-[10px] bg-white p-3 shadow-[0_18px_35px_rgba(15,23,42,0.16)]">
                <div className="rounded-[8px] bg-[#FF7A1A] p-4 text-white">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/50">
                      <span className="block h-2 w-2 rounded-full bg-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium leading-none text-white/80">
                        Send Recognition
                      </p>
                      <h3 className="mt-1 text-[15px] font-semibold leading-none">
                        Team Appreciation
                      </h3>
                    </div>
                  </div>
                  <div className="mt-4 rounded-[6px] bg-white/12 px-3 py-2.5">
                    <p className="text-[10px] font-semibold text-white/85">
                      Recognition Message
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-white/95">
                      Great job on the project launch! Your dedication made all
                      the difference.
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {features.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-[6px] bg-[#F6F7F9] px-3 py-3"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#22C55E]" />
                      <span className="text-[12px] font-medium text-[#6B7280]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecognitionBanner;
