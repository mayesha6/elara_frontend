"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Facebook, Linkedin, Twitter } from "lucide-react";
import AccountTypeModal from "@/components/common/AccountTypeModal";

const productLinks = [
  "Home",
  "Recognition & Reward",
  "Pricing",
  "Redeem",
  "Resources",
  "Testimonials",
];

const legalLinks = ["Privacy Policy", "Terms of Service"];

export default function Footer() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <footer className="bg-[#1877F2] text-white">
      <div className="container mx-auto px-5 pb-0 pt-12 sm:px-8 sm:pt-14 lg:px-10 lg:pt-[58px]">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_0.55fr_0.55fr_0.9fr] lg:gap-10">
          <div className="max-w-xl">
            <h2 className="md:text-[56px] text-3xl font-black leading-none tracking-[-0.03em] sm:text-[68px] text-white">
              Elara<span className="text-blue-200">.</span>
            </h2>

            <p className="mt-5 max-w-[560px] text-lg leading-8 text-white/95 sm:text-[15px] sm:leading-8 lg:text-[15px]">
              AI-powered workplace recognition that feels human.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(true)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1877F2] shadow-sm transition hover:bg-blue-50"
              >
                Create Account
                <ArrowUpRight className="h-4 w-4" />
              </button>

              <Link
                href="/login"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1877F2] shadow-sm transition hover:bg-blue-50"
              >
                Sign in to Elara
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <AccountTypeModal
              isOpen={isAccountModalOpen}
              onClose={() => setIsAccountModalOpen(false)}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide underline underline-offset-4">
              Product
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/95 transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide underline underline-offset-4">
              Legal
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/95 transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide underline underline-offset-4">
              Contact Info
            </h3>

            <div className="mt-5 space-y-5 text-sm leading-7 text-white/95">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white">
                  Address:
                </p>
                <p>[Your Office Address], Bangladesh</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white">
                  Phone:
                </p>
                <a href="tel:+880XXXXXXXXXX" className="hover:text-white">
                  +880 XXXXXXXXXX
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white">
                  Email:
                </p>
                <a href="mailto:info@yourcompany.com" className="hover:text-white">
                  info@yourcompany.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-9 border-t border-white/25">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-5 text-sm text-white/95 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 Elara. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white transition hover:opacity-80"
            >
              <Facebook className="h-[18px] w-[18px] fill-current" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-white transition hover:opacity-80"
            >
              <Twitter className="h-[18px] w-[18px] fill-current" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white transition hover:opacity-80"
            >
              <Linkedin className="h-[18px] w-[18px] fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
