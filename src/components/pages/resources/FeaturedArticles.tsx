import Image from "next/image";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "The Power of Employee Recognition",
    description:
      "Learn how recognition programs improve motivation, productivity, and team morale...",
    image: "/images/article-1.jpg",
    href: "#",
  },
  {
    title: "10 Ways to Boost Employee Engagement",
    description:
      "Discover practical strategies to create a more engaged and motivated workforce...",
    image: "/images/article-2.jpg",
    href: "#",
  },
  {
    title: "Building a Recognition-Driven Culture",
    description:
      "Explore how companies create positive cultures through consistent recognition...",
    image: "/images/article-3.jpg",
    href: "#",
  },
  {
    title: "10 Ways to Boost Employee Engagement",
    description:
      "Discover practical strategies to create a more engaged and motivated workforce...",
    image: "/images/article-4.jpg",
    href: "#",
  },
  {
    title: "Building a Recognition-Driven Culture",
    description:
      "Explore how companies create positive cultures through consistent recognition...",
    image: "/images/article-5.jpg",
    href: "#",
  },
  {
    title: "The Power of Employee Recognition",
    description:
      "Learn how recognition programs improve motivation, productivity, and team morale...",
    image: "/images/article-6.jpg",
    href: "#",
  },
];

export default function FeaturedArticles() {
  return (
    <section className="w-full bg-[#eef2ff] py-10 sm:py-12 md:py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-[-0.02em] text-[#123b63]">
            Featured Articles
          </h2>
          <p className="mt-2 text-[11px] leading-5 text-[#6b7280] sm:text-xs">
            Insights and ideas to help you build a stronger, more engaged workplace.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
          {articles.map((article, index) => (
            <article
              key={index}
              className="rounded-md bg-white p-2 shadow-none"
            >
              <div className="relative aspect-[1.45/1] w-full overflow-hidden rounded-[4px] bg-[#cfcfcf]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="px-1 pb-2 pt-3">
                <h3 className="line-clamp-2 text-[18px] font-semibold leading-[1.25] text-[#ff6a00]">
                  {article.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-[12px] leading-5 text-[#6f7785]">
                  {article.description}
                </p>

                <a
                  href={article.href}
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#ff6a00] transition-opacity hover:opacity-80"
                >
                  Read more
                  <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}