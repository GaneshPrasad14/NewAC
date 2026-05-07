import { Phone, Mail, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/Breadcrumb";
import LeadForm from "@/components/LeadForm";
import { PHONE_NUMBER, BUSINESS_EMAIL, BUSINESS_ADDRESS, BUSINESS_NAME } from "@/lib/constants";

const ContactPage = () => (
  <>
    <SEOHead
      title={`Contact ${BUSINESS_NAME} | Get in Touch`}
      description={`Contact ${BUSINESS_NAME} for appliance service, repair, and installation. Fill out our form for a quick response.`}
      canonical="/contact"
      schema={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: BUSINESS_NAME,
      }}
    />

    <div className="container mx-auto px-4">
      <Breadcrumb items={[{ label: "Contact Us" }]} />
    </div>

    <section className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Contact Us</h1>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">Have a question or need service? Fill the form below and we'll get back to you within 30 minutes.</p>
            <div className="space-y-4">
              {PHONE_NUMBER && (
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-3 card-service">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Phone</div>
                    <div className="text-sm text-muted-foreground">{PHONE_NUMBER}</div>
                  </div>
                </a>
              )}
              {BUSINESS_EMAIL && (
                <a href={`mailto:${BUSINESS_EMAIL}`} className="flex items-center gap-3 card-service">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">{BUSINESS_EMAIL}</div>
                  </div>
                </a>
              )}
              {BUSINESS_ADDRESS && (
                <div className="flex items-start gap-3 card-service">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">Address</div>
                    <div className="text-sm text-muted-foreground">{BUSINESS_ADDRESS}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  </>
);

export default ContactPage;
