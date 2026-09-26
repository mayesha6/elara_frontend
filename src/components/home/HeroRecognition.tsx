"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import HeroImage from "@/assets/images/w1.png";
import AccountTypeModal from "@/components/common/AccountTypeModal";

export default function HeroRecognition() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <section className="w-full bg-[#FB741F] overflow-hidden">
      <div className="container mx-auto flex items-center px-6 pt-12 md:px-10  lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6">
          {/* Left Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[470px]">
              <Image
                src={HeroImage}
                alt="Elara app preview"
                width={900}
                height={1200}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="max-w-[620px] text-center lg:text-left">
            <h1 className="max-w-[580px] text-xl md:text-3xl lg:text-4xl text-white">
              Make Workplace Recognition Effortless.
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-8 text-white/90 sm:text-lg lg:mx-0">
              Empower your team with AI-driven appreciation that is fast, fair,
              and measurable.
            </p>

            <div className="mt-10">
              <button
                onClick={() => setIsAccountModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-4 text-sm font-medium text-[#FB741F] shadow-sm transition hover:scale-[1.02] hover:shadow-md"
              >
                Create Account
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <AccountTypeModal
              isOpen={isAccountModalOpen}
              onClose={() => setIsAccountModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
