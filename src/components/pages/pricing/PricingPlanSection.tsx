import { FaCircleCheck } from "react-icons/fa6";

const plans = [
  {
    name: "Starter",
    subtitle: "Best for small teams and startups.",
    price: "Free",
    period: "/ Monthly",
    features: [
      "AI Recognition Messages",
      "Employee Points System",
      "Peer-to-Peer Recognition",
      "Reward Redemption",
      "Basic Analytics Dashboard",
      "Email Notifications",
    ],
  },
  {
    name: "Team",
    subtitle: "Best for growing teams.",
    price: "$8",
    period: "/ Monthly",
    features: [
      "Everything in Starter",
      "Advanced Analytics",
      "Department Insights",
      "Custom Rewards Catalog",
      "Admin Dashboard",
      "Slack / Teams Integration",
      "Manager Recognition Tools",
    ],
  },
  {
    name: "Enterprise",
    subtitle: "Best for large organizations.",
    price: "$20",
    period: "/ Monthly",
    features: [
      "Everything in Team",
      "Enterprise-Level Security",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Advanced Reporting",
      "API Access",
      "Priority Support",
    ],
  },
];

export default function PricingPlanSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="md:text-3xl text-2xl font-medium tracking-tight text-[#0b3c5d] lg:text-4xl">
            Pricing Plan
          </h2>
          <p className="mt-2 text-sm text-[#666] sm:text-base">
            Simple, transparent pricing for teams of all sizes.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl bg-[#eff6ff] p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <h3 className="md:text-3xl text-2xl font-medium leading-none text-[#0b3c5d]">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm text-[#555]">{plan.subtitle}</p>

              <div className="mt-4 flex items-end gap-1">
                <span className="lg:text-5xl text-3xl font-extrabold leading-none text-primary">
                  {plan.price}
                </span>
                <span className="pb-1 text-sm font-semibold text-[#222]">
                  {plan.period}
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-white px-4 py-5">
                <p className="text-sm font-bold text-[#2f2f2f]">Core Access</p>

                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#444]">
                      <FaCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                See Pricing Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
