import { useParams, Navigate, Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import servicesData from "@/data/services.json";
import citiesData from "@/data/cities.json";

import serviceAcRepair from "@/assets/service-ac-repair.jpg";
import serviceChimney from "@/assets/service-chimney.png";
import serviceFridgeRepair from "@/assets/service-fridge-repair.jpg";
import serviceWashingMachine from "@/assets/service-washing-machine.jpg";
import serviceWaterPurifier from "@/assets/service-water-purifier.jpg";
import serviceLedTvRepair from "@/assets/service-led-tv.jpg";

const imageMap: Record<string, string> = {
  "ac-service": serviceAcRepair,
  "chimney-service": serviceChimney,
  "fridge-repair": serviceFridgeRepair,
  "washing-machine-repair": serviceWashingMachine,
  "water-purifier-service": serviceWaterPurifier,
  "led-tv-repair": serviceLedTvRepair,
};

const ServiceDetailPage = () => {
  const { param } = useParams<{ param: string }>();
  const service = servicesData.find((s) => s.slug === param);

  if (!service) return <Navigate to="/services" replace />;

  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "#";

  const image = imageMap[service.slug];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.serviceName,
      description: service.description,
      provider: { "@type": "LocalBusiness", name: "SwiftCare™ Services" },
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
        title={`${service.serviceName} | Professional Home Appliance Service`}
        description={service.shortDescription}
        canonical={`/services/${service.slug}`}
        schema={schema}
      />

      <div className="container mx-auto px-4">
        <Breadcrumb items={[{ label: "Services", href: "/services" }, { label: service.serviceName }]} />
      </div>

      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={image}
          alt={service.serviceName}
          className="absolute inset-0 w-full h-full object-cover"
          width={800}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
              {service.serviceName}
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-6">{service.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {PHONE_NUMBER && (
                <a href={`tel:${PHONE_NUMBER}`} className="btn-cta text-sm">
                  <Phone className="h-4 w-4" /> Book Now
                </a>
              )}
              {WHATSAPP_NUMBER && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/60 bg-white/10 px-5 py-2.5 font-semibold text-white text-sm hover:bg-white/20 transition-all shadow-lg backdrop-blur-sm">
                  <WhatsAppIcon className="h-5 w-5 fill-current" /> <span>WhatsApp Us</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div className="p-8 md:p-10 bg-accent/5 rounded-[3rem] border border-primary/10 mb-10">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6 underline decoration-primary/30 underline-offset-8">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
              </div>

              {/* Brands */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Brands We Service</h2>
                <div className="flex flex-wrap gap-2">
                  {service.brands.map((brand) => (
                    <span key={brand} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-accent" /> {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <FAQAccordion faqs={service.faqs} title="Frequently Asked Questions" />
              )}
            </div>

            {/* Sidebar: Available in cities */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Available Areas</h3>
                <div className="grid grid-cols-1 gap-2">
                  {citiesData.map((city) => {
                    const cityBase = city.slug.replace(/^ac-service-in-/i, '');
                    const targetLink = service.slug === "ac-service" ? city.slug : `${service.slug}-in-${cityBase}`;
                    return (
                      <Link
                        key={city.slug}
                        to={`/${targetLink}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group"
                      >
                        <span className="truncate">{city.cityName}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {PHONE_NUMBER && (
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Our experts are just a call away</p>
                  <a href={`tel:${PHONE_NUMBER}`} className="btn-cta text-sm w-full">
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection title={`Book ${service.serviceName} Today`} />
    </>
  );
};

export default ServiceDetailPage;
