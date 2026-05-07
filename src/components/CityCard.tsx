import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";

interface CityCardProps {
  cityName: string;
  slug: string;
}

const CityCard = ({ cityName, slug }: CityCardProps) => (
  <Link
    to={`/${slug}`}
    className="premium-card flex items-center justify-between group p-6 border-none bg-white hover:bg-primary transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white transition-all">
        <MapPin className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-display font-bold text-foreground group-hover:text-white transition-colors">{cityName}</h3>
        <p className="text-xs text-muted-foreground group-hover:text-white/80 transition-colors">Expert AC & Appliance Service</p>
      </div>
    </div>
    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
  </Link>
);

export default CityCard;

