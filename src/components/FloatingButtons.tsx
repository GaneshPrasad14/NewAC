import { Phone } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/constants";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const FloatingButtons = () => {
  if (!WHATSAPP_NUMBER && !PHONE_NUMBER) return null;

  const whatsappUrl = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : "#";

  return (
    <div className="fixed right-4 bottom-6 z-[9999] flex flex-col gap-3">
      {WHATSAPP_NUMBER && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_20px_-4px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="h-8 w-8 text-white fill-current" />
        </a>
      )}
      {PHONE_NUMBER && (
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-[0_6px_20px_-4px_hsl(38_92%_50%/0.5)] hover:scale-110 transition-transform text-accent-foreground"
          aria-label="Call us"
        >
          <Phone className="h-6 w-6 text-primary-foreground" />
        </a>
      )}
    </div>
  );
};

export default FloatingButtons;
