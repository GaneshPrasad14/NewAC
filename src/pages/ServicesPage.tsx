import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import servicesData from "@/data/services.json";

const ServicesPage = () => (
  <>
    <SEOHead
      title="Our Services | AC Repair, Fridge Repair & Appliance Service"
      description="Explore our range of home appliance services including AC repair, installation, refrigerator repair, and washing machine repair. Professional service at affordable prices."
      canonical="/services"
    />

    <div className="container mx-auto px-4">
      <Breadcrumb items={[{ label: "Services" }]} />
    </div>

    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">Professional home appliance services delivered by certified technicians. We handle AC, refrigerator, and washing machine repairs with a satisfaction guarantee.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {servicesData.map((s) => (
            <ServiceCard key={s.slug} {...s} />
          ))}
        </div>

        {/* Localized Service Grid */}
        <div className="bg-accent/5 rounded-[2.5rem] p-10 md:p-16 border border-primary/10">
          <h2 className="font-display text-3xl font-bold mb-4 text-center">Serviceable Districts</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">We provide rapid doorstep service for all home appliances across major districts in Tamil Nadu. Select your service and location for instant booking.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.filter(s => s.slug !== 'ac-installation').map((s) => (
              <div key={s.slug} className="space-y-4">
                <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                   <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                   {s.serviceName}
                </h3>
                <ul className="space-y-2">
                  {["Chennai", "Madurai", "Coimbatore", "Trichy", "Nagercoil"].map(city => {
                    const citySlug = city.toLowerCase();
                    const targetLink = s.slug === "ac-service" ? `ac-service-in-${citySlug}` : `${s.slug}-in-${citySlug}`;
                    return (
                      <li key={city}>
                        <Link to={`/${targetLink}`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                          <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary"></span>
                          {s.serviceName} in {city}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <CTASection />
  </>
);

export default ServicesPage;
