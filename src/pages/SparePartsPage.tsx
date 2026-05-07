import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { Settings, Wrench, Package, ShieldCheck, Zap } from "lucide-react";
import LeadForm from "@/components/LeadForm";

const SparePartsPage = () => {
  return (
    <>
      <SEOHead 
        title="Genuine AC & Home Appliance Spare Parts | SwiftCare™ Services" 
        description="Shop 100% genuine spare parts for AC, Fridge, Washing Machine, and Chimney. Fast delivery across Tamil Nadu by SwiftCare™ Services. Buy genuine parts with warranty."
        canonical="/spare-parts"
      />
      <div className="bg-background pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumb items={[{ label: "Genuine Spare Parts" }]} />
        </div>
      </div>
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="font-display text-3xl md:text-5xl font-black mb-6 text-foreground">100% Authentic Spare Parts</h1>
          <p className="text-muted-foreground text-lg mb-12 max-w-3xl">We stock completely genuine, manufacturer-approved replacement parts to ensure your appliances run efficiently and safely for years to come. Do not compromise your expensive appliances with cheap, third-party knock-offs.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Zap, title: "Compressors & PCB Boards", desc: "Original compressors and circuit boards for Samsung, LG, Daikin, and Voltas ACs." },
              { icon: Settings, title: "Washing Machine Motors", desc: "Authentic drive motors, drain pumps, and drum components for all washer types." },
              { icon: Wrench, title: "RO Filters & Membranes", desc: "Certified multi-stage RO filtration kits matching original Kent and Aquaguard standards." },
              { icon: Package, title: "Fridge Gas & Relays", desc: "Precision gas charging canisters and OEM starter relays for exact appliance matching." },
              { icon: ShieldCheck, title: "Full Warranty Guarantee", desc: "Every spare part we supply and install comes backed with a minimum 6-Month solid warranty." }
            ].map((p, i) => (
              <div key={i} className="bg-accent/5 rounded-2xl p-6 border border-border flex flex-col items-start hover:border-primary/50 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/20 md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:pr-10">
               <h3 className="text-2xl font-black mb-2">Looking for a specific component?</h3>
               <p className="text-muted-foreground">Fill out our form or call our central parts depot to check immediate availability for your appliance model.</p>
            </div>
            <div className="md:w-1/3 bg-background p-6 rounded-2xl shadow-xl shadow-primary/5">
               <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SparePartsPage;
