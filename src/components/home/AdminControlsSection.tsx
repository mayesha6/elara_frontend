"use client";

import Image from "next/image";
import {
  BarChart3,
  Users,
  BadgeCheck,
  FileText,
  ChevronRight,
  Circle,
  Minus,
  Square,
} from "lucide-react";

import adminPreview from "@/assets/images/admin-preview.png";

const features = [
  {
    icon: BarChart3,
    title: "Recognition\nAnalytics",
    description: "Track recognition activity across departments.",
  },
  {
    icon: Users,
    title: "Employee\nDirectory",
    description: "Manage users and roles with ease.",
  },
  {
    icon: BadgeCheck,
    title: "Company Values\nCustomization",
    description: "Align recognition with organizational principles.",
  },
  {
    icon: FileText,
    title: "Exportable\nReports",
    description: "Download structured reports for leadership insights.",
  },
];

export default function AdminControlsSection() {
  return (
    <section className="w-full bg-[#f97316] px-4 py-14 sm:px-6 md:py-16 lg:px-8">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-xl md:text-3xl lg:text-4xl tracking-tight text-white md:text-[38px] md:leading-tight">
          Powerful Admin Controls &amp; Insights
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Give HR teams full visibility into recognition trends, point distribution,
          and employee engagement.
        </p>

        {/* Browser/Image Card */}
        <div className="container mx-auto mt-10 overflow-hidden rounded-xl bg-white shadow-sm">
          {/* fake browser bar */}
          <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f3f4f6] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>

            <div className="hidden items-center gap-2 text-gray-400 sm:flex">
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              <ChevronRight className="h-3.5 w-3.5" />
            </div>

            <div className="mx-auto flex h-8 w-full max-w-[420px] items-center rounded-md bg-white px-3 shadow-sm">
              <span className="truncate text-xs text-gray-400">
                elara.com/admin/dashboard
              </span>
            </div>

            <div className="hidden items-center gap-2 text-gray-400 sm:flex">
              <Circle className="h-3.5 w-3.5" />
              <Minus className="h-3.5 w-3.5" />
              <Square className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* image wrapper */}
          <div className="bg-gradient-to-b from-[#0b63b6] to-[#43b0e6] p-3 sm:p-4 md:p-5">
            <div className="overflow-hidden rounded-lg bg-white">
              <Image
                src={adminPreview}
                alt="Admin dashboard preview"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 md:grid-cols-4 md:gap-x-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/15 text-white backdrop-blur-sm">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>

                <h3 className="whitespace-pre-line text-base font-semibold leading-tight text-white sm:text-lg">
                  {feature.title}
                </h3>

                <p className="mt-2 max-w-[220px] text-xs leading-relaxed text-white/85 sm:text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-medium text-[#f97316] shadow-sm transition hover:bg-orange-50"
          >
            Explore Admin Features
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}