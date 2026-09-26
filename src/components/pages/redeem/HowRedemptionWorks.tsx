import { Gift, ShoppingBag, Sparkles } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Earn Points",
    description:
      "Employees receive recognition and points from peers and managers.",
    icon: Gift,
  },
  {
    id: "02",
    title: "Browse Rewards",
    description:
      "Explore a marketplace of rewards including gift cards, experiences, and company perks.",
    icon: ShoppingBag,
  },
  {
    id: "03",
    title: "Redeem Instantly",
    description:
      "Redeem points easily and enjoy meaningful rewards.",
    icon: Sparkles,
  },
];

export default function HowRedemptionWorks() {
  return (
    <section className="bg-[#edf1ff] py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#163b63] md:text-[32px]">
            How Redemption Works
          </h2>
          <p className="mt-1 text-[11px] text-[#7f8a9a] md:text-xs">
            Three simple steps to Redemption Works
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-lg bg-[#fdfdfd] px-5 py-6 text-center"
              >
                <div className="absolute left-4 top-3 text-[36px] font-bold text-[#99a6cb]">
                  {step.id}
                </div>

                <div className="mx-auto mt-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Icon className="h-4 w-4 text-white" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-primary">
                  {step.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-[#6f7785]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}