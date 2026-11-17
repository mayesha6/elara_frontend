import { User } from "lucide-react";
import Image from "next/image";
import { BsTwitterX } from "react-icons/bs";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Eleanor Pena",
      role: "Nation - National Group",
      twitter: "https://twitter.com/eleanorpena",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      quote:
        '"Elara has transformed how we celebrate achievements across our organization. Peer recognitions have boosted team morale immensely."',
    },
    {
      id: 2,
      name: "Wade Warren",
      role: "Jaco - Jaguar Corporation",
      twitter: "https://twitter.com/wadewarren",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote:
        '"The rewards redemption catalog and instant kudos make appreciation effortless and meaningful for all team members."',
    },
    {
      id: 3,
      name: "Jacob Jones",
      role: "VG - Van Group",
      twitter: "https://twitter.com/jacobjones",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      quote:
        '"With Elara, our department has seen a noticeable increase in employee engagement and team alignment."',
    },
    {
      id: 4,
      name: "Kristin Watson",
      role: "UKco - United Kingdom Co.",
      twitter: "https://twitter.com/kristinwatson",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      quote:
        '"Managing company values and rewarding milestones has never been this seamless for our HR team."',
    },
    {
      id: 5,
      name: "Cameron Williamson",
      role: "Tech - Technologies Co.",
      twitter: "https://twitter.com/cameronw",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      quote:
        '"Elara makes every team member feel valued. It\'s the highlight of our daily workplace culture."',
    },
    {
      id: 6,
      name: "Darlene Robertson",
      role: "Apex - Apex Enterprise",
      twitter: "https://twitter.com/darlener",
      image: "",
      quote:
        '"Simple, engaging, and powerful. Elara has made recognition an integral part of our company culture."',
    },
  ];

  return (
    <section className="bg-[#f0f7ff] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mx-auto container">
        <h2 className="mb-8 text-center text-xl md:text-3xl lg:text-4xl tracking-tight text-[#143f63] sm:mb-10 font-medium">
          What Teams Are Saying
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-[22px] bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0fb] text-[#7a98bd]">
                      <User className="h-6 w-6" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-[#18181b]">
                      {item.name}
                    </h3>
                    <p className="mt-1 truncate text-sm font-medium text-[#8a8a8a]">
                      {item.role}
                    </p>
                  </div>
                </div>

                <a
                  href={item.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} Twitter`}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0f1b16] text-white"
                >
                  <BsTwitterX className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="text-sm leading-7 text-[#4b4b4b]">
                {item.quote}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}