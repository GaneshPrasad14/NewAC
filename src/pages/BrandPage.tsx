import { useParams, Navigate } from "react-router-dom";
import { Wrench, Phone, ShieldCheck, CheckCircle2, Award, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";
import brandsData from "@/data/brands.json";
import { PHONE_NUMBER, BUSINESS_NAME } from "@/lib/constants";

const BrandPage = () => {
  const { brandSlug } = useParams<{ brandSlug: string }>();
  let brand = brandsData.find((b) => b.slug === brandSlug);

  if (!brand) {
    if (!brandSlug) return <Navigate to="/" replace />;
    
    // Dynamic Brand SEO Spinning Engine!
    const applianceMap: Record<string, string> = {
      "ac": "AC",
      "washing-machine": "Washing Machine",
      "refrigerator": "Refrigerator",
      "fridge": "Refrigerator",
      "tv": "LED TV",
      "led-tv": "LED TV",
      "water-purifier": "Water Purifier",
      "ro": "Water Purifier",
      "chimney": "Kitchen Chimney"
    };

    let detectedAppliance = "";
    for (const [key, value] of Object.entries(applianceMap)) {
      if (brandSlug.toLowerCase().includes(key)) {
        detectedAppliance = value;
        break;
      }
    }

    const cleanBrandName = brandSlug.replace(/-service|-repair|-ro|-ac|-washing-machine|-refrigerator|-fridge|-led-tv|-tv|-chimney/gi, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    brand = {
      brandName: cleanBrandName,
      slug: brandSlug,
      applianceTypes: detectedAppliance ? [detectedAppliance] : ["AC", "LED TV", "Washing Machine", "Refrigerator", "Water Purifier"],
      metaTitle: `${cleanBrandName} ${detectedAppliance || 'Appliance'} Service Center | Professional Repair`,
      metaDescription: `Expert ${cleanBrandName} ${detectedAppliance || 'appliance'} repair services. Get specialized doorstep service for your ${cleanBrandName} ${detectedAppliance ? detectedAppliance : 'home appliances including AC, TV, washing machine, and refrigerator'} today!`,
      heroTitle: `Expert ${detectedAppliance || 'Appliance'} Servicing For ${cleanBrandName}`,
      contentPara1: `At ${BUSINESS_NAME}, we specialize deeply in diagnosing and repairing complex internal architecture of ${cleanBrandName} ${detectedAppliance || 'home appliances'}. Our certified technicians carry exact-match OEM diagnostic tools ensuring your extremely valuable ${cleanBrandName} ${detectedAppliance || 'machine'} is never damaged by trial-and-error mechanics. We heavily rely on 100% factory original spare parts to restore maximum efficiency and lifecycle expectancy.`,
      contentPara2: `Do not let a minor sensory lapse or a mechanical suspension fault in your ${cleanBrandName} ${detectedAppliance || 'appliance'} evolve into a massive failure. Our 60-minute rapid response squad guarantees an absolute fix right at your doorstep, backed strictly by a resilient 6-month part warranty. Your trusted ${cleanBrandName} investment deserves the highest tier of care.`,
      seoKeywords: [
        `${cleanBrandName} ${detectedAppliance || 'repair'} near me`, 
        `${cleanBrandName} home appliance service`,
        `Best ${cleanBrandName} technician`,
        `${cleanBrandName} authorized-tier appliance tech`,
        `${cleanBrandName} service center contact`
      ]
    };
  }

  const highlightText = (text: string) => {
    if (!text) return null;
    const regex = /(washing machine repair|washing machine|fridge service|refrigerator repair|fridge|refrigerator|AC service|AC repair|RO service|RO membrane|RO water purifier|water purifier|LED TV repair|Smart TV service|TV repair|TV installation|TV wall mounting|chimney cleaning|chimney repair|chimney service|split AC|window AC|inverter ac|same day service|doorstep service|genuine spare parts|genuine parts|compressor repair|gas filling|backlight replacement|panel repair)/gi;
    const parts = text.split(regex);
    const matches = text.match(regex);
    
    if (!matches) return text;
    
    return parts.reduce((arr, part, i) => {
      arr.push(part);
      if (matches[i]) {
        arr.push(<span key={i} className="font-bold text-primary underline decoration-primary/40 underline-offset-4">{matches[i]}</span>);
      }
      return arr;
    }, [] as React.ReactNode[]);
  };

  return (
    <>
      <SEOHead 
        title={brand.metaTitle} 
        description={brand.metaDescription} 
        canonical={`/brand/${brand.slug}`}
      />

      <div className="bg-background pt-8 pb-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumb items={[{ label: `${brand.brandName} Service Center` }]} />
        </div>
      </div>

      <section className="py-16 md:py-24 bg-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-3/5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider border border-primary/20">
                <CheckCircle2 className="h-4 w-4" /> 100% Genuine Parts Guaranteed
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-left mb-6 leading-tight">
                {brand.heroTitle}
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {highlightText(brand.contentPara1)}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <a href={`tel:${PHONE_NUMBER}`} className="btn-premium shadow-lg shadow-primary/20 text-base py-4 px-8">
                  <Phone className="h-5 w-5" /> Speak To {brand.brandName} Expert
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border">
                {[
                  { icon: ShieldCheck, label: "Certified Mechanics" },
                  { icon: Wrench, label: "Original OEM Spares" },
                  { icon: Award, label: "Long-Term Warranty" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/5 w-full">
              <div className="premium-card p-0 overflow-hidden relative border border-primary/10 shadow-2xl shadow-primary/10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <div className="p-8 pb-4 bg-accent/5">
                  <h3 className="font-display text-2xl font-bold mb-2">Book Your Repair</h3>
                  <p className="text-sm text-muted-foreground">Immediate doorstep service for your {brand.brandName} systems.</p>
                </div>
                <div className="p-8 pt-6">
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/5 border-y border-border">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div className="relative">
                  <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800" alt={`${brand.brandName} Maintenance Facility`} className="rounded-3xl shadow-xl w-full h-[400px] object-cover" />
               </div>
               <div>
                 <h2 className="font-display text-3xl font-bold mb-6">Why Choose Us For Your {brand.brandName} Product?</h2>
                 <p className="text-muted-foreground text-lg leading-relaxed mb-6">{highlightText(brand.contentPara2)}</p>
                 <ul className="space-y-4 font-medium text-foreground">
                    <li className="flex items-center gap-3"><ChevronRight className="text-primary h-5 w-5" /> 60-Minute Rapid Response Dispatch</li>
                    <li className="flex items-center gap-3"><ChevronRight className="text-primary h-5 w-5" /> State-of-the-art diagnostic algorithms</li>
                    <li className="flex items-center gap-3"><ChevronRight className="text-primary h-5 w-5" /> Fully transparent billing and cost-approvals</li>
                 </ul>
               </div>
            </div>
         </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
           <h2 className="font-display text-xl font-bold mb-6 text-foreground/80">Related {brand.brandName} Service Searches</h2>
           <div className="flex flex-wrap justify-center gap-3">
             {brand.seoKeywords.map((kw, i) => (
                <span key={i} className="text-sm font-semibold text-foreground/90 hover:text-primary transition-all cursor-default border border-border/80 rounded-md px-4 py-2 bg-background shadow-sm hover:shadow-md underline decoration-primary/40 underline-offset-4">
                  {kw}
                </span>
             ))}
           </div>
        </div>
      </section>
    </>
  );
};

export default BrandPage;
