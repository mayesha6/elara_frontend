import { Users, Building2, Award, Star } from "lucide-react";

export default function TestimonialsBanner() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Employees",
    },
    {
      icon: Building2,
      value: "500+",
      label: "Companies Trust Us",
    },
    {
      icon: Award,
      value: "1M+",
      label: "Recognitions Sent",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
    },
  ];

  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="mx-auto container px-4">
        <div className="rounded-2xl bg-[#eaf2fb] px-6 py-12 text-center md:px-10 md:py-14">
          
          {/* Heading */}
          <h2 className="text-2xl font-medium leading-tight text-[#111827] md:text-3xl lg:text-4xl">
            Loved by Teams{" "}
            <span className="block text-[#1f4e79]">Everywhere</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#6b7280] md:text-base">
            Discover how companies across industries are transforming their
            workplace culture with Elara&apos;s recognition and rewards platform.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 mx-auto max-w-3xl">
            {stats.map((item, index) => {
              // const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-5 shadow-sm"
                >
                  {/* <Icon className="mb-2 h-5 w-5 text-[#1f4e79]" /> */}
                  <p className="lg:text-3xl md:text-2xl text-lg font-bold text-[#111827]">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-[#6b7280] text-center">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}