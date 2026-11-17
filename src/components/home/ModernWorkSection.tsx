import Image from "next/image";
import desktopImg from "@/assets/images/d1.png";
import mobileImg from "@/assets/images/m1.png";

export default function ModernWorkSection() {
  return (
    <section className="bg-[#f8fafc] px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl tracking-[-0.02em] text-[#123a5a]">
            Built for Modern Work — Anywhere
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#5f6770] sm:text-[15px]">
            Fully optimized for mobile and desktop, Elara enables
            professionals to recognize teammates on the go or at their
            workstation — in just a few taps.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          <div className="rounded-[14px] bg-white p-3 shadow-sm ring-1 ring-black/5 sm:p-4">
            <div className="pb-3 text-center md:text-[20px] text-[#123a5a] text-base">
              Desktop View
            </div>
            <div className="mx-auto max-w-[520px]">
              <Image
                src={desktopImg}
                alt="Desktop dashboard preview"
                priority
                width={744}
                height={602}
                className="mx-auto h-auto w-full max-w-[744px] drop-shadow-sm"
              />
            </div>
          </div>
          <div className="rounded-[14px] bg-white p-3 shadow-sm ring-1 ring-black/5 sm:p-4">
            <div className="pb-3 text-center md:text-[20px] text-[#123a5a] text-base">
              Mobile View
            </div>
            <div className="mx-auto max-w-[520px]">
              <Image
                src={mobileImg}
                alt="Mobile dashboard preview"
                priority
                width={744}
                height={602}
                className="mx-auto h-auto w-full max-w-[744px] drop-shadow-sm"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
