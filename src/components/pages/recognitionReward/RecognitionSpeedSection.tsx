import { BadgeCheck, Zap } from "lucide-react";

const RecognitionSpeedSection = () => {
  const items = [
    "Attach reward points to recognition",
    "Attach reward points to recognition",
    "Attach reward points to recognition",
    "Attach reward points to recognition",
  ];

  return (
    <section className="container mx-auto mt-8 px-4 py-8">
      <div className="mx-auto max-w-6xl rounded-[14px] bg-gradient-to-b from-[#f0f7ff] to-white px-6 py-12 md:px-16 md:py-16">
        <div className="flex flex-col items-center text-center">
          {/* Top Icon */}
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] bg-primary shadow-sm">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-primary md:text-[32px]">
            Send Recognition in Seconds
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-[660px] text-[13px] leading-6 text-[#5F6673] md:text-[14px]">
            Recognizing great work shouldn&apos;t take time or effort. With our
            simple recognition system, employees can send appreciation instantly
            while reinforcing company values and teamwork.
          </p>

          {/* Features */}
          <div className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex h-[40px] items-center gap-2 rounded-[4px] border border-[#E6EAF0] bg-white px-3 shadow-[0_1px_2px_rgba(16,24,40,0.03)]"
              >
                <BadgeCheck className="h-4 w-4 text-[#22C55E]" strokeWidth={2} />
                <span className="text-[11px] font-medium text-[#5F6673] md:text-[12px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecognitionSpeedSection;