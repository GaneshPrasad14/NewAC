import { useParams } from "react-router-dom";
import servicesData from "@/data/services.json";
import CityPage from "./CityPage";
import ServiceDetailPage from "./ServiceDetailPage";

const ServiceRouter = () => {
  const { param } = useParams<{ param: string }>();
  
  // Check if param matches a service slug directly (e.g., "ac-service")
  const isDirectService = servicesData.some((s) => s.slug === param);
  
  if (isDirectService) {
    return <ServiceDetailPage />;
  }
  
  // Otherwise treat as service-city combo (e.g., "ac-service-kanyakumari")
  return <CityPage />;
};

export default ServiceRouter;
