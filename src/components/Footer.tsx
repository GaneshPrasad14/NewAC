import { Link } from "react-router-dom";
import { BUSINESS_NAME } from "@/lib/constants";
import { Zap, ShieldCheck, Headphones, Mail, MapPin, ArrowRight } from "lucide-react";
import citiesData from "@/data/cities.json";

const Footer = () => {
  const seoKeywords = [
    "AC Service", "AC Repair Near Me", "Chimney Cleaning", "AC Gas Refill", "AC Deep Cleaning",
    "Split AC Repair", "Window AC Service", "Commercial AC Service", "Inverter AC Repair",
    "Refrigerator Repair", "Fridge Gas Filling", "Double Door Fridge Repair",
    "Washing Machine Repair Near Me", "Top Load Washer Repair", "Front Load Washing Machine Service",
    "Water Purifier Service", "RO Membrane Replacement", "Home Appliance Service Cost",
    "24/7 Appliance Repair", "Best AC Mechanic", "Affordable AC Service", "Emergency AC Repair",
    "Kitchen Chimney Repair", "Chimney Suction Fix", "Chimney Oil Cleaning"
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20 transition-transform group-hover:rotate-12">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-display font-black tracking-tighter">Swift<span className="text-primary">Care</span></span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
              South India's most trusted home appliance service network. Delivering precision engineering and certified doorstep support across Tamil Nadu.
            </p>
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground group-hover:text-white" />
               </div>
               <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                  <Headphones className="h-5 w-5 text-muted-foreground group-hover:text-white" />
               </div>
               <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-white" />
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-primary mb-8">Our Services</h4>
              <ul className="space-y-4">
                {["AC Installation", "AC Repair", "Fridge Service", "Washer Repair", "RO Service"].map((item) => (
                  <li key={item}>
                    <Link to="/services" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-primary mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {["About Us", "Our Blog", "Contact Support", "Careers", "FAQs"].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 group">
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-black uppercase tracking-widest text-xs text-primary mb-8">Service Hubs</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                 {citiesData.slice(0, 10).map(c => (
                    <Link key={c.slug} to={`/${c.slug}`} className="text-xs text-muted-foreground hover:text-white transition-colors">
                       {c.cityName}
                    </Link>
                 ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12">
           <div className="mb-12">
              <h4 className="font-black uppercase tracking-widest text-[10px] text-muted-foreground mb-6 text-center">Top Appliance Searches</h4>
              <div className="flex flex-wrap justify-center gap-3">
                 {seoKeywords.slice(0, 15).map(k => (
                    <span key={k} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[11px] font-bold text-muted-foreground hover:border-primary/30 hover:text-white transition-all cursor-default">
                       {k}
                    </span>
                 ))}
              </div>
           </div>

           <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5">
              <p className="text-sm text-muted-foreground font-medium">
                © {new Date().getFullYear()} <span className="text-white font-bold tracking-tighter">SwiftCare</span>. Premium Engineering Support.
              </p>
              <div className="flex items-center gap-8">
                 <Link to="/privacy-policy" className="text-xs font-bold text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link>
                 <Link to="/terms" className="text-xs font-bold text-muted-foreground hover:text-white transition-colors">Terms of Service</Link>
                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    <Zap className="h-3 w-3" /> 100% Genuine Spares
                 </div>
              </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
