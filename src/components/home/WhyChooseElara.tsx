"use client";

import { Brain, Shield, Zap } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";

export default function WhyChooseElara() {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI-Powered Recognition",
      description1:
        "Writing meaningful recognition messages can sometimes feel difficult or time-consuming. Elara uses advanced artificial intelligence to generate thoughtful and professional appreciation messages instantly.",
      description2:
        "Our AI understands workplace communication and helps employees express gratitude in a clear and meaningful way, ensuring every recognition message feels genuine and impactful.",
      points: [
        "AI-generated recognition messages",
        "Professional workplace tone suggestions",
        "Consistent and meaningful appreciation",
        "Saves time for employees and managers",
      ],
      iconColor: "bg-purple-500",
      textColor: "text-orange-500",
    },
    {
      icon: Shield,
      title: "The Safest Recognition Platform",
      description1:
        "Trust and privacy are essential when building a recognition culture. Elara is designed with security and reliability at its core, ensuring that all recognition messages and employee interactions remain protected.",
      description2:
        "Our platform follows secure infrastructure practices so organizations can confidently encourage appreciation without worrying about data safety.",
      points: [
        "Secure employee recognition environment",
        "Protected company and employee data",
        "Reliable platform performance",
        "Designed for organizations of all sizes",
      ],
      iconColor: "bg-green-600",
      textColor: "text-orange-500",
    },
    {
      icon: Zap,
      title: "The Fastest Recognition Program",
      description1:
        "Great work deserves to be recognized immediately. Elara simplifies the recognition process so employees can celebrate achievements in just a few clicks.",
      description2:
        "With a streamlined workflow and intuitive interface, team members can send appreciation instantly, making recognition a natural part of everyday work.",
      points: [
        "Send recognition in seconds",
        "Simple and intuitive user experience",
        "Encourages frequent appreciation",
        "Helps build a positive workplace culture",
      ],
      iconColor: "bg-yellow-500",
      textColor: "text-orange-500",
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-16 px-6">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-xl md:text-3xl lg:text-4xl text-slate-800">
            Why Teams Choose Elara
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto md:text-base text-sm leading-relaxed">
            Elara combines intelligent technology, speed, and security to
            create a recognition platform that helps organizations celebrate
            achievements and build stronger workplace connections.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-xl md:p-8 p-4 shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${item.iconColor}`}
                >
                  <Icon size={24} />
                </div>

                {/* Title */}
                <h3
                  className={`mt-6 text-xl font-semibold ${item.textColor}`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {item.description1}
                </p>

                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {item.description2}
                </p>

                {/* Points */}
                <ul className="mt-6 space-y-3">
                  {item.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <FaCircleCheck size={18} className="text-green-500 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}