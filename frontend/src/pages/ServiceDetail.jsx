import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dentalServices } from "../data/services";
import { serviceContent } from "../data/serviceContent";
import ServiceHero from "../components/service/ServiceHero";
import OverviewSection from "../components/service/OverviewSection";
import WhoNeedsSection from "../components/service/WhoNeedsSection";
import TreatmentTypes from "../components/service/TreatmentTypes";
import TreatmentProcedure from "../components/service/TreatmentProcedure";
import BenefitsSection from "../components/service/BenefitsSection";
import WhyChooseSection from "../components/service/WhyChooseSection";
import FAQSection from "../components/service/FAQSection";
import ServiceSidebar from "../components/service/ServiceSidebar";
import CTASection from "../components/service/CTASection";
import RelatedServices from "../components/service/RelatedServices";

const ServiceDetail = () => {
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const service = dentalServices.find((s) => s.slug === slug);
  const content = serviceContent[slug];

  if (!service || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
        <p className="mt-2 text-slate-600">The service you are looking for does not exist.</p>
        <Link to="/services" className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 transition">
          View All Services
        </Link>
      </div>
    );
  }

  const handleBookAppointment = (e) => {
    e.preventDefault();
    window.open("https://wa.me/918171779011?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment.", "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 lg:pt-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-blue-600">Services</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{service.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-12">
            
            <ServiceHero
              title={service.title}
              description={content.hero.description}
              image={service.image}
              highlights={content.hero.highlights}
              stats={content.hero.stats}
            />

            <OverviewSection
              title={`What is a ${service.title}?`}
              description={content.overview.description}
              image={content.overview.image || service.image}
            />

            <WhoNeedsSection
              title={`Who Needs ${service.title}s?`}
              items={content.whoNeeds}
            />

            <TreatmentTypes
              title={`Types of ${service.title}s`}
              types={content.types}
            />

            <TreatmentProcedure
              title="Treatment Procedure"
              steps={content.procedure}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitsSection
                title="Benefits of Treatment"
                benefits={content.benefits}
              />
              <WhyChooseSection
                title="Why Choose City Smile?"
                items={content.whyChoose}
              />
            </div>

            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950 mb-6 text-center">Before & After Results</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-2">
                    <div className="aspect-[2/1] bg-slate-200 rounded-lg overflow-hidden">
                      <img src={service.image} alt="Clinical transformation preview" className="w-full h-full object-cover contrast-125" />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-2 px-1">
                      <span>BEFORE</span>
                      <span>AFTER</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <FAQSection
              title="Frequently Asked Questions"
              faqs={content.faqs}
            />

            <CTASection
              title={content.cta.title}
              description={content.cta.description}
              onBookAppointment={handleBookAppointment}
            />

          </div>

          <ServiceSidebar
            services={dentalServices}
            currentSlug={slug}
            onBookAppointment={handleBookAppointment}
          />

        </div>

        <RelatedServices
          currentSlug={slug}
          services={dentalServices}
        />

      </div>
    </div>
  );
};

export default ServiceDetail;