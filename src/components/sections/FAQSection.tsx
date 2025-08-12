import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container mx-auto px-4 py-16">
      <h2 id="faq-title" className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="rounded-xl border bg-card p-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does booking work?</AccordionTrigger>
          <AccordionContent>
            Choose your experience tier, pick a date and time, and complete payment. We’ll confirm the details and coordinate with the celebrity.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What tiers are available?</AccordionTrigger>
          <AccordionContent>
            Standard (most affordable), Premium (extra perks), and VIP (top-tier access and priority handling).
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I get a refund?</AccordionTrigger>
          <AccordionContent>
            Refunds are reviewed on a case-by-case basis depending on the situation and scheduling constraints.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQSection;
