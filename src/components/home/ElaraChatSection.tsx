import { FaCircleCheck } from "react-icons/fa6";

const features = [
  "Professional tone control",
  "Value-aligned messaging",
  "Regenerate instantly",
  "Editable when needed",
];

export default function ElaraChatSection() {
  return (
    <section className="w-full bg-[#f9fafb] py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

        {/* CARD */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="bg-[#0F7587] w-[280px] sm:w-[320px] rounded-md p-6 text-white">

            <h2 className="text-2xl font-bold mb-6">Elara</h2>

            <div className="text-xs text-white/70">
              <p>To:</p>
              <p className="text-lg text-white font-medium mt-1">
                Sarah Ahmed
              </p>
              <p className="text-[10px] text-white/60">
                Engineering Department
              </p>
            </div>

            <div className="mt-5 bg-white/10 rounded-md p-4 text-[11px] leading-relaxed text-white/90">
              Sarah, your exceptional work on the Q4 project truly exemplifies
              our core value of Excellence. Your dedication and attention to
              detail made a significant impact on the team&apos;s success. Thank you
              for your outstanding contribution!
            </div>

            <div className="flex justify-between items-center mt-6">
              <span className="text-[11px] bg-[#1E8FA5] px-3 py-1 rounded">
                Teamwork
              </span>

              <span className="text-[11px] text-[#F1C40F] bg-[#1E8FA5] px-3 py-1 rounded">
                100 Pts
              </span>
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="max-w-xl">
          <h1 className="text-xl md:text-3xl lg:text-4xl text-[#1B4965] leading-tight">
            AI That Understands
            <br />
            Professional Culture
          </h1>

          <p className="mt-5 text-gray-600 leading-relaxed md:text-base text-sm">
            Elara&apos;s AI crafts workplace-ready messages aligned with tone,
            values, and organizational standards — eliminating awkward wording
            and saving time.
          </p>

          <div className="mt-6 space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <FaCircleCheck className="text-green-500 w-5 h-5" />
                <span className="text-gray-700 md:text-base text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}