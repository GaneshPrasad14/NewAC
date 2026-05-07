import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import { HeadphonesIcon, MapPin, PhoneCall, Clock } from "lucide-react";
import { PHONE_NUMBER, BUSINESS_NAME } from "@/lib/constants";

const CustomerCarePage = () => {
  return (
    <>
      <SEOHead title={`24/7 AC & Appliance Customer Care | ${BUSINESS_NAME}`} description="Contact our dedicated 24/7 appliance customer care center. Fast response times, instant booking, and priority technician dispatch across South India." />
      <div className="bg-background pt-8 pb-4">
         <div className="container mx-auto px-4 max-w-4xl"><Breadcrumb items={[{ label: "Customer Care" }]} /></div>
      </div>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl font-black mb-6">Always Here When You Need Us.</h1>
            <p className="text-lg text-muted-foreground">Our centralized customer care team operates around the clock to ensure any appliance emergency is met with rapid response and expert dispatch.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 text-center">
               <HeadphonesIcon className="h-16 w-16 text-primary mx-auto mb-6" />
               <h3 className="text-xl font-bold mb-2">Direct Hotline</h3>
               <p className="text-muted-foreground mb-6">Call our experts directly for instant troubleshooting and booking.</p>
               <a href={`tel:${PHONE_NUMBER}`} className="text-2xl font-black text-primary hover:underline">{PHONE_NUMBER}</a>
            </div>
            <div className="p-8 rounded-3xl bg-accent/5 border border-border text-center">
               <Clock className="h-16 w-16 text-accent mx-auto mb-6" />
               <h3 className="text-xl font-bold mb-2">Service Hours</h3>
               <p className="text-muted-foreground mb-6">Technician Field Hours: 8:00 AM - 8:00 PM (Mon-Sun)<br/>Support Helpline: 24/7 Available.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CustomerCarePage;
