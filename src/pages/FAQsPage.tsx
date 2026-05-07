import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import servicesData from "@/data/services.json";

const allFaqs = servicesData.flatMap((s) => s.faqs);

const FAQsPage = () => (
  <>
    <SEOHead
      title="FAQs | AC Service & Appliance Repair Questions Answered"
      description="Find answers to common questions about AC service, repair, installation, pricing, and more. Expert answers from our certified technicians."
      canonical="/faqs"
      schema={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: allFaqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }}
    />

    <div className="container mx-auto px-4">
      <Breadcrumb items={[{ label: "FAQs" }]} />
    </div>

    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Frequently Asked Questions</h1>
        <FAQAccordion faqs={allFaqs} />
      </div>
    </section>
  </>
);

export default FAQsPage;
