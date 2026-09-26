"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ContainerImg from "@/assets/images/Container.png";
import { FaCircleCheck } from "react-icons/fa6";
import AccountTypeModal from "@/components/common/AccountTypeModal";

const features = [
  "Real-time dashboard with key metrics",
  "Department-level engagement insights",
  "Company values alignment tracking",
  "Export reports for leadership reviews",
];

export default function RecognitionHeroSection() {
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <section className="w-full bg-gradient-to-t from-[#f0f7ff] to-white">
      <div className="mx-auto grid min-h-[420px] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-16 lg:py-16">
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[560px]">
            <div className="relative mx-auto aspect-[1.28/1] w-full">
              <Image
                src={ContainerImg}
                alt="Recognition dashboard preview"
                fill
                priority
                className="object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="max-w-[540px] justify-self-center lg:justify-self-start">
          <h1 className="max-w-[520px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#123a63] text-xl md:text-3xl lg:text-4xl">
            Track recognition, Measure engagement, Align with values.
          </h1>

          <p className="mt-5 max-w-[500px] text-sm leading-7 text-[#5d6b79] sm:text-[15px]">
            Powerful admin tools give you complete visibility into your
            organization&apos;s culture and recognition patterns.
          </p>

          <ul className="mt-7 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-[#44515d] sm:text-[15px]">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <FaCircleCheck className="text-2xl text-[#f5b301]" />
                </span>
                <span className="leading-6">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setIsAccountModalOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#ff7a1a] shadow-sm ring-1 ring-[#f4ded0] transition hover:shadow-md"
          >
            Create Account
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <AccountTypeModal
            isOpen={isAccountModalOpen}
            onClose={() => setIsAccountModalOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}
