import {
  Gift,
  BriefcaseBusiness,
  Utensils,
  Laptop,
  SunMedium,
  Gamepad2,
} from "lucide-react";

const rewards = [
  {
    title: "Gift Cards",
    description: "Amazon, Starbucks, and more",
    icon: Gift,
  },
  {
    title: "Travel Experiences",
    description: "Hotels, flights, getaways",
    icon: BriefcaseBusiness,
  },
  {
    title: "Dining Vouchers",
    description: "Local restaurants & cafes",
    icon: Utensils,
  },
  {
    title: "Tech Gadgets",
    description: "Latest electronics & accessories",
    icon: Laptop,
  },
  {
    title: "Vacation Days",
    description: "Extra paid time off",
    icon: SunMedium,
  },
  {
    title: "Entertainment",
    description: "Movie tickets, concerts, events",
    icon: Gamepad2,
  },
];

export default function RewardsMarketplace() {
  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[980px]">
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="lg:text-4xl md:text-3xl text-2xl font-medium tracking-[-0.02em] text-[#0b3c5d]">
            Rewards Marketplace
          </h2>
          <p className="mx-auto mt-2 max-w-[470px] text-[13px] leading-6 text-[#5f6c7b] sm:text-[14px]">
            Our rewards marketplace offers flexible options so employees can
            choose rewards that truly matter to them.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-4">
          {rewards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-[10px] border border-[#e6e6e6] bg-white px-4 py-4 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:shadow-sm sm:px-5 sm:py-5"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#f3f0ff]">
                  <Icon className="h-[18px] w-[18px] text-[#1f2937]" strokeWidth={1.9} />
                </div>

                <h3 className="text-[18px] font-bold leading-6 text-primary sm:text-[20px]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[13px] leading-5 text-[#5f6c7b] sm:text-[14px]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}