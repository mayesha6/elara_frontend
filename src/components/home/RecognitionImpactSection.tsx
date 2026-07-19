import { Award, TrendingUp, RefreshCw } from "lucide-react";

const items = [
  {
    title: "Quarterly Allocation\nControl",
    description: "Set defined limits to ensure balanced participation.",
    icon: Award,
  },
  {
    title: "Real-Time Balance\nTracking",
    description: "Employees see available and remaining points instantly.",
    icon: TrendingUp,
  },
  {
    title: "Engagement\nSustainability",
    description: "Quarter resets encourage continuous appreciation.",
    icon: RefreshCw,
  },
];

export default function RecognitionImpactSection() {
  return (
    <section className="w-full bg-[#e9ecf5] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl tracking-tight text-[#133d63]">
            Structured Recognition with
            <br className="hidden sm:block" />
            <span className="sm:ml-2">Real Impact</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#49586b] sm:text-base">
            Attach meaningful recognition points to every card. Control quarterly
            allocations. Maintain fairness and transparency across teams.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={index}
                className="rounded-2xl border border-[#d6dbe5] bg-[#f8f8f9] p-5 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ebe8f6]">
                  <Icon className="h-[18px] w-[18px] text-[#ff6b1a]" strokeWidth={2} />
                </div>

                <h3 className="mt-5 whitespace-pre-line font-bold leading-[1.08] tracking-[-0.02em] text-[#ff6b1a] text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[240px] text-base leading-6 text-[#5a6878]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
