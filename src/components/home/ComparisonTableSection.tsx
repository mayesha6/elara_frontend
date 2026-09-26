import { Check, X } from "lucide-react";

const comparisonRows = [
  {
    feature: "Message Generation",
    traditional: "Static templates",
    elara: "AI-powered message generation",
  },
  {
    feature: "Recognition System",
    traditional: "No structured rewards",
    elara: "Structured points system",
  },
  {
    feature: "Analytics & Reporting",
    traditional: "No analytics",
    elara: "Full admin reporting",
  },
  {
    feature: "Brand Alignment",
    traditional: "Limited brand alignment",
    elara: "Full brand customization",
  },
  {
    feature: "Company Values",
    traditional: "Generic messaging",
    elara: "Value-aligned recognition",
  },
];

export default function ComparisonTableSection() {
  return (
    <section className="bg-gradient-to-t from-[#f0f7ff] to-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#123d63]">
            Why Elara Stands Apart
          </h2>
        </div>

        <div className="mt-10 overflow-hidden rounded-[10px] bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5 md:mt-12">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-separate border-spacing-0 text-left">
              <thead>
                <tr>
                  <th className="bg-[#f4f4f5] px-6 py-5 text-sm font-semibold text-transparent">
                    Feature
                  </th>
                  <th className="bg-[#f4f4f5] px-6 py-5 text-center text-[18px] font-semibold text-[#586173]">
                    Traditional E-Cards
                  </th>
                  <th className="bg-[#e8edf9] px-6 py-5 text-left text-[18px] font-semibold text-[#ff6a1a]">
                    Elara
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={row.feature}>
                    <td
                      className={`border-b border-r border-[#e6e6e8] px-6 py-5 text-[17px] font-semibold text-[#ff6a1a] ${
                        index === 0 ? "border-t" : ""
                      }`}
                    >
                      {row.feature}
                    </td>

                    <td
                      className={`border-b border-r border-[#e6e6e8] px-6 py-5 text-[15px] text-[#697386] ${
                        index === 0 ? "border-t" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <X className="h-4 w-4 shrink-0 text-[#ff4b4b]" strokeWidth={2.2} />
                        <span>{row.traditional}</span>
                      </div>
                    </td>

                    <td
                      className={`border-b border-[#e6e6e8] px-6 py-5 text-[15px] text-[#334155] ${
                        index === 0 ? "border-t" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-[#22c55e]" strokeWidth={2.2} />
                        <span>{row.elara}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
