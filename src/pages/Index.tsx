import { motion } from "framer-motion";
import { Shield, Clock, Award, Zap, CheckCircle, Phone, ArrowRight, Star, Users, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import HeroSlider from "@/components/HeroSlider";
import ServiceCard from "@/components/ServiceCard";
import CityCard from "@/components/CityCard";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import { PHONE_NUMBER, BUSINESS_NAME } from "@/lib/constants";
import servicesData from "@/data/services.json";
import citiesData from "@/data/cities.json";

const steps = [
  { icon: Phone, title: "Book a Session", desc: "Instantly schedule your repair online or via call" },
  { icon: Clock, title: "Swift Arrival", desc: "Expert technician reaches you within 60 mins" },
  { icon: Zap, title: "Precision Repair", desc: "Quick diagnosis and genuine part replacement" },
  { icon: CheckCircle, title: "Post-Fix Audit", desc: "We ensure rigorous quality standards are met" },
];

const features = [
  { icon: Shield, title: "Trusted Experts", desc: "Certified & background-verified technicians" },
  { icon: Clock, title: "Same Day Service", desc: "Quick response within 60 minutes" },
  { icon: Award, title: "Warranty on Repairs", desc: "30-day service warranty guaranteed" },
  { icon: Zap, title: "Affordable Pricing", desc: "No hidden charges, transparent rates" },
];

const stats = [
  { label: "Elite Clients", value: "10k+", icon: Users },
  { label: "Certified Pros", value: "50+", icon: Award },
  { label: "Regional Hubs", value: "38+", icon: MapPin },
  { label: "Satisfaction", value: "4.9/5", icon: Star },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BUSINESS_NAME,
      description: "Professional Home Appliance Service across India",
      ...(PHONE_NUMBER ? { telephone: PHONE_NUMBER } : {}),
      url: "https://www.swiftcareservice.com",
      areaServed: citiesData.map((c) => ({ "@type": "City", name: c.cityName })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BUSINESS_NAME,
      url: "https://www.swiftcareservice.com",
    },
  ];

  return (
    <>
      <SEOHead
        title={`${BUSINESS_NAME} | AC & Home Appliance Service in India`}
        description="Professional AC service, repair & installation across India. Expert technicians, same-day service, affordable pricing. Call now for AC repair, fridge repair & more!"
        canonical="/"
        schema={schema}
      />

      <HeroSlider />

      <section className="relative -mt-24 z-30 pb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((s, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center group hover:border-primary/30 transition-colors"
              >
                <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <s.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-black text-foreground mb-2">{s.value}</div>
                <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-premium bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary font-black text-xs uppercase tracking-widest mb-6">
              Elite Engineering
            </span>
            <h2 className="section-title">Precision Care Solutions</h2>
            <p className="section-subtitle">Delivering world-class maintenance and specialized support for high-performance home systems.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {servicesData.map((s) => (
              <motion.div key={s.slug} variants={itemVariants}>
                <ServiceCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-premium bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-accent/10 text-accent font-black text-xs uppercase tracking-widest mb-6">
                The Technical Advantage
              </span>
              <h2 className="section-title text-left mb-8">Why Modern Homes Trust <span className="text-primary italic">SwiftCare</span></h2>
              <p className="text-muted-foreground text-xl mb-12 leading-relaxed">
                Combining a decade of technical excellence with background-verified engineers, we restore your home's functionality with unmatched precision.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-10">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="shrink-0 h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-2xl shadow-primary/5 group-hover:bg-primary group-hover:text-white transition-all">
                      <f.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-foreground mb-2 tracking-tight">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full"
            >
              <div className="premium-card p-12 glass-morphism">
                <h3 className="text-3xl font-black mb-8 tracking-tighter">Schedule a Professional Visit</h3>
                <LeadForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-premium bg-background">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="section-title">Seamless Experience</h2>
            <p className="section-subtitle">Restore your home's comfort in four effortless steps.</p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16"
          >
            {steps.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="relative flex flex-col items-center text-center group">
                <div className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-[3rem] bg-white shadow-2xl shadow-primary/5 group-hover:-translate-y-3 transition-all duration-700">
                  <span className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-lg border-4 border-background">
                    {i + 1}
                  </span>
                  <s.icon className="h-12 w-12 text-primary" />
                </div>
                <h3 className="font-display font-black text-2xl text-foreground mb-4 tracking-tighter">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Index;

