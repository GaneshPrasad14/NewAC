import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const FAQAccordion = ({ faqs, title }: { faqs: FAQ[]; title?: string }) => (
  <div>
    {title && <h2 className="font-display text-2xl font-bold text-foreground mb-6">{title}</h2>}
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-left font-medium text-foreground">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQAccordion;
