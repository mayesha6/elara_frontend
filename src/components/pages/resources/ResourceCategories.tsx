import { Users, CircleDot, BookOpen } from "lucide-react";

const categories = [
  {
    title: "Workplace Culture",
    description: "Articles about building a positive workplace environment.",
    icon: Users,
  },
  {
    title: "Employee Engagement",
    description: "Strategies to keep employees motivated and productive.",
    icon: CircleDot,
  },
  {
    title: "Recognition Strategy",
    description: "Best practices for designing effective recognition programs.",
    icon: BookOpen,
  },
];

export default function ResourceCategories() {
  return (
    <section className="bg-[#f8fafc] py-10 md:py-12">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-[#123b63]">
          Resource Categories
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-3">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="rounded-md bg-white px-5 py-5">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#ff7a1a]">
                  <Icon className="h-4 w-4 text-white" strokeWidth={2.1} />
                </div>

                <h3 className="mt-4 text-base font-semibold text-[#ff6a00]">
                  {item.title}
                </h3>

                <p className="mt-2 text-[12px] leading-5 text-[#6f7785]">
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