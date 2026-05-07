import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import citiesData from "@/data/cities.json";

interface CitySidebarProps {
  currentSlug?: string;
  currentServiceSlug?: string;
}

const CitySidebar = ({ currentSlug, currentServiceSlug }: CitySidebarProps) => (
  <aside className="rounded-xl border border-border bg-card p-5">
    <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
      <MapPin className="h-4 w-4 text-primary" /> Available Areas
    </h3>
    <ul className="space-y-1">
      {citiesData.map((city) => {
        const url = currentServiceSlug
          ? `/services/${currentServiceSlug}-${city.slug}`
          : `/${city.slug}`;

        return (
          <li key={city.slug}>
            <Link
              to={url}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${city.slug === currentSlug
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
            >
              {city.cityName}
            </Link>
          </li>
        );
      })}
    </ul>
  </aside>
);

export default CitySidebar;
