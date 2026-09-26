import { IoMdArrowDown } from "react-icons/io";
export default function PricingHero() {
  return (
    <section className="w-full bg-white py-6 md:py-10">
      <div className="mx-auto container px-4">
        <div className="rounded-[22px] bg-[#eff6ff] px-6 py-14 text-center md:px-10 md:py-16">
          <h2 className="mx-auto max-w-2xl text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#111827] md:text-3xl lg:text-5xl">
            Choose the Right{" "}
            <span className="text-[#0b3c5d]">Plan</span>
            <br />
            <span className="text-[#0b3c5d]">for Your Team</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[13px] leading-6 text-[#5b6472] md:text-[14px]">
            Simple and transparent pricing designed for companies of all sizes.
            Start recognizing great work and building a positive workplace
            culture today.
          </p>

          <div className="mt-7">
            <button className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#166FE5]">
              See Pricing Plan
              <span className="ml-2 text-xl"> <IoMdArrowDown /> </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}