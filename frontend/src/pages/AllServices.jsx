import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dentalServices } from "../data/services";
import servicesImg from "../assets/services.jpeg";

const AllServices = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      window.open(
        "https://wa.me/918171779011?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment.",
        "_blank",
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 lg:pt-40 lg:pb-24">
      {showMessage && (
        <div className="fixed top-24 left-1/2 z-50 flex -translate-x-1/2 transform items-center gap-3 rounded-xl bg-emerald-500 px-6 py-4 text-white shadow-2xl transition-all duration-500 sm:top-32">
          <svg
            className="h-6 w-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="whitespace-nowrap text-sm font-bold sm:text-base">
            Redirecting to WhatsApp for your booking...
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="transform transition-all duration-700 ease-out lg:w-1/2">
            <p className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-extrabold uppercase tracking-widest text-blue-700 shadow-sm">
              Complete Care
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-5xl xl:text-6xl">
              Complete Dental Services in Motihari for Children, Adults and
              Seniors
            </h1>

            <p className="mt-8 text-xl font-semibold leading-relaxed text-slate-800">
              Comprehensive dental services in Motihari at City Smile Dental &
              Implant Clinic. Led by qualified dentists and equipped with
              digital technology, we deliver reliable and evidence-based dental
              care for patients from Nandpur, Devraha Baba Chowk, and
              neighboring areas across Motihari.
            </p>

            <p className="mt-6 text-base leading-loose text-slate-600">
              City Smile Dental & Implant Clinic offers a complete range of
              dental services in Motihari for children, adults and seniors.
              Whether you are dealing with sudden tooth pain, planning
              orthodontic treatment, looking for long-term smile enhancement or
              simply need routine dental care, our team ensures a personalised
              approach for every patient. From advanced root canal treatment
              (RCT) and dental implants to braces, clear aligners, pediatric
              dentistry, cosmetic smile makeovers, gum treatment, full-mouth
              rehabilitation and comfortable wisdom tooth extraction, every
              service is delivered with attention to detail and modern clinical
              precision.
            </p>

            <p className="mt-6 text-base leading-loose text-slate-600">
              We follow thorough diagnostic protocols, use digital X-rays and
              maintain strict sterilization standards to give you a safe and
              predictable treatment experience. We also understand that dental
              visits often bring anxiety for many people, which is why we focus
              equally on comfort, communication and care. Our atmosphere is warm
              and reassuring, our team is patient and friendly, and all
              procedures are explained clearly before beginning. Residents of
              Nandpur, Devraha Baba Chowk, and nearby areas across Motihari
              trust us because we combine experience with empathy, technology
              with transparency and expertise with gentle handling. Whether you
              are visiting us for the first time or returning for follow-up
              care, our goal is to ensure you feel heard, supported and
              confident about your oral health. At City Smile Dental & Implant
              Clinic, your comfort and long-term dental wellness come before
              everything else.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#book"
                onClick={handleBookAppointment}
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 sm:text-base"
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"></span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book Appointment
              </a>

              <a
                href="tel:+918171779011"
                className="group flex items-center gap-3 rounded-xl border-2 border-blue-600 bg-transparent px-8 py-4 text-sm font-bold text-blue-600 transition-all duration-300 hover:bg-blue-50 active:scale-95 sm:text-base"
              >
                <svg
                  className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now
              </a>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="group relative w-full overflow-hidden rounded-3xl bg-slate-200 shadow-2xl transition-all duration-500 hover:shadow-blue-900/20">
              <div className="aspect-4/3 w-full lg:aspect-square xl:aspect-4/3">
                <img
                  src={servicesImg}
                  alt="City Smile Dental & Implant Clinic"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="mb-12 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Explore Our Services
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-blue-600"></div>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">
              Discover the full range of modern treatments we provide to keep
              your smile healthy, bright, and confident.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
            {dentalServices.map((service, index) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10 hover:ring-blue-100"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 transition-colors duration-300 group-hover:bg-blue-900/10"></div>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="text-xl font-extrabold text-slate-950 transition-colors duration-300 group-hover:text-blue-700">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600">
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
