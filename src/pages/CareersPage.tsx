import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";

const CareersPage = () => {
  return (
    <>
      <SEOHead title="Careers at SwiftCare™ Services | Join Our Technical Team" description="We are constantly expanding! Join the fastest-growing network of certified appliance technicians across Tamil Nadu with SwiftCare™." />
      <div className="bg-background pt-8 pb-4">
          <div className="container mx-auto px-4"><Breadcrumb items={[{ label: "Careers" }]} /></div>
      </div>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="font-display text-4xl font-black mb-8">Join the SwiftCare™ Team</h1>
          <div className="prose prose-lg text-muted-foreground">
            <p>We are the fastest-growing network of highly skilled, certified AC and home appliance repair mechanics in South India. If you have extreme dedication, verified technical skills, and a passion for flawless customer service, we want you on our field response team.</p>
            
            <h3 className="font-bold text-foreground text-2xl mt-10 mb-4">Current Openings</h3>
            <div className="space-y-6">
               <div className="p-6 border border-border rounded-2xl bg-accent/5">
                 <h4 className="font-bold text-xl mb-2 text-foreground">Senior AC Technician</h4>
                 <p className="mb-4">Minimum 5 years experience in Split/Inverter AC installations and complex compressor replacements.</p>
                 <span className="bg-primary/10 text-primary py-1 px-3 rounded text-sm font-semibold">Immediate Hiring</span>
               </div>
               <div className="p-6 border border-border rounded-2xl bg-accent/5">
                 <h4 className="font-bold text-xl mb-2 text-foreground">Multi-Brand Washing Machine Mechanic</h4>
                 <p className="mb-4">Specialized in front-load and top-load fully automatic PCB diagnostics and drum repairs.</p>
                 <span className="bg-primary/10 text-primary py-1 px-3 rounded text-sm font-semibold">Open Roles: 3</span>
               </div>
            </div>
            <p className="mt-10">Send your resume and experience details directly to our corporate email via the Contact page.</p>
          </div>
        </div>
      </section>
    </>
  );
}
export default CareersPage;
