import { Shield, Users, Award, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { BUSINESS_NAME } from "@/lib/constants";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "8+", label: "Years Experience" },
  { icon: Shield, value: "50+", label: "Expert Technicians" },
  { icon: Clock, value: "60 min", label: "Avg Response Time" },
];

const AboutPage = () => (
  <>
    <SEOHead
      title={`About ${BUSINESS_NAME} | Trusted AC & Appliance Service`}
      description={`Learn about ${BUSINESS_NAME} — India's trusted AC & home appliance service provider with 8+ years of experience and 10,000+ happy customers.`}
      canonical="/about-us"
    />

    <div className="container mx-auto px-4">
      <Breadcrumb items={[{ label: "About Us" }]} />
    </div>

    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">About {BUSINESS_NAME}</h1>
        <div className="prose max-w-none text-muted-foreground leading-relaxed space-y-4">
          <p>{BUSINESS_NAME} is a leading AC and home appliance service provider operating across major cities in India. With over 8 years of experience, we have built a reputation for reliable, professional, and affordable service that our customers trust.</p>
          <p>Our team of 50+ factory-trained and certified technicians are equipped to handle everything from routine AC maintenance to complex refrigerator compressor replacements. We service all major brands including Samsung, LG, Daikin, Voltas, Blue Star, Carrier, Whirlpool, and more.</p>
          <p>What sets us apart is our commitment to customer satisfaction. We offer same-day service, transparent pricing with no hidden charges, genuine spare parts with warranty, and a 30-day service guarantee on all repairs.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {stats.map((s, i) => (
            <div key={i} className="card-service text-center">
              <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <CTASection />
  </>
);

export default AboutPage;
