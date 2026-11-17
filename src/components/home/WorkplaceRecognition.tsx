"use client";

import { Clock, Target, BarChart3 } from "lucide-react";

export default function WorkplaceRecognition() {
  const items = [
    {
      icon: Clock,
      title: "It Takes Too Long",
      desc: "Writing thoughtful recognition messages slows teams down.",
    },
    {
      icon: Target,
      title: "It’s Inconsistent",
      desc: "Recognition isn't structured, tracked, or aligned with company values.",
    },
    {
      icon: BarChart3,
      title: "It’s Not Measurable",
      desc: "Without data, appreciation lacks visibility and impact.",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-16 px-6">
      <div className="container mx-auto text-center">

        {/* Heading */}
        <h2 className="text-xl md:text-3xl lg:text-4xl text-[#214a63] mb-12">
          Workplace Recognition Is Broken
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl md:p-8 p-4 text-left shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-5">
                  <Icon className="text-red-500" size={22} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-orange-500 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <p className="mt-12 text-orange-500 font-medium">
          Elara fixes all three — in under 60 seconds.
        </p>
      </div>
    </section>
  );
}