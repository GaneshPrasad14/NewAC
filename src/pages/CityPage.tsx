import { useParams, Navigate, Link } from "react-router-dom";
import { MapPin, Phone, MessageSquare, ShieldCheck, Clock, Award, CheckCircle2, Star, Check, PenTool, Thermometer, Droplet, Wind, Zap, AlertTriangle, ChevronRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import LeadForm from "@/components/LeadForm";
import citiesData from "@/data/cities.json";
import servicesData from "@/data/services.json";
import { PHONE_NUMBER, WHATSAPP_NUMBER, BUSINESS_NAME } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import serviceAcRepair from "@/assets/service-ac-repair.jpg";
import serviceChimney from "@/assets/service-chimney.png";
import serviceFridgeRepair from "@/assets/service-fridge-repair.jpg";
import serviceWashingMachine from "@/assets/service-washing-machine.jpg";
import serviceWaterPurifier from "@/assets/service-water-purifier.jpg";
import serviceLedTvRepair from "@/assets/service-led-tv.jpg";

const getNearbyLocations = (content: string, cityName: string) => {
  const chennaiAreas = ["Anna Nagar", "T Nagar", "Velachery", "Adyar", "Guindy", "Tambaram", "OMR", "Porur", "Chromepet", "Perambur", "Madipakkam", "Mylapore", "Thiruvanmiyur", "Ambattur", "Medavakkam", "Sholinganallur", "ECR"];

  const districtAreasMap: Record<string, string[]> = {
    "kanyakumari": ["Nagercoil", "Marthandam", "Kuzhithurai", "Thuckalay", "Colachel", "Karungal", "Kulasekaram", "Aralvaimozhi", "Kanyakumari Town", "Padmanabhapuram", "Eraniel"],
    "nagercoil": ["Asaripallam", "Kottar", "Vadasery", "Ozhuginasery", "Parvathipuram", "Vettoornimadam", "Krishnancoil", "Meenakshipuram"],
    "chennai": chennaiAreas,
    "coimbatore": ["RS Puram", "Gandhipuram", "Peelamedu", "Singanallur", "Saravanampatti", "Kovaipudur", "Pollachi", "Mettupalayam", "Thudiyalur", "Sulur", "Kinathukadavu", "Ukkadam"],
    "madurai": ["Anna Nagar", "KK Nagar", "Simmakkal", "Goripalayam", "Sellur", "Tallakulam", "Madurai West", "Tirumangalam", "Melur", "Usilampatti", "Othakadai", "Arapalayam"],
    "trichy": ["Srirangam", "Thillai Nagar", "Woraiyur", "K.K. Nagar", "Cantonment", "Lalgudi", "Manapparai", "Thiruverumbur", "Thuraiyur", "Musiri"],
    "salem": ["Attur", "Mettur", "Omalur", "Sankari", "Yercaud", "Ammapet", "Gugai", "Hasthampatti", "Salem Town", "Valapady"],
    "erode": ["Bhavani", "Gobichettipalayam", "Perundurai", "Sathyamangalam", "Anthiyur", "Kodumudi", "Nambiur", "Modakkurichi"],
    "tirunelveli": ["Palayamkottai", "Ambasamudram", "Tenkasi", "Nanguneri", "Radhapuram", "Valliyur", "Cheranmahadevi", "Sankarankovil", "Alangulam"],
    "chengalpattu": ["Tambaram", "Pallavaram", "Guduvanchery", "Maraimalai Nagar", "Mahabalipuram", "Thiruporur", "Kelambakkam", "Madurantakam", "Cheyyur"],
    "sivaganga": ["Karaikudi", "Devakottai", "Manamadurai", "Tiruppattur", "Kalaiyur", "Singampunari", "Ilayangudi", "Kalayar Kovil", "Thirupuvanam"],
    "tuticorin": ["Kovilpatti", "Tiruchendur", "Vilathikulam", "Srivaikuntam", "Ottapidaram", "Ettayapuram", "Pudur", "Alwarthirunagari"],
    "vellore": ["Gudiyatham", "Katpadi", "Vaniyambadi", "Ambur", "Ranipet", "Arcot", "Walajapet", "Arakkonam", "Tirupattur", "Jolarpet"],
    "kanchipuram": ["Sriperumbudur", "Uthiramerur", "Walajabad", "Kundrathur", "Mangadu", "Poonamallee", "Sunguvarchatram"],
    "tirupur": ["Dharapuram", "Kangeyam", "Udumalpet", "Avinashi", "Palladam", "Vellakoil", "Mangalam", "Uthukuli"],
    "thanjavur": ["Kumbakonam", "Pattukkottai", "Papanasam", "Orathanadu", "Peravurani", "Thiruvaiyaru", "Adirampattinam"],
    "dharmapuri": ["Pennagaram", "Palacode", "Harur", "Nallampalli", "Pappireddipatti", "Karimangalam"],
    "dindigul": ["Palani", "Kodaikanal", "Nilakottai", "Oddanchatram", "Vedasandur", "Natham"],
    "nagapattinam": ["Velankanni", "Vedaranyam", "Thirukkuvalai", "Kilvelur"],
    "namakkal": ["Rasipuram", "Tiruchengode", "Paramathi Velur", "Komarapalayam", "Mohanur"],
    "pudukkottai": ["Aranthangi", "Alangudi", "Illupur", "Karambakudi", "Thirumayam"],
    "ramanathapuram": ["Rameswaram", "Paramakudi", "Mudukulathur", "Kamuthi", "Kadaladi"],
    "tiruvallur": ["Avadi", "Poonamallee", "Ambattur", "Gummidipoondi", "Tiruttani", "Ponneri"],
    "tiruvannamalai": ["Arani", "Cheyyar", "Chengam", "Polur", "Vandavasi"],
    "tiruvarur": ["Mannargudi", "Thiruthuraipoondi", "Nannilam", "Kudavasal", "Needamangalam"],
    "virudhunagar": ["Sivakasi", "Rajapalayam", "Aruppukottai", "Sattur", "Srivilliputhur", "Watrap"],
    "the-nilgiris": ["Ooty", "Coonoor", "Kotagiri", "Gudalur", "Pandalur"],
    "theni": ["Periyakulam", "Bodinayakanur", "Cumbum", "Uthamapalayam", "Andipatti"],
    "ariyalur": ["Ariyalur Town", "Jayankondam", "Sendurai", "Udayarpalayam", "Andimadam", "T. Palur"],
    "kallakurichi": ["Kallakurichi Town", "Sankarapuram", "Chinnasalem", "Ulundurpet", "Tirukoilur"],
    "karur": ["Karur Town", "Kulithalai", "Aravakurichi", "Thanthoni", "Pugalur", "Krishnarayapuram"],
    "krishnagiri": ["Krishnagiri Town", "Hosur", "Pochampalli", "Uthangarai", "Bargur", "Denkanikottai", "Shoolagiri"],
    "mayiladuthurai": ["Mayiladuthurai Town", "Sirkazhi", "Tharangambadi", "Kuthalam", "Poompuhar"],
    "perambalur": ["Perambalur Town", "Veppanthattai", "Kunnam", "Alathur"],
    "ranipet": ["Ranipet Town", "Arakkonam", "Arcot", "Walajah", "Sholinghur", "Nemili"],
    "tenkasi": ["Tenkasi Town", "Sankarankovil", "Kadayanallur", "Shencottai", "Alangulam", "Surandai"],
    "tirupattur": ["Tirupattur Town", "Vaniyambadi", "Ambur", "Natrampalli", "Jolarpet"],
    "viluppuram": ["Viluppuram Town", "Tindivanam", "Gingee", "Vanur", "Marakkanam", "Vikravandi"]
  };

  // Add Chennai sub-areas to the map
  chennaiAreas.forEach(area => {
    districtAreasMap[area.toLowerCase()] = chennaiAreas.filter(a => a !== area);
  });


  const key = cityName.toLowerCase().trim();
  if (districtAreasMap[key]) {
    return districtAreasMap[key];
  }

  let areas: string[] = [];
  const match = content.match(/serve\s+([^.]+)|cover(?:age)?(?:[^.]+)?\s+([^.]+)/i);
  if (match) {
    const areasStr = match[1] || match[2] || "";
    areas = areasStr.replace(/all areas of.*including|the entire.*district including|our coverage extends to|we serve|we cover/ig, '')
                 .split(/,|\band\b/i)
                 .map(a => a.trim().replace(/^[Tt]he |^all |^surrounding areas$|^areas$/g, '').trim())
                 .filter(a => a.length > 2 && a.toLowerCase() !== 'the');
  }
  
  if (areas.length > 0) return [...new Set(areas)];
  
  return [`${cityName} Central`, `${cityName} North`, `${cityName} South`, `${cityName} East`, `${cityName} West`, `Suburban ${cityName}`];
};

const acIssuesList = [
  "AC not turning on", "Bad smell coming from the AC", "AC making too much noise", "Ac not cooling properly", 
  "Water leakage from indoor unit", "AC stops suddenly during use", "Remote control not working", 
  "Fan not rotating or working slowly", "High electricity bill due to AC", "AC blowing warm air", 
  "AC taking too long to start", "AC turning on and off again and again", "Fan inside the AC not spinning", 
  "Cooling is not equal in all rooms", "Compressor not starting", "Ice forming inside the AC"
];

const getServicePricing = (serviceKey: string) => {
  const commonFeatures = [
    "Inspects all internal components carefully",
    "Examines wiring for any damage or loose connections",
    "Identifies and resolves the issue with proper diagnosis"
  ];

  const pricingMap: Record<string, { title: string; rating: string; price: string; features: string[] }[]> = {
    "ac-service": [
      { title: "AC General Service", rating: "4.8 (1123 reviews)", price: "₹499", features: ["Inspects all internal components carefully", "Examines wiring for any damage or loose connections", "Evaluates the overall cooling performance of the AC", "Identifies and resolves the issue with proper diagnosis"] },
      { title: "Split AC Service", rating: "4.8 (1123 reviews)", price: "₹499", features: ["Deep cleaning of filters & coils", "Indoor & outdoor unit inspection", "Gas pressure check & performance test"] },
      { title: "Window AC Service", rating: "4.8 (1149 reviews)", price: "₹949", features: ["Checks each AC part for proper working condition", "Inspects the wires for damage, cuts, or wear", "Tests the unit to confirm smooth cooling performance"] },
      { title: "AC Gas Refilling", rating: "4.9 (1356 reviews)", price: "₹1999", features: ["Checks the refrigerant level in the AC unit", "Inspects the system for any gas leakage issues", "Refills the required gas based on AC type"] }
    ],
    "washing-machine-repair": [
      { title: "Washing Machine Service", rating: "4.9 (850 reviews)", price: "₹599", features: ["Drum cleaning & descaling", ...commonFeatures, "Vibration & noise check", "Filter and inlet valve cleaning"] },
      { title: "Full Machine Repair", rating: "4.8 (1220 reviews)", price: "₹499", features: ["Expert diagnosis of any problem", "Motor and PCB health check", "Drain pump and pipe inspection"] },
      { title: "Drum Repair/Replacement", rating: "4.8 (420 reviews)", price: "₹2499", features: ["Bearing replacement", "Spider assembly fix", "Spin cycle optimization"] }
    ],
    "fridge-repair": [
      { title: "Fridge General Checkup", rating: "4.9 (720 reviews)", price: "₹499", features: ["Thermostat & sensor check", ...commonFeatures, "Gas level inspection"] },
      { title: "Fridge Gas Charging", rating: "4.8 (530 reviews)", price: "₹1999", features: ["Leak detection & sealing", "Refrigerant refilling", "Cooling performance test"] }
    ],
    "led-tv-repair": [
      { title: "LED TV Service", rating: "4.9 (1180 reviews)", price: "₹399", features: ["Inspects display panel and backlight health", "Examines internal circuit boards for heat damage", "Evaluates sound quality and connector ports"] },
      { title: "Smart TV Service", rating: "4.8 (1249 reviews)", price: "₹599", features: ["Checks software version and app performance", "Inspects Wi-Fi and Bluetooth connectivity", "Tests the remote sensor and voice control functions"] },
      { title: "TV Backlight Replacement", rating: "4.9 (1456 reviews)", price: "₹1499", features: ["Checks the LED strip voltage and brightness", "Inspects the diffuser sheets for dark spots", "Replaces faulty backlight strips with original parts"] },
      { title: "TV Wall Mounting", rating: "4.9 (1356 reviews)", price: "₹499", features: ["Checks the wall strength for secure mounting", "Installs the bracket with proper level alignment", "Connects HDMI, power, and audio cables neatly"] }
    ],
    "water-purifier-service": [
      { title: "RO General Service", rating: "4.9 (1123 reviews)", price: "₹499", features: ["Cleans all filters and pre-filter housing", "Checks TDS levels and water taste", "Examines pump pressure and auto-cut functionality"] },
      { title: "RO Filter Change", rating: "4.8 (1149 reviews)", price: "₹2499", features: ["Replaces Sediment, Carbon, and Post-Carbon filters", "Checks the UV lamp and UF membrane health", "Tests the water flow and purification speed"] },
      { title: "RO Membrane Replacement", rating: "4.9 (1356 reviews)", price: "₹1899", features: ["Checks current TDS and rejection rate", "Replaces old membrane with high-quality 80/100GPD", "Flushes system and tests water taste"] },
      { title: "Installation Service", rating: "4.9 (1356 reviews)", price: "₹699", features: ["Checks water inlet and pressure conditions", "Installs the RO unit with proper wall mounting", "Connects all tubes, pre-filters, and reject lines"] }
    ],
    "chimney-service": [
      { title: "Chimney Deep Cleaning", rating: "4.9 (1840 reviews)", price: "₹999", features: ["Full degreasing of filters & baffles", "Internal motor & fan cleaning", "Body polishing & hygiene check"] },
      { title: "Chimney Motor Repair", rating: "4.8 (530 reviews)", price: "₹1499", features: ["Motor winding & capacitor check", "Blade balancing & noise reduction", "Genuine motor parts replacement"] },
      { title: "Chimney Installation", rating: "4.9 (420 reviews)", price: "₹1200", features: ["Safe wall mounting & ducting", "Suction power calibration", "User manual and safety briefing"] }
    ]
  };

  return pricingMap[serviceKey] || [];
};

const getCommonIssues = (serviceKey: string) => {
  const issuesMap: Record<string, string[]> = {
    "ac-service": ["AC not cooling properly", "Water leakage from unit", "AC making loud noise", "Bad smell from vents", "Remote not working", "Gas leak detected"],
    "washing-machine-repair": ["Machine Not Starting (PCB/Power)", "Water Not Draining", "Excessive Noise or Vibration", "Water Leakage from bottom/door", "Drum Not Spinning", "Foul Smell or Drum Hygiene", "Door Not Opening/Lock Fault"],
    "fridge-repair": ["Fridge not cooling", "Freezer ice buildup", "Water leaking outside", "Strange clicking noise", "Compressor not starting", "Food spoiling too fast"],
    "led-tv-repair": ["TV has sound but no picture", "Vertical or horizontal lines on screen", "TV not turning on (No power)", "Backlight flickering or dim display", "Remote sensor or Wi-Fi fault", "HDMI or USB port not working"],
    "water-purifier-service": ["TDS level too high or salty taste", "Water leaking from filters or pump", "Constant buzzing or vibrating noise", "Purifier not turning on", "Low water flow rate from tap", "Foul smell from purified water"],
    "chimney-service": ["Low suction power", "Oil dripping from chimney", "Excessive noise or vibration", "Touch panel or switch not working", "Motor not starting", "Burning smell from unit"]
  };
  return issuesMap[serviceKey] || [];
};

const getServiceFaqs = (serviceKey: string, cityName: string) => {
  const generic = [
    { q: `Do you provide doorstep service in ${cityName}?`, a: `Yes, we provide 100% doorstep service across all areas of ${cityName}. Our technicians arrive with all necessary tools to fix the issue on-site.` },
    { q: "Is there a warranty on repairs?", a: "We provide a 30-day service warranty on all our repairs and a 6-month warranty on any spare parts replaced by us." }
  ];

  const serviceSpecific: Record<string, { q: string; a: string }[]> = {
    "ac-service": [
      { q: `How often should I service my AC in ${cityName}?`, a: "Given the climate, we recommend servicing your AC every 3-4 months to maintain air quality and minimize electricity bills." },
      { q: "What is included in a foam-jet wash?", a: "Foam-jet wash includes high-pressure cleaning with anti-bacterial foam that reaches deep inside the coils, removing 99% of dust and allergens." }
    ],
    "washing-machine-repair": [
      { q: `How often should washing machines be serviced?`, a: `It is recommended to service your washing machine every 6–12 months to prevent mold and ensure smooth drum rotation in ${cityName}.` },
      { q: `Do you provide same-day service in ${cityName}?`, a: "Yes, same-day service is available in most locations. Our technicians are local experts ready to help." },
      { q: "Do you offer AMC plans?", a: "Yes, we provide annual maintenance contracts (AMC) for all types of washing machines." },
      { q: "What is the service cost?", a: "The service cost depends on the specific issue and any spare parts required. We offer affordable and transparent pricing." }
    ],
    "led-tv-repair": [
      { q: `Can you fix a broken screen in ${cityName}?`, a: "If the glass is physically cracked, the entire panel needs replacement. For other issues like lines or no display, we can often repair the internal boards or backlight." },
      { q: "Do you provide TV wall mounting?", a: "Yes, we provide professional wall mounting for all TV sizes with high-quality brackets and proper cable management." }
    ],
    "water-purifier-service": [
      { q: `How often should RO filters be replaced in ${cityName}?`, a: "Filters should be replaced every 6–12 months depending on usage and water quality in your area." },
      { q: "Do you provide same-day service?", a: "Yes, same-day service is available in most areas. We ensure fast response and on-time service." },
      { q: "Do you offer AMC plans?", a: "Yes, we provide annual maintenance contracts (AMC) for complete peace of mind." },
      { q: "What is the service cost?", a: "The service cost depends on the specific issue and any parts that may need replacement. We offer affordable service charges." }
    ]
  };

  return [...(serviceSpecific[serviceKey] || []), ...generic];
};

const serviceProcess = [
  { title: "Book a Service", desc: "Schedule online or via a quick phone call." },
  { title: "Check the Problem", desc: "Our expert technician inspects the unit at your doorstep." },
  { title: "Fix the Issue", desc: "We provide high-quality repairs with genuine parts." },
  { title: "Quality Check", desc: "Comprehensive testing to ensure maximum performance." },
  { title: "Test and Finish", desc: "Handover with valuable maintenance tips." },
];

const getServiceImage = (slug: string) => {
  const images: Record<string, string> = {
    "ac-service": serviceAcRepair,
    "chimney-service": serviceChimney,
    "fridge-repair": serviceFridgeRepair,
    "washing-machine-repair": serviceWashingMachine,
    "water-purifier-service": serviceWaterPurifier,
    "led-tv-repair": serviceLedTvRepair
  };
  return images[slug] || serviceAcRepair;
};

const getProcessImage = (slug: string) => {
  return "/images/service-process.png";
};

const getScenarioImage = (slug: string) => {
  const images: Record<string, string> = {
    "led-tv-repair": serviceLedTvRepair,
    "water-purifier-service": serviceWaterPurifier,
    "washing-machine-repair": serviceWashingMachine,
    "fridge-repair": serviceFridgeRepair,
    "ac-service": serviceAcRepair
  };
  return images[slug] || serviceAcRepair;
};

const CityPage = () => {
  const { citySlug, param } = useParams<{ citySlug?: string; param?: string }>();
  const activeSlug = param || citySlug || "";
  
  // Advanced Slug Parsing
  const parsingLogic = (slug: string) => {
    // Sanitize slug (remove leading slashes, etc.)
    const cleanSlug = slug.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
    
    const serviceList = [
      { key: "ac-service", prefixes: ["ac-service-in-", "ac-repair-in-"] },
      { key: "washing-machine-repair", prefixes: ["washing-machine-service-in-", "washing-machine-repair-in-", "washing-machine-repairs-in-"] },
      { key: "fridge-repair", prefixes: ["fridge-service-in-", "refrigerator-repair-in-", "fridge-repair-in-", "refrigerator-service-in-"] },
      { key: "led-tv-repair", prefixes: ["led-tv-repair-in-", "tv-repair-in-", "smart-tv-service-in-", "led-tv-service-in-"] },
      { key: "water-purifier-service", prefixes: ["water-purifier-service-in-", "ro-service-in-", "ro-repair-in-", "water-purifier-repair-in-"] },
      { key: "chimney-service", prefixes: ["kitchen-chimney-service-in-", "chimney-repair-in-", "chimney-cleaning-in-", "chimney-service-in-"] }
    ];

    for (const s of serviceList) {
      for (const prefix of s.prefixes) {
        if (cleanSlug.startsWith(prefix)) {
          let cityPart = cleanSlug.replace(prefix, '');
          // Recursive cleanup for nested prefixes
          for (const s2 of serviceList) {
            for (const p2 of s2.prefixes) {
              cityPart = cityPart.replace(p2, '');
            }
          }
          return { serviceKey: s.key, citySlug: cityPart };
        }
      }
    }
    
    return { serviceKey: "ac-service", citySlug: cleanSlug }; // Default
  };

  const { serviceKey, citySlug: detectedCitySlug } = parsingLogic(activeSlug);
  const selectedService = servicesData.find(s => s.slug === serviceKey) || servicesData[0];
  const sName = selectedService.serviceName;
  const sNameLower = sName.toLowerCase();
  let city = citiesData.find((c) => c.slug === citySlug || c.slug.includes(detectedCitySlug));

  const hashString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
  };

  const effectiveCityName = city?.cityName || detectedCitySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const nearbyAreas = getNearbyLocations(city?.uniqueContent || "", effectiveCityName);

  if (!city || activeSlug.includes('-in-') || (param && param.includes('-'))) {
    const formattedCityName = detectedCitySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const hash = hashString((activeSlug || "") + serviceKey);
    
    const titleVariants = [
      `${sName} in ${formattedCityName} | SwiftCare™ Premium Support`,
      `Best ${sName} & Appliance Repair in ${formattedCityName} | Certified Experts`,
      `Top Rated ${sName} Center in ${formattedCityName} | 100% Genuine Parts`,
      `Affordable ${sName} in ${formattedCityName} | Fast Doorstep Fix`
    ];
    
    const descVariants = [
      `Need urgent ${sNameLower} in ${formattedCityName}? SwiftCare™ offers expert diagnostics, genuine spare parts, and professional repair solutions with a 30-day warranty. Book now!`,
      `Top-rated ${sNameLower} in ${formattedCityName}. Get premium doorstep service for all major brands today. 60-minute response guaranteed with expert SwiftCare™ engineering.`,
      `Expert technicians for ${sNameLower} in ${formattedCityName}. SwiftCare™ fixes complex hardware issues, component failures, and more at your home. Budget-friendly premium pricing.`,
      `Need specialized ${sNameLower} in ${formattedCityName}? Our SwiftCare™ local experts handle all smart features and hardware problems with a full service warranty. Book your appointment.`
    ];

    const heroVariants: Record<string, string[]> = {
      "ac-service": [
        `SwiftCare™ Same-Day AC Service in ${formattedCityName} – Rapid Cooling Restoration. Experience premium AC maintenance with 15-minute response times, certified engineering, and immediate assistance for all repair, cleaning, and gas refilling needs.`,
        `Premium SwiftCare™ AC repair and maintenance in ${formattedCityName}. Our ISO-certified technicians ensure rapid doorstep service with same-day guaranteed fixes and genuine spare parts available for all major brands.`
      ],
      "led-tv-repair": [
        `Elite TV Service in ${formattedCityName} – SwiftCare™ Doorstep Repair Experts. Are you looking for professional 4K/LED TV service in ${formattedCityName}? You've reached the experts. We provide high-precision motherboard and panel repairs across ${formattedCityName}.`,
        `Premium Smart TV repair and installation in ${formattedCityName}. SwiftCare™ same-day doorstep service with 100% genuine parts for Samsung, Sony, LG, and Mi TVs. Our expert technicians ensure high-quality visual recovery.`
      ],
      "washing-machine-repair": [
        `Premium Washing Machine Service in ${formattedCityName} – SwiftCare™ Precision Support. Looking for expert laundry appliance service in ${formattedCityName}? We provide complete solutions including drum restoration, PCB repair, and deep sanitization.`,
        `Expert SwiftCare™ Washing Machine Repair in ${formattedCityName}. Same-day fix for LG, Samsung, IFB, and all major brands. Our skilled local technicians provide elite doorstep service across all areas of ${formattedCityName}.`
      ],
      "water-purifier-service": [
        `SwiftCare™ Same-Day RO Repair in ${formattedCityName} – Pure Water Guaranteed. Book certified RO service the same day with easy scheduling, prompt technician visits, and immediate assistance for leaks, taste issues, and filter change.`,
        `Premium water purifier maintenance and installation in ${formattedCityName}. Get 100% pure water output with SwiftCare™ genuine membrane replacement and expert TDS adjustment by our local ${formattedCityName} team.`
      ],
      "default": [
        `Providing top-quality ${sNameLower} in ${formattedCityName}. Our SwiftCare™ expert technicians ensure rapid doorstep service for your comfort, covering all major localities in ${formattedCityName} with same-day guaranteed fixes.`,
        `Experience the best ${sNameLower} care in ${formattedCityName}. From advanced diagnostics to precision component replacement, SwiftCare™ certified professionals handle all top brands right at your doorstep.`
      ]
    };

    const uniqueVariants: Record<string, string[]> = {
      "ac-service": detectedCitySlug === 'nilgiris' || detectedCitySlug === 'the-nilgiris' ? [
        `<h2 class="text-3xl font-bold mb-6">Expert SwiftCare™ AC & Climate Control in The Nilgiris – Ooty, Coonoor & Kotagiri</h2>
        <p class="mb-4">Searching for reliable <strong class="text-primary underline decoration-primary/30 underline-offset-4">AC service in The Nilgiris</strong>? SwiftCare™ provides specialized climate control solutions tailored for the unique weather of Ooty, Coonoor, and Kotagiri, including heating, cooling, and moisture control.</p>
        <p class="mb-8">Hill stations demand special care. Our technicians are experts in high-altitude AC maintenance, ensuring your hospitality business or home stays perfectly comfortable year-round. From Ooty town to Gudalur, we are the most trusted <strong class="text-primary">AC repair service near me in Nilgiris</strong>. We handle all major brands with 100% genuine parts.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">Specialized Hill-Station Solutions in The Nilgiris</h3>
        <p class="mb-6">Unlike the plains, Nilgiris demands climate control that handles both mist and chill. We specialize in Heat Pump installations and moisture-resistant servicing to protect your units from the Nilgiris mist and prevent mold.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">Service Areas Across The Nilgiris</h3>
        <p class="mb-6">We provide quick and professional AC repair across all major hill station locations:</p>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          ${["Ooty (Udhagamandalam)", "Coonoor", "Kotagiri", "Gudalur", "Pandalur", "Wellington", "Aravankadu", "Pykara", "Kundah"].map(area => `<div class="flex items-center gap-2 py-1 px-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-semibold">● ${area}</div>`).join('')}
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-8">What We Solve in Nilgiris</h3>
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">🌡️ Heating & Cooling</h4>
            <p class="text-muted-foreground">Expert servicing for Hot & Cold AC units and Heat Pumps to keep you warm in winters and cool in summers.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">🌫️ Moisture Control</h4>
            <p class="text-muted-foreground">Deep cleaning and preventive maintenance to stop mold and moisture buildup caused by the unique mountain climate.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">⛰️ High Altitude Care</h4>
            <p class="text-muted-foreground">Calibration of sensors and pressure levels specifically for high-altitude operation and efficiency.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">🧤 Hospitality Specialized</h4>
            <p class="text-muted-foreground">Preferred partners for Nilgiris hotels and resorts, ensuring zero-downtime guest comfort.</p>
          </div>
        </div>

        <div class="bg-primary/5 rounded-[3rem] p-8 md:p-12 border border-primary/10 mb-12">
          <div class="grid md:grid-cols-2 gap-10">
            <div>
              <h3 class="text-2xl font-bold mb-6">SwiftCare™ Nilgiris Service Menu</h3>
              <ul class="space-y-3">
                ${["Hot & Cold AC Installation", "Heat Pump Servicing", "Ooty Doorstep AC Repair", "Dehumidification System Setup", "Hospitality AMC (Hotels/Resorts)", "Emergency Breakdown Fix"].map(svc => `<li class="flex items-center gap-3 text-foreground/80 font-medium">✓ ${svc}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-6">Why Trust SwiftCare™ in Nilgiris</h3>
              <ul class="space-y-3">
                 ${["Hill-Station Climate Experts", "Fast Response across Ooty/Coonoor", "30-Day Mountains-Safe Warranty", "Experienced with Inverter/Hot-Cold Units", "Verified & Professional Local Techs"].map(why => `<li class="flex items-center gap-3 text-foreground/80 font-medium text-sm">● ${why}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <div class="p-8 bg-accent rounded-3xl text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-2">Book Your Nilgiris AC Service Today</h3>
            <p class="opacity-90 max-w-lg">Expert cooling and heating restoration for Ooty, Coonoor, and Kotagiri. SwiftCare™ is ready to serve you at your doorstep.</p>
          </div>
          <div class="bg-white text-accent px-8 py-4 rounded-full font-black text-lg shadow-xl shrink-0">
             Call: ${PHONE_NUMBER}
          </div>
        </div>`
      ] : [
        `<h2 class="text-3xl font-bold mb-6">Elite SwiftCare™ AC Repair & Service in ${formattedCityName} – Certified Doorstep Support</h2>
        <p class="mb-4">Searching for professional <strong class="text-primary underline decoration-primary/30 underline-offset-4">AC service in ${formattedCityName}</strong>? SwiftCare™ provides complete air conditioning solutions including advanced chemical jet-wash, precise gas refilling, and component repairs for all split and window AC models.</p>
        <p class="mb-8">Beat the heat with our expert technicians who ensure your AC works at peak efficiency. From urgent cooling issues to regular maintenance, we are the most trusted <strong class="text-primary">AC repair service near me in ${formattedCityName}</strong>. Our team handles all major brands with 100% genuine parts and guaranteed satisfaction.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">Complete AC Engineering Solutions in ${formattedCityName}</h3>
        <p class="mb-6">We offer end-to-end AC services designed for premium residential and commercial needs. Whether it is a simple filter cleaning or a complex inverter PCB replacement, we ensure a cool and comfortable environment for you.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">SwiftCare™ Localized Coverage in ${formattedCityName}</h3>
        <p class="mb-6">We provide rapid-response AC repair across all major locations in ${formattedCityName}:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          ${nearbyAreas.slice(0, 16).map(area => `<div class="flex items-center gap-2 py-1 px-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-semibold">● ${area}</div>`).join('')}
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-8">Common AC Problems SwiftCare™ Fixes</h3>
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">❄️ Instant Cooling Restoration</h4>
            <p class="text-muted-foreground">Fixed by checking gas levels, cleaning choked filters, and inspecting the outdoor unit with digital gauges.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">💧 Leakage & Blockage Clear</h4>
            <p class="text-muted-foreground">Resolved by deep cleaning the drain line and servicing the indoor unit tray with anti-bacterial solution.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">⚡ Gas Refilling (Eco-Friendly)</h4>
            <p class="text-muted-foreground">We use high-quality R32, R410A, or R22 gas with proper pressure testing and leak detection.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10">
            <h4 class="font-bold text-xl mb-3">🔊 Silent Operation Fix</h4>
            <p class="text-muted-foreground">Repaired by fixing fan motor issues, loose panels, or compressor dampening for a peaceful environment.</p>
          </div>
        </div>

        <div class="bg-primary/5 rounded-[3rem] p-8 md:p-12 border border-primary/10 mb-12">
          <div class="grid md:grid-cols-2 gap-10">
            <div>
              <h3 class="text-2xl font-bold mb-6">SwiftCare™ AC Services</h3>
              <ul class="space-y-3">
                ${["Split AC General Service", "Window AC Repair", "AC Installation & Uninstallation", "Gas Filling with Leakage Test", "Advanced Foam-Jet Cleaning", "PCB Repair & Replacement"].map(svc => `<li class="flex items-center gap-3 text-foreground/80 font-medium">✓ ${svc}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-6">Why Choose SwiftCare™</h3>
              <ul class="space-y-3">
                ${["Certified HVAC Engineers", "15-Minute Response Time", "30-Day Service Warranty", "Upfront Transparent Pricing", "100% Genuine Spare Parts"].map(why => `<li class="flex items-center gap-3 text-foreground/80 font-medium text-sm">● ${why}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-6">Authorized Brand Support in ${formattedCityName}</h3>
        <div class="flex flex-wrap gap-2 mb-12">
          ${["Voltas", "Daikin", "LG", "Samsung", "Blue Star", "Lloyd", "Mitsubishi", "Hitachi", "Carrier", "Panasonic"].map(brand => `<span class="px-4 py-2 bg-background border border-border rounded-xl font-bold text-xs shadow-sm">${brand}</span>`).join('')}
        </div>

        <div class="p-8 bg-accent rounded-3xl text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-2">Book Your SwiftCare™ AC Service in ${formattedCityName}</h3>
            <p class="opacity-90 max-w-lg">Get expert cooling restoration today. Our technicians are already providing doorstep service in your locality.</p>
          </div>
          <div class="bg-white text-accent px-8 py-4 rounded-full font-black text-lg shadow-xl shrink-0">
             Call: ${PHONE_NUMBER}
          </div>
        </div>`
      ],

      "chimney-service": [
        `<h2 class="text-3xl font-bold mb-6">Premium SwiftCare™ Kitchen Chimney Service in ${formattedCityName} – Deep Cleaning & Repair</h2>
        <p class="text-lg mb-6 leading-relaxed">Looking for elite <strong class="text-primary underline decoration-primary/30 underline-offset-4">chimney service in ${formattedCityName}</strong>? SwiftCare™ provides specialized kitchen exhaust solutions including ultrasonic cleaning, suction restoration, and motor repair across ${formattedCityName}.</p>
        <p class="mb-6">Our mission is to keep your kitchen smoke-free, hygienic, and safe. With certified technicians and same-day doorstep service, we handle all premium kitchen chimneys with precision. If you are searching for <strong class="text-primary">chimney repair near me in ${formattedCityName}</strong>, our SwiftCare™ local team is ready to assist.</p>

        <div class="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/20 mb-12">
          <h3 class="text-2xl font-bold mb-4 italic">Complete Kitchen Engineering in ${formattedCityName}</h3>
          <p class="mb-4">We offer end-to-end chimney maintenance designed for modern residential and commercial kitchens. Whether your unit needs a simple filter degreasing or a complex motor replacement, SwiftCare™ ensures 100% suction efficiency.</p>
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-6">SwiftCare™ Localized Support in ${formattedCityName}</h3>
        <p class="mb-6 text-muted-foreground font-medium">We provide rapid-response chimney service across all major locations in ${formattedCityName}:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          ${nearbyAreas.slice(0, 10).map((area, i) => `
            <div class="flex items-center gap-3 px-6 py-3 bg-background border border-border rounded-2xl shadow-sm hover:border-primary/40 transition-all">
              <span class="text-primary font-bold">#${i+1}</span>
              <span class="font-bold text-foreground">SwiftCare™ Chimney Service in ${area}</span>
            </div>
          `).join('')}
        </div>

        <div class="grid lg:grid-cols-2 gap-10 mb-16">
          <div class="space-y-8">
            <h3 class="text-2xl font-display font-black border-l-4 border-primary pl-4 uppercase tracking-tighter text-primary">Common Chimney Issues SwiftCare™ Resolves</h3>
            <div class="space-y-6">
              ${[
                { q: "Poor Suction & Heavy Smoke", a: "We perform deep chemical cleaning of filters and service the blower to restore original suction power." },
                { q: "Oil and Grease Accumulation", a: "Our team uses specialized degreasers for internal and external cleaning, preventing fire hazards." },
                { q: "Motor Noise or Vibration", a: "We balance the motor fan and replace worn-out bearings for a silent, smooth kitchen environment." },
                { q: "Touch Panel & Sensor Faults", a: "We repair electronic control boards and sensors to restore full smart functionality." },
                { q: "Auto-Clean System Failure", a: "SwiftCare™ experts repair heating elements and internal auto-clean circuits efficiently." }
              ].map(issue => `
                <div class="group">
                  <h4 class="font-bold text-foreground border-b border-primary/10 pb-2 mb-2 group-hover:text-primary transition-colors">${issue.q}</h4>
                  <p class="text-sm text-muted-foreground">${issue.a}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="bg-foreground text-background p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h3 class="text-2xl font-bold mb-8 text-primary">Elite Brand Support</h3>
            <div class="space-y-6">
              <div>
                <p class="text-xs uppercase tracking-widest text-primary font-black mb-4">Chimney Architectures</p>
                <div class="flex flex-wrap gap-2">
                  ${["Wall-mounted", "Island", "Built-in", "Auto-clean", "Baffle Filter", "Filterless"].map(t => `<span class="px-3 py-1 bg-white/10 rounded-lg text-sm border border-white/10">${t}</span>`).join('')}
                </div>
              </div>
              <div>
                <p class="text-xs uppercase tracking-widest text-primary font-black mb-4">Supported Brands</p>
                <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                  ${["Faber", "Elica", "Hindware", "Glen", "Kaff", "Prestige", "Bosch", "Sunflame"].map(b => `<div class="flex items-center gap-2 text-sm opacity-90">✓ <span class="font-bold">${b}</span></div>`).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-12 bg-accent rounded-[3.5rem] text-white mb-16 relative overflow-hidden">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
          <div class="max-w-xl relative z-10">
            <h3 class="text-3xl font-bold mb-6">Why Trust SwiftCare™ in ${formattedCityName}</h3>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
              ${["Certified Chimney Techs", "15-Min Response Time", "Competitive Pricing", "Genuine Parts & Spares", "Hygienic On-Site Cleaning", "Full Service Warranty"].map(w => `<li class="flex items-center gap-3">✔ ${w}</li>`).join('')}
            </ul>
          </div>
          <div class="mt-10 flex flex-wrap gap-4">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            ${["Book Service", "Share Location", "Tech Assigned", "Visit & Inspect", "Cleaning/Repair", "Test & Finish"].map((step, i) => `
              <div class="p-6 bg-background border border-border rounded-[2rem] text-center shadow-lg hover:shadow-primary/5 transition-all">
                <div class="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black mx-auto mb-4">${i+1}</div>
                <p class="text-xs font-bold leading-tight uppercase tracking-tighter">${step}</p>
              </div>
            `).join('')}
          </div>
        </div>`
      ],
      "led-tv-repair": [
        `<h2 class="text-3xl font-bold mb-6">Elite SwiftCare™ TV Service in ${formattedCityName} – Precision Doorstep Support</h2>
        <p class="mb-4">Are you looking for professional and certified <strong class="text-primary underline decoration-primary/30 underline-offset-4">TV service in ${formattedCityName}</strong>? SwiftCare™ provides high-precision repairs for all 4K, Smart, LED, and OLED televisions.</p>
        <p class="mb-8">We are the most trusted television repair experts in ${formattedCityName}, offering advanced motherboard and panel solutions across all major areas. SwiftCare™ ensures that your entertainment is never interrupted, handling everything from backlight replacement to complex software troubleshooting.</p>
        
        <p class="mb-8">Your Smart TV is the heart of your home entertainment. That is why we focus on same-day service, accurate diagnostics with digital tools, and long-lasting repair guarantees in ${formattedCityName}. If you are searching for <strong class="text-primary">TV repair service near me in ${formattedCityName}</strong>, our SwiftCare™ engineers are already in your locality.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">SwiftCare™ Service Grid in ${formattedCityName}</h3>
        <p class="mb-6">We actively provide expert TV repair across ${formattedCityName} with guaranteed 60-minute response times:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          ${nearbyAreas.slice(0, 16).map(area => `<div class="flex items-center gap-2 py-1 px-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-semibold">● ${area}</div>`).join('')}
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-8">Premium Solutions for All TV Issues</h3>
        <div class="space-y-6 mb-12">
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">⚡ Power & Motherboard Restoration</h4>
            <p class="text-muted-foreground">Fixed by component-level repair of the main board and SMPS power module using original SwiftCare™ parts in <span class="font-bold text-foreground">${nearbyAreas[0] || formattedCityName}</span>.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">📺 Advanced Panel & Display Fix</h4>
            <p class="text-muted-foreground">Specialized repair for vertical lines, flickering screens, and color distortion for residents in <span class="font-bold text-foreground">${nearbyAreas[2] || formattedCityName}</span>.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">💡 LED Backlight Replacement</h4>
            <p class="text-muted-foreground">SwiftCare™ replaces the entire backlight set with original high-lumen strips to restore perfect brightness and contrast.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">🛠️ Smart TV Software Update</h4>
            <p class="text-muted-foreground">Resolving app loading issues, hanging, and Wi-Fi connectivity problems with official firmware updates.</p>
          </div>
        </div>

        <div class="bg-primary/5 rounded-[3rem] p-8 md:p-12 border border-primary/10 mb-12">
          <div class="grid md:grid-cols-2 gap-10">
            <div>
              <h3 class="text-2xl font-bold mb-6">SwiftCare™ TV Service Menu</h3>
              <ul class="space-y-3">
                ${[
                  "Complete Power Failure Fix",
                  "Sound No Picture Repair",
                  "Vertical/Horizontal Line Fix",
                  "Audio & Speaker Restoration",
                  "LED Backlight Replacement",
                  "Motherboard Component Repair",
                  "HDMI & Port Connectivity Fix",
                  "Smart TV OS Optimization"
                ].map(svc => `<li class="flex items-center gap-3">✓ <span class="font-medium text-sm">${svc}</span></li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-6">Why Choose SwiftCare™</h3>
              <ul class="space-y-3">
                ${[
                  "ISO-Certified TV Technicians",
                  "15-Minute Rapid Response",
                  "Upfront Premium Pricing",
                  "100% Genuine Spare Parts",
                  "90-Day Component Warranty",
                  "Zero-Damage Handling Policy"
                ].map(why => `<li class="flex items-center gap-3">● <span class="font-medium text-sm">${why}</span></li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-6">Global Brand Support in ${formattedCityName}</h3>
        <div class="flex flex-wrap gap-2 mb-12">
          ${["Samsung", "LG", "Sony", "Mi", "OnePlus", "Panasonic", "TCL", "Vu", "Realme", "Haier", "Micromax", "Lloyd"].map(brand => `<span class="px-4 py-2 bg-background border border-border rounded-xl font-bold text-xs shadow-sm">${brand}</span>`).join('')}
        </div>

        <div class="p-8 bg-accent rounded-3xl text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 class="text-2xl font-bold mb-2">Book Your SwiftCare™ TV Service Today</h3>
            <p class="opacity-90 max-w-lg">Experience high-fidelity visual recovery with our expert engineers. We are available at your doorstep in ${formattedCityName} now.</p>
          </div>
          <div class="bg-white text-accent px-8 py-4 rounded-full font-black text-lg shadow-xl shrink-0">
            Call: ${PHONE_NUMBER}
          </div>
        </div>`
      ],

      "washing-machine-repair": [
        `<h2 class="text-3xl md:text-4xl font-bold mb-6">Elite SwiftCare™ Washing Machine Service in ${formattedCityName} – Precision Engineering</h2>
        <p class="text-lg mb-4">Looking for professional <strong class="text-primary underline decoration-primary/30 underline-offset-4">washing machine service in ${formattedCityName}</strong>?</p>
        <p class="mb-6">SwiftCare™ provides elite laundry appliance solutions including drum restoration, PCB repair, and deep sanitization across <span class="font-bold underline decoration-primary/20">${formattedCityName}</span>. Our expert engineers ensure your machine runs with factory-level efficiency.</p>
        <p class="mb-8 p-6 bg-primary/5 rounded-[2.5rem] border-l-4 border-primary italic">With ISO-certified technicians and rapid doorstep service, we handle all front-load, top-load, and automatic machines. If you are searching for <strong class="text-primary">washing machine repair near me in ${formattedCityName}</strong>, we are already serving your area.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">Comprehensive Laundry Solutions in ${formattedCityName}</h3>
        <p class="mb-8">We offer specialized maintenance for premium residential and commercial laundry units. From minor leaks to complex electronic failures, SwiftCare™ delivers reliable, long-lasting restoration.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">SwiftCare™ Service Locations in ${formattedCityName}</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          ${nearbyAreas.slice(0, 16).map(area => `
            <div class="flex items-center gap-2 py-2 px-3 bg-primary/5 rounded-xl border border-primary/10 text-xs font-semibold">
              <span class="text-primary">●</span> ${area}
            </div>`).join('')}
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-8 uppercase tracking-wider text-primary">Common Machine Issues SwiftCare™ Fixes</h3>
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          ${[
            { t: "Electronic PCB Faults", d: "We repair and calibrate control boards to resolve error codes and cycle failures." },
            { t: "Drain Pump & Hose Blockage", d: "Expert cleaning and pump replacement to ensure perfect water drainage." },
            { t: "Drum Suspension & Noise", d: "We fix vibration and loud noise by replacing suspension rods and bearings." },
            { t: "Inlet & Water Leakage", d: "Precision sealing and valve replacement to stop all water wastage." },
            { t: "Motor & Belt Replacement", d: "High-torque motor repair to restore powerful spinning and agitation." },
            { t: "Deep Drum Sanitization", d: "Chemical cleaning to remove mold and odor, keeping your laundry fresh." }
          ].map(it => `
            <div class="p-6 bg-card rounded-[2rem] border border-border hover:shadow-lg hover:border-primary/20 transition-all group">
              <h4 class="font-bold text-lg mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                <span class="w-2 h-6 bg-primary rounded-full"></span> ${it.t}
              </h4>
              <p class="text-sm text-muted-foreground">${it.d}</p>
            </div>
          `).join('')}
        </div>

        <div class="bg-primary/5 rounded-[3rem] p-8 md:p-14 border border-primary/10 mb-12 relative overflow-hidden">
          <div class="relative z-10 grid md:grid-cols-2 gap-10">
            <div>
              <h3 class="text-2xl font-bold mb-8 underline decoration-primary/20 underline-offset-8">SwiftCare™ Service Menu</h3>
              <ul class="space-y-4">
                ${[
                  "Automatic Machine Installation", "Periodic Health Maintenance", "Anti-Bacterial Drum Cleaning", 
                  "Full Component Repair", "Digital Error Code Diagnosis", "Original PCB Restoration", 
                  "Industrial AMC Solutions", "Safety Performance Testing"
                ].map(svc => `<li class="flex items-center gap-3 text-foreground/80 font-bold text-sm">
                  <div class="bg-primary p-0.5 rounded-full"><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path></svg></div>
                  ${svc}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-8 underline decoration-primary/20 underline-offset-8">Certified Support</h3>
              <div class="space-y-6">
                <div>
                  <p class="text-[10px] font-black uppercase text-primary mb-3">Unit Architectures:</p>
                  <div class="flex flex-wrap gap-2">
                    ${["Front Load", "Top Load", "Washer-Dryer Combo", "Fully Automatic", "Inverter Drive"].map(t => `<span class="px-3 py-1.5 bg-white border border-border rounded-lg text-[11px] font-bold">${t}</span>`).join('')}
                  </div>
                </div>
                <div>
                  <p class="text-[10px] font-black uppercase text-primary mb-3">Premium Brands Supported:</p>
                  <div class="flex flex-wrap gap-2">
                    ${["IFB", "LG", "Samsung", "Whirlpool", "Bosch", "Panasonic", "Haier", "Godrej"].map(b => `<span class="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-[11px] font-black">${b}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8 md:p-12 bg-accent rounded-[3.5rem] text-white mb-12 relative overflow-hidden shadow-2xl">
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div class="max-w-xl text-center md:text-left">
              <h3 class="text-3xl font-bold mb-4">Book SwiftCare™ Laundry Support in ${formattedCityName}</h3>
              <p class="text-white/80 text-lg">Don't let machine failures disrupt your routine. Contact our local ${formattedCityName} team for professional doorstep restoration today.</p>
            </div>
            <a href="tel:${PHONE_NUMBER}" class="bg-white text-accent px-12 py-5 rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform flex items-center gap-3">
               <span class="text-sm opacity-50 font-normal uppercase">Call Expert:</span> ${PHONE_NUMBER}
            </a>
          </div>
        </div>`
      ],

      "fridge-repair": [
        `<h2 class="text-3xl font-bold mb-6">Elite SwiftCare™ Refrigerator & Fridge Repair in ${formattedCityName}</h2>
        <p class="mb-4">Searching for professional <strong class="text-primary underline decoration-primary/30 underline-offset-4">fridge service in ${formattedCityName}</strong>? SwiftCare™ provides premium repair and maintenance for all side-by-side, French-door, and inverter refrigerators.</p>
        <p class="mb-8">From eco-friendly gas charging to high-efficiency compressor replacement, our expert technicians in ${formattedCityName} ensure your food stays fresh and your appliance runs perfectly. We are the leading choice for <strong class="text-primary">refrigerator repair near me in ${formattedCityName}</strong>.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">SwiftCare™ Coverage Areas in ${formattedCityName}</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          ${nearbyAreas.slice(0, 16).map(area => `<div class="flex items-center gap-2 py-1 px-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-semibold">● ${area}</div>`).join('')}
        </div>

        <div class="bg-accent/5 rounded-[3rem] p-8 md:p-12 border border-primary/10 mb-12">
          <div class="grid md:grid-cols-2 gap-10">
            <div>
              <h3 class="text-2xl font-bold mb-6">Fridge Issues SwiftCare™ Fixes</h3>
              <ul class="space-y-3">
                ${["Internal Cooling Failure Repair", "Automatic Defrost Cycle Fix", "Compressor Noise & Vibration Check", "Gas Leakage Detection & Refill", "Motherboard & Sensor Calibration"].map(svc => `<li class="flex items-center gap-3 text-foreground/80 font-medium">✓ ${svc}</li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-6">Elite Service Features</h3>
              <ul class="space-y-3">
                ${["Same-Day Doorstep Service", "100% Genuine Spare Parts", "Digital Diagnostic Check", "Eco-Friendly Gas Refilling", "90-Day Component Warranty"].map(why => `<li class="flex items-center gap-3 text-foreground/80 font-medium text-sm">● ${why}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-6">Premium Brands Serviced in ${formattedCityName}</h3>
        <div class="flex flex-wrap gap-2 mb-12">
          ${["LG", "Samsung", "Whirlpool", "Haier", "Godrej", "Bosch", "Panasonic", "Voltas Beko"].map(brand => `<span class="px-4 py-2 bg-background border border-border rounded-xl font-bold text-xs shadow-sm">${brand}</span>`).join('')}
        </div>

        <div class="p-8 bg-accent rounded-3xl text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
             <h3 class="text-2xl font-bold">Urgent Fridge Restoration in ${formattedCityName}</h3>
             <p class="opacity-90">Avoid food spoilage and health risks. Call SwiftCare™ now for an immediate doorstep engineer visit.</p>
          </div>
          <div class="bg-white text-accent px-8 py-4 rounded-full font-black text-lg shadow-xl shrink-0">
             Call: ${PHONE_NUMBER}
          </div>
        </div>`
      ],

      "water-purifier-service": [
        `<h2 class="text-3xl font-bold mb-6">SwiftCare™ Water Purifier (RO) Service in ${formattedCityName} – 100% Purity Guaranteed</h2>
        <p class="mb-4">Looking for expert <strong class="text-primary underline decoration-primary/30 underline-offset-4">RO service in ${formattedCityName}</strong>? SwiftCare™ provides comprehensive water purifier solutions including filter replacement, membrane restoration, and TDS optimization across ${formattedCityName}.</p>
        <p class="mb-8">Your health depends on the purity of your water. With ISO-certified technicians and rapid doorstep service, we handle all smart RO systems with clinical precision. If you are searching for <strong class="text-primary">water purifier repair near me in ${formattedCityName}</strong>, we are available in your area.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">Complete RO Engineering in ${formattedCityName}</h3>
        <p class="mb-6">We offer end-to-end RO maintenance designed for premium residential and commercial needs. Whether your purifier needs a periodic filter change or a complete system overhaul, SwiftCare™ ensures safe and healthy drinking water.</p>

        <h3 class="text-2xl font-bold mt-12 mb-6">SwiftCare™ Service Locations in ${formattedCityName}</h3>
        <p class="mb-6 font-medium">Rapid response water purifier service across all major locations in ${formattedCityName}:</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          ${nearbyAreas.slice(0, 16).map(area => `<div class="flex items-center gap-2 py-1 px-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-semibold">● ${area}</div>`).join('')}
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-8">Common RO Issues SwiftCare™ Handles</h3>
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">💧 High TDS & Poor Taste</h4>
            <p class="text-muted-foreground">We replace the RO membrane and activated carbon filters to restore the natural mineral balance and taste.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">📉 Low Flow & Pump Noise</h4>
            <p class="text-muted-foreground">SwiftCare™ experts repair or replace booster pumps and clean internal solenoids for a steady flow.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">🚿 System Leakage Control</h4>
            <p class="text-muted-foreground">Replacing damaged push-fit connectors and elbows to stop all water wastage and protect your appliance.</p>
          </div>
          <div class="p-6 bg-accent/5 rounded-[2rem] border border-primary/10 relative overflow-hidden group">
            <h4 class="font-bold text-xl mb-3 flex items-center gap-3">🔌 Power & UV Lamp Faults</h4>
            <p class="text-muted-foreground">Repairing power adapters and replacing UV lamps to ensure 100% disinfection of your water.</p>
          </div>
        </div>

        <div class="bg-primary/5 rounded-[3rem] p-8 md:p-12 border border-primary/10 mb-12">
          <div class="grid md:grid-cols-2 gap-10">
            <div>
              <h3 class="text-2xl font-bold mb-6">SwiftCare™ RO Services</h3>
              <ul class="space-y-3">
                ${[
                  "Professional RO Installation",
                  "Periodic Filter Set Replacement",
                  "Original RO Membrane Fitting",
                  "TDS Level Optimization",
                  "Leakage and Pump Repair",
                  "Digital Health Check-up",
                  "Full System Descaling",
                  "Water Quality Lab Testing"
                ].map(svc => `<li class="flex items-center gap-3">✓ <span class="font-medium text-sm">${svc}</span></li>`).join('')}
              </ul>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-6">Why Trust SwiftCare™</h3>
              <ul class="space-y-3">
                ${[
                  "Hygienic Service Standards",
                  "Genuine Food-Grade Spares",
                  "15-Minute Response Time",
                  "Digital TDS Monitoring",
                  "30-Day Service Guarantee",
                  "Expert Multi-Brand Techs"
                ].map(why => `<li class="flex items-center gap-3">● <span class="font-medium text-sm">${why}</span></li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <h3 class="text-2xl font-bold mt-12 mb-6">Authorized Brand Support in ${formattedCityName}</h3>
        <div class="flex flex-wrap gap-2 mb-12">
          ${["Kent", "Aquaguard", "Livpure", "Pureit", "Blue Star", "AO Smith", "Eureka Forbes", "Whirlpool"].map(brand => `<span class="px-4 py-2 bg-background border border-border rounded-xl font-bold text-xs shadow-sm">${brand}</span>`).join('')}
        </div>

        <div class="p-8 bg-accent rounded-3xl text-white mb-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h3 class="text-2xl font-bold mb-2">Book Your SwiftCare™ RO Service</h3>
            <p class="opacity-90 max-w-lg">Don't compromise on your family's health. Contact us for professional water purification service in ${formattedCityName} today.</p>
          </div>
          <div class="bg-white text-accent px-8 py-4 rounded-full font-black text-lg shadow-xl shrink-0">
            Call: ${PHONE_NUMBER}
          </div>
        </div>`
      ],

      "default": [
        `<h2 class="text-3xl font-bold mb-6">Premium SwiftCare™ ${sName} in ${formattedCityName} – Expert Engineering</h2>
        <p class="mb-4">Get the best <strong class="text-primary underline decoration-primary/30 underline-offset-4">${sNameLower} in ${formattedCityName}</strong> from SwiftCare™ certified professionals. We provide rapid, reliable, and premium restoration for all major brands.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-8">
          ${nearbyAreas.slice(0, 16).map(area => `<div class="flex items-center gap-2 py-1 px-3 bg-primary/5 rounded-lg border border-primary/10 text-xs font-semibold">● ${area}</div>`).join('')}
        </div>
        <div class="p-8 bg-accent/5 rounded-[2.5rem] border border-primary/10 mb-10">
          <h3 class="text-2xl font-bold mb-4">Why Residents of ${formattedCityName} Choose SwiftCare™?</h3>
          <p class="text-muted-foreground mb-6">We have over a decade of experience in providing high-precision appliance restoration. From urgent repairs to factory-standard maintenance, our team ensures 100% satisfaction.</p>
          <div class="grid sm:grid-cols-2 gap-4">
            ${["ISO-Certified Engineers", "Transparent Premium Pricing", "Full Service Guarantee", "15-Minute Local Response"].map(f => `<div class="flex items-center gap-3">✓ <span class="font-bold text-sm">${f}</span></div>`).join('')}
          </div>
        </div>`
      ]
    };

    const selectedHero = heroVariants[serviceKey] || heroVariants["default"];
    const selectedUnique = uniqueVariants[serviceKey] || uniqueVariants["default"];

    city = {
      cityName: formattedCityName,
      slug: citySlug || "",
      metaTitle: titleVariants[hash % titleVariants.length],
      metaDescription: descVariants[hash % descVariants.length],
      heroContent: selectedHero[hash % selectedHero.length],
      uniqueContent: selectedUnique[hash % selectedUnique.length]
    };
  }


  const cityHash = hashString(city.cityName + serviceKey);
  const variantIndex = cityHash % 3;

  const getSuccessStories = (sKey: string, cName: string, areas: string[]) => {
    const sName = servicesData.find(s => s.slug === sKey)?.serviceName || "Appliance Repair";
    
    const stories: Record<string, any[]> = {
      "ac-service": [
         { area: areas[0] || cName, service: "AC Service", text: `We performed a complete maintenance and chemical wash for a split AC in ${areas[0] || cName}. The cooling efficiency was restored perfectly.` },
         { area: areas[1] || cName, service: "AC Gas Refill", text: `Detected a minor leak and refilled R32 gas for a window AC in ${areas[1] || cName}, ensuring 100% cooling within 45 minutes.` }
      ],
      "washing-machine-repair": [
         { area: areas[0] || cName, service: "Drum Repair", text: `Fixed a major vibration issue for a front-load washer in ${areas[0] || cName} by replacing the suspension rods and drum bearings.` },
         { area: areas[1] || cName, service: "PCB Service", text: `Resolved an error code problem on a fully automatic top-load machine in ${areas[1] || cName} by repairing the electronic circuit board.` }
      ],
      "fridge-repair": [
         { area: areas[0] || cName, service: "Compressor Fix", text: `A double-door refrigerator in ${areas[0] || cName} was not cooling. Our tech replaced the relay and optimized the compressor performance.` },
         { area: areas[1] || cName, service: "Gas Charging", text: `Performed nitrogen testing and refilled refrigerant for a side-by-side fridge in ${areas[1] || cName}, restoring optimal freezing.` }
      ],
      "chimney-service": [
         { area: areas[0] || cName, service: "Chimney Cleaning", text: `Removed thick grease and oil from a kitchen chimney in ${areas[0] || cName}. Suction power jumped from almost zero to full capacity.` },
         { area: areas[1] || cName, service: "Motor Balancing", text: `Fixed a high vibration and noise issue for an island chimney in ${areas[1] || cName} by balancing the motor fan and tightening the mountings.` }
      ],
    "led-tv-repair": [
       { area: areas[0] || cName, service: "Backlight Repair", text: `Fixed a 'Sound OK, No Picture' problem for a 55-inch Smart TV in ${areas[0] || cName}. We replaced the entire LED backlight strip set with original parts.` },
       { area: areas[1] || cName, service: "Motherboard Service", text: `Resolved a restart and hanging issue for a Sony Bravia TV in ${areas[1] || cName} by repairing the main motherboard at component level.` }
    ],
      "water-purifier-service": [
         { area: areas[0] || cName, service: "Filter Change", text: `Conducted a comprehensive RO service in ${areas[0] || cName}, replacing all filters and the membrane to ensure 100% pure drinking water.` },
         { area: areas[1] || cName, service: "Pump Repair", text: `Fixed a low-pressure issue for an RO purifier in ${areas[1] || cName} by repairing the booster pump and adjusting the TDS level.` }
      ]
    };

    const selectedStories = stories[sKey] || [
      { area: areas[0] || cName, service: sName, text: `We successfully completed a comprehensive repair of a ${sName.toLowerCase()} in ${areas[0] || cName}, ensuring all components are back to original performance.` },
      { area: areas[1] || cName, service: `${sName} Fix`, text: `Our technician resolved a critical hardware failure for a customer in ${areas[1] || cName} and provided a complete health report of the appliance.` }
    ];
    
    // Add a third generic story to make it 3
    return [...selectedStories, { area: areas[2] || cName, service: "Expert Repair", text: `A customer in ${areas[2] || cName} requested urgent help for their ${sName.toLowerCase()}. Our team arrived in 30 minutes and resolved the hardware failure instantly.` }].slice(0, 3);
  };

  const successStories = getSuccessStories(serviceKey, city.cityName, nearbyAreas);

  const getScenario = (sKey: string, cName: string, area: string) => {
    const sName = servicesData.find(s => s.slug === sKey)?.serviceName || "Appliance Repair";
    const scenarios = [
      `"A customer residing in ${area} reached out to us with a ${sName.toLowerCase()} problem that was causing significant inconvenience. The technician arrived rapidly and quickly discovered the root cause using advanced diagnostic tools. After a prompt and thorough repair with genuine parts, the appliance was restored to peak efficiency, leaving the customer extremely satisfied with our fast response."`,
      `"We received an emergency service request from a household in ${area} experiencing a sudden breakdown of their ${sName.toLowerCase()}. Our response technician found a critical component failure that required immediate attention. By executing a precise repair procedure and applying preventive maintenance, we fixed the issue entirely on the spot, ensuring the customer's daily routine wasn't disrupted further."`,
      `"During a busy weekend, a client in ${area} faced a complete failure of their primary ${sName.toLowerCase()}. Understanding the urgency, our expert team performed a rapid diagnostic and executed a professional restoration procedure. The entire system was tested and brought back to optimal performance on the exact same day, securing the comfort of the household."`
    ];
    return scenarios[hashString(cName + sKey) % 3];
  };

  const selectedScenario = getScenario(serviceKey, city.cityName, nearbyAreas[0] || city.cityName);

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(city.cityName + ", Tamil Nadu")}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const servicePricingData = getServicePricing(serviceKey);
  const serviceCommonIssues = getCommonIssues(serviceKey);
  const serviceFaqs = getServiceFaqs(serviceKey, city.cityName);

  const faqSchemaData = serviceFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": `${BUSINESS_NAME} ${selectedService.serviceName} in ${city.cityName}`,
        "description": city.metaDescription,
        "areaServed": { "@type": "City", name: city.cityName },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": city.cityName,
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "telephone": PHONE_NUMBER
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqSchemaData
      }
    ]
  };

  const highlightText = (text: string) => {
    if (!text) return null;
    // Removed outer parenthesis from regex to prevent duplication in split results
    const regex = /washing machine repair|washing machine|fridge service|refrigerator repair|fridge|refrigerator|AC service|AC repair|RO service|RO repair|RO membrane|RO water purifier|water purifier|LED TV repair|Smart TV service|TV repair|TV installation|TV wall mounting|split AC|window AC|inverter ac|same day service|doorstep service|genuine spare parts|genuine parts|compressor repair|gas filling|backlight replacement|panel repair/gi;
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

  const renderContent = (content: string, className: string = "") => {
    if (!content) return null;
    const hasHTML = /<[a-z][\s\S]*>/i.test(content);
    
    if (hasHTML) {
      return (
        <div 
          className={className}
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      );
    }
    
    return (
      <div className={className + " whitespace-pre-wrap"}>
        {highlightText(content)}
      </div>
    );
  };

  return (
    <>
      <SEOHead
        title={city.metaTitle}
        description={city.metaDescription}
        canonical={`/${city.slug}`}
        schema={schema}
      />

      <div className="bg-background pt-8">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: `${selectedService.serviceName} in ${city.cityName}` }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-3/5">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider border border-primary/20">
                <CheckCircle2 className="h-4 w-4" /> Trusted by 1000+ Happy Customers
              </span>
              <h1 className="section-title text-left mb-6 leading-tight">
                Premium <span className="text-primary">{selectedService.serviceName}</span> in {city.cityName}
              </h1>
              {renderContent(city.heroContent, "text-muted-foreground text-lg mb-8 max-w-xl leading-relaxed")}
              
              <div className="flex flex-wrap gap-4 mb-10">
                <a href={`tel:${PHONE_NUMBER}`} className="btn-premium">
                  <Phone className="h-5 w-5" /> Call Now
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="btn-premium bg-green-600 hover:bg-green-700 shadow-green-600/20 text-white border-0">
                  <MessageSquare className="h-5 w-5" /> WhatsApp Us
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border">
                {[
                  { icon: ShieldCheck, label: "Certified Expert Technicians" },
                  { icon: Award, label: "10+ Years Experience" },
                  { icon: Clock, label: "Fast 60-Mins Response" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-2/5 w-full">
              <div className="premium-card p-0 overflow-hidden relative border border-primary/10 shadow-2xl shadow-primary/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <div className="p-8 pb-4 bg-accent/5">
                  <h3 className="font-display text-xl font-bold mb-2">We are Just 30 Minutes Away From You</h3>
                  <p className="text-sm text-muted-foreground">Book your service instantly. No advance payment.</p>
                </div>
                <div className="p-8 pt-6">
                  <LeadForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      <section className="py-20 bg-accent/5 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="section-title">What service do you need in {city.cityName}?</h2>
            <p className="section-subtitle">Transparent pricing, genuine parts, and reliable service guarantees.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {servicePricingData.map((plan, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{plan.title}</h3>
                <div className="flex items-center gap-1 text-yellow-500 mt-2 font-medium text-xs bg-yellow-500/10 w-fit px-2 py-1 rounded-md">
                  <Star className="h-3.5 w-3.5 fill-current" /> {plan.rating}
                </div>
                <div className="text-3xl font-black text-foreground mt-6 mb-6">{plan.price}</div>
                <div className="h-px w-full bg-border mb-6"></div>
                <ul className="space-y-4 flex-grow mb-8 text-sm">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
                <a href={`tel:${PHONE_NUMBER}`} className="w-full btn-premium py-3 justify-center rounded-xl bg-accent hover:bg-accent/90 mt-auto text-sm">
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Common Issues */}
      <section className="py-20 bg-background border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="mb-16 relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-border group">
            <img 
               src={getProcessImage(selectedService.slug)} 
               alt={`${selectedService.serviceName} Repair Service Process`} 
               className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex items-center p-10">
              <div className="max-w-md">
                <span className="px-4 py-2 bg-primary/20 text-primary font-bold rounded-full text-sm mb-4 inline-block">100% Guaranteed Repair</span>
                <h3 className="text-3xl font-display font-black text-foreground leading-tight">We strictly follow a certified 5-step repair protocol.</h3>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* The Process */}
            <div>
              <h2 className="section-title text-left mb-10">Our Service Process</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:ml-[23px] before:w-0.5 before:bg-border before:h-full">
                {serviceProcess.map((step, i) => (
                  <div key={i} className="relative flex items-start">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border-4 border-background bg-primary/20 text-primary flex items-center justify-center font-bold text-sm z-10 shrink-0 shadow-sm relative">
                      <div className="absolute inset-2 bg-primary rounded-full"></div>
                      <span className="relative z-20 text-white">{i + 1}</span>
                    </div>
                    <div className="ml-6 pt-1">
                      <h4 className="text-lg font-bold text-foreground mb-1">{step.title}</h4>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Issues */}
            <div>
              <h2 className="section-title text-left mb-10">Common {selectedService.serviceName} Issues We Fix</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {serviceCommonIssues.map((issue, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-accent/5 hover:border-primary/30 hover:bg-primary/5 transition-colors flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold leading-tight">{issue}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Long Form Story / Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-foreground text-center md:text-left">
            Complete {selectedService.serviceName} in {city.cityName}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="prose prose-slate max-w-none">
              {renderContent(city.uniqueContent, "text-muted-foreground text-lg leading-relaxed")}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl translate-x-3 translate-y-3 blur-sm"></div>
              <img 
                src={getServiceImage(selectedService.slug)} 
                alt={`Professional ${selectedService.serviceName} Technician in ${city.cityName}`} 
                className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-xl border border-primary/10" 
              />
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-8 md:p-10 border border-primary/10 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Wind className="w-[300px] h-[300px]" />
            </div>
            
            <div className="md:w-1/3 shrink-0 relative z-10">
              <img 
                src={getScenarioImage(selectedService.slug)} 
                alt={`${selectedService.serviceName} Maintenance Toolkit and Service scenario in ${city.cityName}`} 
                className="w-full h-[250px] object-cover rounded-2xl shadow-lg border border-border" 
              />
            </div>
            
            <div className="relative z-10 md:w-2/3">
              <h3 className="font-display text-2xl font-bold mb-4">Real Scenario: {selectedService.serviceName} in {nearbyAreas[0] || "Your Area"}, {city.cityName}</h3>
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                {selectedScenario}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 p-5 bg-background rounded-2xl shadow-sm border border-border items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-1">Need fast {selectedService.serviceName} in {city.cityName}?</h4>
                  <p className="text-sm text-muted-foreground max-w-sm">Our skilled technicians service all major brands. Restoring your appliance to peak performance.</p>
                </div>
                <a href={`tel:${PHONE_NUMBER}`} className="btn-premium whitespace-nowrap shrink-0 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  <Phone className="h-5 w-5" /> Call: {PHONE_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Serviced SEO Grid */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="section-title">All Major {selectedService.serviceName.replace(' Repair', '').replace(' Service', '')} Brands We {serviceKey.includes('install') ? 'Install' : 'Service'} in {city.cityName}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">We provide expert repair, genuine parts, and specialized maintenance solutions for all major {selectedService.serviceName.toLowerCase()} brands operating in and around {city.cityName}.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {selectedService.brands.map((brand, i) => (
              <Link 
                key={i} 
                to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}-service`}
                onClick={() => window.scrollTo(0,0)}
                className="bg-accent/5 border border-primary/10 rounded-xl p-4 text-center hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer shadow-sm hover:shadow-md block group"
              >
                <span className="font-bold text-foreground block mb-1.5 group-hover:text-primary transition-colors">{brand}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium block">{brand} {selectedService.serviceName} {city.cityName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Appliance SEO Keyword Cloud */}
      <section className="py-16 bg-background/50 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-display text-lg font-bold mb-6 text-foreground/60 text-center md:text-left">
            {serviceKey === "led-tv-repair" ? `Top TV Repair near me in ${city.cityName}` : `Popular Appliance Service Searches in ${city.cityName}`}
          </h2>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {[
              // Dynamic Keywords based on current service
              ...[
                `${city.cityName} ${selectedService.serviceName.toLowerCase()}`,
                `Best ${selectedService.serviceName.toLowerCase()} ${city.cityName}`,
                `Top ${selectedService.serviceName.toLowerCase()} ${city.cityName}`,
                `${selectedService.serviceName.toLowerCase()} repair near me in ${city.cityName}`,
                `${selectedService.serviceName.toLowerCase()} service center near me`,
                `urgent ${selectedService.serviceName.toLowerCase()} ${city.cityName}`,
                `doorstep ${selectedService.serviceName.toLowerCase()} repair ${city.cityName}`,
                ...nearbyAreas.slice(0, 8).flatMap(area => [`${area} ${selectedService.serviceName.toLowerCase()}`, `${selectedService.serviceName.toLowerCase()} near ${area}`])
              ],
              
              // Add a bit of context for other services too, but focus on current
              ...(serviceKey === "ac-service" ? [
                `Voltas AC service ${city.cityName}`, `Daikin AC repair ${city.cityName}`, `split AC service ${city.cityName}`, `AC gas filling ${city.cityName}`
              ] : []),
              ...(serviceKey === "led-tv-repair" ? [
                `Samsung TV repair ${city.cityName}`, `LG Smart TV service ${city.cityName}`, `TV backlight replacement near me`, `TV wall mounting ${city.cityName}`, `LED TV panel repair ${city.cityName}`, `Smart TV software update ${city.cityName}`, `TV motherboard repair ${city.cityName}`
              ] : []),
              // Only add others if NOT TV
              ...((serviceKey !== "led-tv-repair" && serviceKey === "washing-machine-repair") ? [
                `washing machine service near me`, `LG washer repair ${city.cityName}`, `front load machine fix ${city.cityName}`
              ] : []),
              ...((serviceKey !== "led-tv-repair" && serviceKey === "water-purifier-service") ? [
                `Kent RO service ${city.cityName}`, `Aquaguard repair ${city.cityName}`, `RO filter change ${city.cityName}`
              ] : [])
            ].map((keyword, index) => (
              <span key={index} className="text-[11px] sm:text-xs font-semibold text-foreground/90 hover:text-primary hover:bg-primary/10 transition-all cursor-default border border-border/80 hover:border-primary/50 shadow-sm rounded-md px-3 py-1.5 bg-background underline decoration-primary/40 underline-offset-4">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas (Localized SEO footprint) */}
      <section className="py-16 bg-accent/5 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="font-display text-3xl font-bold mb-4 text-foreground">Top-Rated Appliance Service Locations in {city.cityName}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We actively provide same-day ${sNameLower} and home appliance repair services across <strong className="text-foreground font-semibold">all major areas of {city.cityName}</strong>. Whether you are in <strong>{nearbyAreas[0]}</strong>, <strong>{nearbyAreas[1] || `${city.cityName} limits`}</strong>, or the wider {city.cityName} region, our rapid response team guarantees a 60-minute arrival with expert solutions.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyAreas.map((area, i) => {
              const sPrefix = serviceKey === "led-tv-repair" ? "tv-repair" : 
                             serviceKey === "ac-service" ? "ac-service" :
                             serviceKey === "fridge-repair" ? "fridge-repair" :
                             serviceKey === "washing-machine-repair" ? "washing-machine-repair" : "service";
              
              const areaSlug = `${sPrefix}-in-${area.toLowerCase().replace(/\s+/g, '-')}`;
              const label = serviceKey === "led-tv-repair" ? `TV Repair near ${area}` : 
                           `${selectedService.serviceName.replace(' Repair', '').replace(' Service', '')} Service in ${area}`;
              
              return (
                <Link to={`/${areaSlug}`} key={i} className="inline-flex px-4 py-2 bg-background border border-border rounded-xl text-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm">
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Local Area Success Stories Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="section-title">Recent Appliance Repairs in {city.cityName} & Nearby Areas</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">See how our certified technicians deliver high-quality ${sNameLower} and appliance repair solutions daily across {city.cityName}, {nearbyAreas[0]}, and surrounding localities.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, i) => (
              <div key={i} className="p-8 rounded-3xl bg-accent/5 border border-primary/10 hover:border-primary/40 transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -translate-y-4 translate-x-4 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-10 bg-green-500/20 text-green-600 rounded-full flex items-center justify-center">
                     <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-foreground text-lg">{story.service}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm mb-8 relative z-10">"{story.text}"</p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-background px-4 py-2 border border-primary/20 rounded-lg relative z-10 shadow-sm">
                  <MapPin className="w-4 h-4" /> Serviced in {story.area}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive All Services SEO Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="section-title">Other Professional Services in {city.cityName}</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Along with {selectedService.serviceName}, we also provide top-rated repair and maintenance for other home appliances with the same quality assurance.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.filter(s => s.slug !== serviceKey).map((service, i) => {
              const cityBase = city.slug.replace(/.*-in-/, '') || city.slug;
              const targetSlug = service.slug === "ac-service" ? `ac-service-in-${cityBase}` : `${service.slug}-in-${cityBase}`;
              return (
                <div key={i} className="group p-8 rounded-3xl bg-accent/5 border border-primary/10 hover:border-primary/40 hover:bg-background transition-all shadow-sm hover:shadow-md">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.serviceName}</h3>
                  <p className="text-sm text-muted-foreground mb-6">Expert {service.serviceName.toLowerCase()} solutions at your doorstep in {city.cityName} with 100% genuine parts.</p>
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/${targetSlug}`} 
                      onClick={() => window.scrollTo(0,0)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:underline underline-offset-4"
                    >
                      Service Details <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Map visualization */}
      <section className="py-0 bg-background">
        <div className="w-full h-[400px]">
          <iframe
            title={`Map of ${city.cityName}`}
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-2">Have questions about your {selectedService.serviceName}? We&apos;ve answered the most common ones.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {serviceFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl px-2">
                <AccordionTrigger className="text-left font-bold text-foreground py-4 px-2 hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed px-2 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Also Available in */}
      <section className="py-16 bg-accent/5 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-xl font-bold mb-8 text-center">Also available in</h2>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {citiesData.slice(0, 30).map((c, i) => {
               const cityBase = c.slug.replace(/^ac-service-in-/i, '');
               const targetSlug = serviceKey === "ac-service" ? c.slug : `${serviceKey}-in-${cityBase}`;
               return (
                <Link to={`/${targetSlug}`} key={i} className="text-muted-foreground hover:text-primary text-sm whitespace-nowrap transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 block"></span>
                  {selectedService.serviceName} in {c.cityName}
                </Link>
              );
            })}
            {citiesData.length > 30 && (
              <span className="text-muted-foreground text-sm whitespace-nowrap flex items-center gap-1.5 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 block"></span>
                and more districts...
              </span>
            )}
          </div>
        </div>
      </section>

      <CTASection title={`Need immediate assistance in ${city.cityName}?`} subtitle="Our expert technicians are on standby to restore your comfort." />
    </>
  );
};

export default CityPage;
