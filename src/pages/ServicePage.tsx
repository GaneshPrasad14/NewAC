import { useParams, Navigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import CitySidebar from "@/components/CitySidebar";
import CTASection from "@/components/CTASection";
import citiesData from "@/data/cities.json";
import servicesData from "@/data/services.json";
import { CheckCircle } from "lucide-react";
import { BUSINESS_NAME } from "@/lib/constants";

const ServicePage = () => {
  const { param } = useParams<{ param: string }>();
  const serviceCity = param;

  // Parse "ac-service-kanyakumari" → service slug + city slug
  const parts = serviceCity?.split("-") || [];
  let service = null;
  let city = null;

  for (let i = 1; i <= parts.length; i++) {
    const sSlug = parts.slice(0, i).join("-");
    const cSlug = parts.slice(i).join("-");
    const foundService = servicesData.find((s) => s.slug === sSlug);
    const foundCity = citiesData.find((c) => c.slug === cSlug);
    if (foundService && foundCity) {
      service = foundService;
      city = foundCity;
      break;
    }
  }

  if (!service || !city) return <Navigate to="/services" replace />;

  const title = `${service.serviceName} in ${city.cityName}`;

  // Custom unique content generation for each city-service combination
  const isAcService = service.slug.includes('ac-');
  const cityIntro = isAcService ? city.uniqueContent.split(".")[0] : `We provide high-quality ${service.serviceName.toLowerCase()} solutions for the residents and businesses of ${city.cityName}`;
  const brandsList = service.brands.slice(0, 5).join(", ");

  const generatedContent = `${cityIntro}. We are proud to offer professional ${service.serviceName.toLowerCase()} in ${city.cityName} for homes and businesses. Our team of certified technicians in ${city.cityName} handles all major brands including ${brandsList}. Whether you need emergency repair, routine maintenance, or professional installation of your ${service.serviceName.toLowerCase()}, we provide prompt, reliable, and expert solutions across all localities in ${city.cityName}. We use only genuine spare parts to ensure the longevity of your appliances.`;

  const localizedSummary = isAcService 
    ? `Providing expert ${service.serviceName.toLowerCase()} solutions to the residents of ${city.cityName} for years. ${city.uniqueContent}`
    : `Our specialized team provides top-rated ${service.serviceName.toLowerCase()} across ${city.cityName}. We ensure that your ${service.serviceName.toLowerCase().replace(' repair', '').replace(' service', '')} is restored to perfect working condition using advanced tools and genuine components. We serve all areas of ${city.cityName} with a focus on quick turnaround and customer satisfaction.`;


  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      provider: { "@type": "LocalBusiness", name: BUSINESS_NAME },
      areaServed: { "@type": "City", name: city.cityName },
    },
    ...(service.faqs.length > 0
      ? [{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }]
      : []),
  ];

  return (
    <>
      <SEOHead
        title={`${title} | Expert ${service.serviceName}`}
        description={`Professional ${service.serviceName.toLowerCase()} in ${city.cityName}. Certified technicians, same-day service, genuine parts. Book now!`}
        canonical={`/services/${service.slug}-${city.slug}`}
        schema={schema}
      />

      <div className="container mx-auto px-4">
        <Breadcrumb items={[
          { label: "Services", href: "/services" },
          { label: title },
        ]} />
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{title}</h1>
                <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4 mb-6">{generatedContent}</p>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>

              {/* Brands */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Brands We Service</h2>
                <div className="flex flex-wrap gap-2">
                  {service.brands.map((brand) => (
                    <span key={brand} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary" /> {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <FAQAccordion faqs={service.faqs} title="Frequently Asked Questions" />
              )}

              {/* Local SEO Text */}
              <div className="mt-12 p-8 border border-border rounded-2xl bg-accent/5">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Dedicated Service in {city.cityName}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{localizedSummary}</p>
              </div>
            </div>

            <div>
              <CitySidebar currentSlug={city.slug} currentServiceSlug={service.slug} />
            </div>
          </div>
        </div>
      </section>

      <CTASection title={`Book ${service.serviceName} in ${city.cityName}`} />
    </>
  );
};

export default ServicePage;
