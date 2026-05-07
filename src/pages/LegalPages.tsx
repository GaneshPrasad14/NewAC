import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";

const LegalPages = ({ type }: { type: 'terms' | 'privacy' }) => {
  const isTerms = type === 'terms';
  const title = isTerms ? "Terms & Conditions" : "Privacy Policy";
  
  return (
    <>
      <SEOHead title={`${title} | SwiftCare™ Services`} description={`Read the official ${title} for booking and utilizing SwiftCare™ premium appliance support services.`} />
      <div className="bg-background pt-8 pb-4">
         <div className="container mx-auto px-4 max-w-4xl"><Breadcrumb items={[{ label: title }]} /></div>
      </div>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl font-black mb-8">{title}</h1>
          <div className="prose prose-sm md:prose-base text-muted-foreground max-w-none">
            {isTerms ? (
               <>
                 <p className="font-semibold text-foreground mb-6">Last Updated: January 2024</p>
                 <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Service Agreements</h3>
                 <p className="mb-4">By booking a service via our portal, you agree to the inspection charges formulated during the booking phase. If an extensive repair is required, a comprehensive quote will be given prior to execution.</p>
                 <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Warranty & Guarantees</h3>
                 <p className="mb-4">We offer a 30-Day service warranty on labor and up to a 6-Month warranty on completely fresh spare part replacements. The warranty stands void if the appliance is opened or serviced by a third-party non-certified mechanic post our repair.</p>
                 <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Booking Cancellations</h3>
                 <p className="mb-4">Cancellations must be done at least 2 hours prior to the scheduled visit. Booking delays due to uncontrollable environmental elements (heavy rain, traffic) will be communicated proactively.</p>
               </>
            ) : (
               <>
                 <p className="font-semibold text-foreground mb-6">Last Updated: January 2024</p>
                 <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Data Collection</h3>
                 <p className="mb-4">We collect primitive navigational data and contact information (Phone Number, Address, Name) explicitly submitted by you solely for the execution of home service dispatched routing.</p>
                 <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Data Security & Usage</h3>
                 <p className="mb-4">Your phone numbers and location drops are highly secured and strictly transmitted only to the assigned certified field technician. We do not sell data to any marketing/telecalling agencies.</p>
                 <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Cookie Policy</h3>
                 <p className="mb-4">Our portal uses basic session cookies to track analytical usage to improve server response times and user interface layouts purely for an enhanced browsing experience.</p>
               </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default LegalPages;
