import {
  Heart,
  Star,
  Trophy,
  BadgeCheck,
  CalendarDays,
  Gift,
  Users,
  Award,
} from "lucide-react";

const recognitionItems = [
  {
    title: "Peer-to-Peer Recognition",
    description:
      "Celebrate teams who make a different and support each other every day.",
    icon: Users,
    iconBg: "bg-orange-500",
  },
  {
    title: "Everyday Appreciation",
    description:
      "Recognizing the small efforts that contribute to team success.",
    icon: Heart,
    iconBg: "bg-green-600",
  },
  {
    title: "Thank You Note",
    description: "A simple yet powerful way to express gratitude.",
    icon: Star,
    iconBg: "bg-amber-500",
  },
  {
    title: "Employee Accomplishments",
    description:
      "Celebrate outstanding achievements and exceptional performance.",
    icon: Trophy,
    iconBg: "bg-violet-600",
  },
  {
    title: "Emerging Leader Recognition",
    description:
      "Recognizing future leaders who show initiative and potential.",
    icon: BadgeCheck,
    iconBg: "bg-pink-600",
  },
  {
    title: "Manager Excellence",
    description:
      "Acknowledging leaders who inspire teams and drive success.",
    icon: Award,
    iconBg: "bg-indigo-700",
  },
  {
    title: "Employee Milestones",
    description:
      "Celebrate career milestones, anniversaries, and important moments.",
    icon: CalendarDays,
    iconBg: "bg-sky-600",
  },
  {
    title: "Employee Welcome",
    description:
      "Welcome new team members and make them feel part of the team.",
    icon: Users,
    iconBg: "bg-green-700",
  },
  {
    title: "Special Occasions",
    description:
      "Celebrate birthdays, achievements, and meaningful company moments.",
    icon: Gift,
    iconBg: "bg-yellow-500",
  },
];

export default function WaysToRecognizeSection() {
  return (
    <section className="bg-[#eef2fb] py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[22px] font-medium leading-tight text-[#123d63] md:text-[34px]">
            Ways to Recognize Your Team
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5b6677] md:text-[15px]">
            Celebrate meaningful moments, contributions, and achievements that
            shape a positive workplace culture.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recognitionItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-xl border border-[#dfe5f2] bg-white px-5 py-5 shadow-[0_2px_8px_rgba(16,24,40,0.04)] transition duration-200 hover:-translate-y-0.5"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconBg}`}
                >
                  <Icon className="h-4 w-4 text-white" strokeWidth={2.2} />
                </div>

                <h3 className="mt-4 max-w-[180px] text-lg font-semibold leading-[1.15] tracking-[-0.02em] text-primary md:text-xl lg:text-[26px]">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[250px] text-[13px] leading-5 text-[#667085]">
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