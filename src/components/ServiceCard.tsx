import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Thermometer, Wrench, Box, RotateCcw, Droplets, Tv, Wind, type LucideIcon, ArrowRight, Zap } from "lucide-react";

import serviceAcRepair from "@/assets/service-ac-repair.jpg";
import serviceChimney from "@/assets/service-chimney.png";
import serviceFridgeRepair from "@/assets/service-fridge-repair.jpg";
import serviceWashingMachine from "@/assets/service-washing-machine.jpg";
import serviceWaterPurifier from "@/assets/service-water-purifier.jpg";
import serviceLedTvRepair from "@/assets/service-led-tv.jpg";

const iconMap: Record<string, LucideIcon> = {
  Thermometer,
  Wrench,
  Box,
  RotateCcw,
  Droplets,
  Tv,
  Wind,
};

const imageMap: Record<string, string> = {
  "ac-service": serviceAcRepair,
  "chimney-service": serviceChimney,
  "fridge-repair": serviceFridgeRepair,
  "washing-machine-repair": serviceWashingMachine,
  "water-purifier-service": serviceWaterPurifier,
  "led-tv-repair": serviceLedTvRepair,
};

interface ServiceCardProps {
  serviceName: string;
  slug: string;
  icon: string;
  shortDescription: string;
  city?: string;
}

const ServiceCard = ({ serviceName, slug, icon, shortDescription, city }: ServiceCardProps) => {
  const Icon = iconMap[icon] || Thermometer;
  const href = city ? `/services/${slug}-${city}` : `/services/${slug}`;
  const image = imageMap[slug];

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link to={href} className="premium-card group block h-full bg-white dark:bg-card">
        {image && (
          <div className="relative h-64 overflow-hidden rounded-[1.5rem] mb-6">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
              src={image}
              alt={serviceName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/30 flex items-center gap-1">
                <Zap className="h-3 w-3" /> Instant Booking
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col h-full">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
            <Icon className="h-7 w-7" />
          </div>
          
          <h3 className="font-display text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
            {serviceName}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base flex-grow">
            {shortDescription}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
            <span className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
              Details <ArrowRight className="h-4 w-4" />
            </span>
            <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
               <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;

