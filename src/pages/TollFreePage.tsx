import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { Phone, Headphones, ShieldCheck } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/constants";

const brands = [
  {
    name: "LG",
    description: "Toll Free | Customer Care No.",
    numbers: ["18003159999", "18001809999"]
  },
  {
    name: "Daikin",
    description: "Toll Free No",
    numbers: ["18601803900", "180030008282"]
  },
  {
    name: "Samsung",
    description: "Toll Free | Customer Care No.",
    numbers: ["1800 40 7267864", "1800 5 7267864"]
  },
  {
    name: "Whirlpool",
    description: "TollFree / Customer Care No.",
    numbers: ["18002081800"]
  },
  {
    name: "Godrej",
    description: "TollFree / Customer Care No.",
    numbers: ["18002095511"]
  },
  {
    name: "Electrolux",
    description: "Toll Free",
    numbers: ["18002021800"]
  }
];

const TollFreePage = () => {
  return (
    <>
      <SEOHead 
        title="Official Brand Toll-Free & Customer Care Numbers | Service Centre India" 
        description="Comprehensive list of official toll-free and customer care numbers for LG, Daikin, Samsung, Whirlpool, Godrej, and Electrolux in India." 
      />
      
      <div className="bg-background pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-5xl">
          <Breadcrumb items={[{ label: "Toll Free Numbers" }]} />
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 uppercase tracking-widest">
              Service Centre India
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-6">Toll-Free & Customer Care Numbers</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Repair Service for Air conditioner, LED TVs, Fridge, Washing machine & Microwaves. Same day diagnostics Doorstep service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, idx) => (
              <div key={idx} className="glass-card p-8 rounded-3xl border border-primary/10 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Headphones className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground">{brand.name}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{brand.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {brand.numbers.map((num, i) => (
                    <a 
                      key={i} 
                      href={`tel:${num.replace(/\s+/g, '')}`} 
                      className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 hover:bg-primary hover:text-white transition-all font-bold text-lg"
                    >
                      <Phone className="h-5 w-5" />
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 rounded-[3rem] bg-primary text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="h-32 w-32" />
            </div>
            <h2 className="text-3xl font-black mb-6">Need Immediate Repair Service?</h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Skip the long queues on official toll-free numbers. Get expert doorstep repair service today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href={`tel:${PHONE_NUMBER}`} className="px-10 py-5 bg-white text-primary rounded-2xl font-black text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3">
                <Phone className="h-6 w-6" /> Call Our Hotline: {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TollFreePage;
