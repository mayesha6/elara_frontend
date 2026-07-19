"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can we try the platform for free?",
    answer:
      "Yes. We offer a 14-day free trial so you can explore all features.",
  },
  {
    question: "Can we change plans later?",
    answer: "Absolutely. You can upgrade or downgrade anytime.",
  },
  {
    question: "Is there a minimum team size?",
    answer: "No. Our platform works for teams of any size.",
  },
];

export default function FaqSection() {
  return (
    <section className="w-full bg-[#f3f4f6] px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[760px]">
        <h2 className="text-center font-medium tracking-[-0.02em] text-[#143d63] lg:text-4xl text-2xl">
          Frequently Asked Questions
        </h2>

        <div className="mx-auto mt-8 max-w-[315px] sm:mt-10 sm:max-w-[560px]">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="overflow-hidden rounded-[8px] border-0 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.03)]"
              >
                <AccordionTrigger className="px-4 py-3 text-left text-[13px] font-semibold leading-5 text-[#143d63] hover:no-underline sm:px-5 sm:text-[15px] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0 [&>svg]:text-[#f08a5d]">
                  <span className="pr-2">{faq.question}</span>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-3 pt-0 text-[13px] leading-5 text-[#6b7280] sm:px-5 sm:text-[14px]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}