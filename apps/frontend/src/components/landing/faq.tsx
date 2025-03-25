"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is CoolboDraw free to use?",
    answer:
      "Yes! CoolboDraw offers a free version with core features. A premium version unlocks advanced tools.",
    value: "item-1",
  },
  {
    question: "Can I collaborate with others in real time?",
    answer:
      "Absolutely! Multiple users can join the same whiteboard and collaborate in real time.",
    value: "item-2",
  },
  {
    question: "Do my drawings save automatically?",
    answer:
      "Yes! Your work is automatically saved and synced across devices using cloud storage.",
    value: "item-3",
  },
  {
    question: "Can I use CoolboDraw offline?",
    answer:
      "Yes, you can draw offline! Your changes will sync automatically when you're back online.",
    value: "item-4",
  },
  {
    question: "Is my data secure?",
    answer:
      "CoolboDraw ensures privacy with encrypted storage and secure sharing options.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8" data-aos="fade-up">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Common Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }, index) => (
          <AccordionItem key={value} value={value} data-aos="fade-up" data-aos-delay={index * 100}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
