import { UserPlus, BadgeHelp, Sparkles } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Choose the Recipient",
    description:
      "Select a colleague or team member you want to recognize.",
    icon: UserPlus,
  },
  {
    id: "02",
    title: "Add Recognition Details",
    description:
      "Choose the recognition type and optionally attach reward points.",
    icon: BadgeHelp,
  },
  {
    id: "03",
    title: "Send Recognition",
    description:
      "Send the recognition instantly and celebrate the achievement.",
    icon: Sparkles,
  },
];

export default function HowRecognitionWorks() {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight text-[#123d63]">
            How Recognition Works
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-2xl bg-[#f9fafb] px-6 pb-8 pt-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <span className="absolute left-5 top-4 text-[42px] font-extrabold leading-none text-[#7f92c4]">
                  {step.id}
                </span>

                <div className="mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff7a1a] shadow-sm">
                  <Icon className="h-5 w-5 text-white" strokeWidth={2.2} />
                </div>

                <h3 className="mx-auto mt-5 max-w-[220px] text-xl font-extrabold leading-snug text-[#ff6a00]">
                  {step.title}
                </h3>

                <p className="mx-auto mt-4 max-w-[230px] text-sm leading-6 text-[#5f6673]">
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