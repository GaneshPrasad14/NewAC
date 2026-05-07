import { useState, useEffect, useCallback } from "react";
import { Phone, ChevronLeft, ChevronRight, MessageSquare, ShieldCheck, Clock, Star, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import heroGirlTelecaller from "@/assets/indian-girl-telecaller.png";
import heroBoyTelecaller from "@/assets/indian-boy-telecaller.png";

const slides = [
  {
    image: heroGirlTelecaller,
    title: "Elite Home Appliance",
    highlight: "Care",
    subtitle: "Precision Engineering at Your Doorstep",
    desc: "Trusted by over 10,000+ families for premium AC, fridge, and washing machine support. Our certified experts ensure your comfort is never compromised.",
  },
  {
    image: heroBoyTelecaller,
    title: "Restore Your Home's",
    highlight: "Perfect Climate",
    subtitle: "Advanced Solutions, Zero Hassle",
    desc: "Professional AC installation, deep cleaning, and component repair for all international brands. Fast, affordable, and 100% satisfaction guaranteed.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "#";

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[700px] md:h-[900px] overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src={slides[current].image}
            alt={slides[current].title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
         />
         <motion.div 
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
         />
      </div>

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
                }}
              >
                <motion.div 
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                  className="flex flex-wrap items-center gap-3 mb-8"
                >
                  <span className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-primary font-black text-xs uppercase tracking-widest shadow-xl">
                    <ShieldCheck className="h-4 w-4" /> ISO Certified 9001:2015
                  </span>
                  <span className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20">
                    <Clock className="h-4 w-4" /> 60 Min Express Service
                  </span>
                  <span className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-accent text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-accent/20">
                    <Star className="h-4 w-4" /> 4.9/5 Rating
                  </span>
                </motion.div>

                <motion.h1 
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="font-display text-6xl md:text-8xl lg:text-[100px] font-black text-foreground leading-[0.9] mb-8 tracking-tighter"
                >
                  {slides[current].title}<br />
                  <span className="text-gradient italic">{slides[current].highlight}</span>
                </motion.h1>

                <motion.h2 
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-2xl md:text-3xl font-bold text-muted-foreground mb-8 tracking-tight"
                >
                  {slides[current].subtitle}
                </motion.h2>

                <motion.p 
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
                >
                  {slides[current].desc}
                </motion.p>

                <motion.div 
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <a href={`tel:${PHONE_NUMBER}`} className="btn-premium group">
                    <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                       <Phone className="h-5 w-5" />
                    </div>
                    <span>Book Expert Now</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium bg-[#25D366] shadow-[#25D366]/20 border-0 hover:bg-[#20ba5a]"
                  >
                    <MessageSquare className="h-6 w-6" /> WhatsApp Booking
                  </a>
                </motion.div>
                
                <motion.div 
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="mt-16 flex flex-wrap items-center gap-10"
                >
                   <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">U{i}</div>
                      ))}
                      <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-white">+2k</div>
                   </div>
                   <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      Joined by <span className="text-foreground">10,000+</span> satisfied homeowners
                   </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cinematic Navigation */}
      <div className="absolute bottom-12 right-12 z-30 hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2 mr-4">
           {slides.map((_, i) => (
             <button
               key={i}
               onClick={() => setCurrent(i)}
               className={`h-2 rounded-full transition-all duration-700 ${i === current ? "w-12 bg-primary" : "w-4 bg-muted-foreground/20 hover:bg-muted-foreground/40"}`}
             />
           ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            className="h-16 w-16 rounded-2xl glass-morphism flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={next}
            className="h-16 w-16 rounded-2xl glass-morphism flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
