export default function FeatureComparisonTable() {
  const plans = [
    { name: "Starter", highlighted: false },
    { name: "Team", highlighted: true },
    { name: "Enterprise", highlighted: false },
  ];

  const features = [
    { name: "AI Recognition Messages", values: [true, true, true] },
    { name: "AI Recognition", values: [true, true, true] },
    { name: "Points System", values: [true, true, true] },
    { name: "Reward Marketplace", values: [false, true, true] },
    { name: "Admin Controls", values: [false, true, true] },
    { name: "Custom Integrations", values: [false, false, true] },
  ];

  return (
    <section className="w-full bg-[#eff6ff] px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-3xl font-medium tracking-tight text-[#0b3c5d] sm:mb-10 sm:text-4xl">
          Feature Comparison
        </h2>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse">
              <thead>
                <tr className="bg-[#f4f5f7]">
                  <th className="h-14 w-[42%] border-b border-r border-slate-200 px-4 text-left text-sm font-semibold text-slate-500 sm:px-6">
                    <span className="sr-only">Features</span>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`h-14 border-b border-slate-200 px-4 text-center text-sm font-semibold ${
                        plan.highlighted
                          ? "bg-[#e8edf9] text-[#ff6b35]"
                          : "text-slate-500"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {features.map((feature, rowIndex) => (
                  <tr key={feature.name} className="bg-white">
                    <td className="border-b border-r border-slate-200 px-4 py-4 text-sm font-medium text-[#ff6b35] sm:px-6 sm:py-5">
                      {feature.name}
                    </td>

                    {feature.values.map((value, valueIndex) => (
                      <td
                        key={`${feature.name}-${valueIndex}`}
                        className={`border-b border-slate-200 px-4 py-4 text-center sm:py-5 ${
                          valueIndex !== feature.values.length - 1
                            ? "border-r border-slate-200"
                            : ""
                        } ${
                          rowIndex === features.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <StatusIcon available={value} />
                      </td>
                    ))}
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

function StatusIcon({ available }: { available: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full border text-sm font-bold ${
        available
          ? "border-[#22c55e] text-[#16a34a]"
          : "border-[#ff6b6b] text-[#ff5a5a]"
      }`}
      aria-label={available ? "Included" : "Not included"}
    >
      {available ? "✓" : "×"}
    </span>
  );
}
