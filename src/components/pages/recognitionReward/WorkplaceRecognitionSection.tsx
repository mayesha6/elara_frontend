import { TrendingUp, Handshake, Smile } from "lucide-react";

const cards = [
  {
    title: "80% Higher Engagement",
    description: "Teams that practice recognition regularly are more engaged.",
    icon: TrendingUp,
    iconBg: "bg-green-600",
  },
  {
    title: "Better Collaboration",
    description: "Recognition encourages teamwork and mutual support.",
    icon: Handshake,
    iconBg: "bg-orange-500",
  },
  {
    title: "Higher Employee Satisfaction",
    description: "Employees feel valued and motivated.",
    icon: Smile,
    iconBg: "bg-amber-500",
  },
];

export default function WorkplaceRecognitionSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#123d63] md:text-3xl lg:text-4xl">
            The Impact of Workplace Recognition
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Organizations that encourage regular recognition see stronger
            collaboration, higher engagement, and improved employee
            satisfaction.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                </div>

                <h3 className="mt-6 max-w-[220px] text-lg font-bold leading-[1.15] text-primary md:text-xl lg:text-2xl">
                  {card.title}
                </h3>

                <p className="mt-4 max-w-[250px] text-base leading-7 text-[#5f6b7a]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}