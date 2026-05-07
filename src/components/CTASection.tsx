import { Phone, MessageSquare, ShieldCheck } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

const CTASection = ({ title = "Need Home Appliance Service? Call Us Now!", subtitle = "Get expert technicians at your doorstep within 60 minutes. Fast, reliable, and affordable." }: CTASectionProps) => {
  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "#";

  return (
    <section className="hero-premium py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-10">
         <ShieldCheck className="h-64 w-64 text-white" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-sm mb-8 uppercase tracking-widest border border-white/20">
          Available 24/7 for Emergencies
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{title}</h2>
        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {PHONE_NUMBER && (
            <a href={`tel:${PHONE_NUMBER}`} className="btn-premium px-10 py-5 bg-white text-primary hover:bg-white/90 shadow-none">
              <Phone className="h-6 w-6" /> Talk to an Expert
            </a>
          )}
          {WHATSAPP_NUMBER && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium px-10 py-5 bg-green-500 hover:bg-green-600 shadow-green-500/20"
            >
              <MessageSquare className="h-6 w-6" /> WhatsApp Now
            </a>
          )}
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-sm font-bold uppercase tracking-widest">
           <span>✓ Guaranteed Satisfaction</span>
           <span>✓ Expert Technicians</span>
           <span>✓ Genuine Spare Parts</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

