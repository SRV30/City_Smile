import { useState, useEffect } from "react";
import aboutMe from "../assets/aboutMe.jpeg";

const faqs = [
  {
    question:
      "What is the recommended frequency for routine dental examinations?",
    answer:
      "To maintain optimal oral health and ensure early detection of underlying issues, we advise a comprehensive dental checkup and professional cleaning every six months. Regular preventative care is key to avoiding complex treatments later.",
  },
  {
    question: "Are modern dental procedures painful?",
    answer:
      "Patient comfort is our absolute priority. Utilizing advanced clinical techniques, state-of-the-art diagnostic equipment, and highly effective local anesthesia, we ensure that treatments—including complex root canals and extractions—are virtually painless and anxiety-free.",
  },
  {
    question: "How expensive are specialized dental treatments at the clinic?",
    answer:
      "We are firmly committed to making high-quality, evidence-based dentistry accessible to everyone. Our clinic maintains a policy of absolute pricing transparency. We offer highly competitive rates, and a detailed cost breakdown is always provided and discussed before any clinical procedure begins.",
  },
  {
    question: "What protocol should be followed during a dental emergency?",
    answer:
      "In the event of acute oral pain, facial swelling, or a fractured tooth, immediate intervention is critical. Please contact our emergency response desk directly or message our clinical team via WhatsApp for priority triage and swift support.",
  },
];

const expertise = [
  {
    title: "Advanced Implantology",
    description:
      "Seamless placement of long-lasting dental implants to naturally restore missing teeth and bite function.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Painless Root Canal Specialist (RCT)",
    description:
      "Renowned in Motihari for comfortable, precise root canal procedures at highly genuine prices.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    title: "Smile Designing & Orthodontics",
    description:
      "Modern teeth alignment using traditional braces and advanced clear aligners, alongside cosmetic teeth whitening.",
    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Surgical Extractions",
    description:
      "Highly precise and comfortable wisdom tooth extractions designed to eliminate patient anxiety.",
    icon: "M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 011.789 1.106l1.5 3M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Comprehensive Oral Rehabilitation",
    description:
      "Full-mouth treatments, crown-and-bridge work, and pediatric (child) dental care.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

const AboutMe = () => {
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <div className="group relative w-full overflow-hidden rounded-3xl bg-slate-200 shadow-2xl transition-all duration-500 hover:shadow-blue-900/20">
              <div className="aspect-[4/5] w-full lg:aspect-[3/4] xl:aspect-[4/5]">
                <img
                  src={aboutMe}
                  alt="Dr. Aditya Shivi"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 sm:p-10">
                  <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-blue-300">
                    Chief Oral & Dental Surgeon
                  </p>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Dr. Aditya Shivi
                  </h2>
                  <p className="mt-2 text-lg font-medium text-slate-200">
                    B.D.S., MIDA Delhi, Implantologist
                  </p>
                </div>
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10"></div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Meet Dr. Aditya Shivi
            </h1>
            <div className="mt-6 h-1.5 w-20 rounded-full bg-blue-600"></div>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                Dr. Aditya Shivi is a premier Oral & Dental Surgeon,
                Implantologist, and Root Canal Specialist practicing at City
                Smile Dental & Implant Clinic in Motihari. Driven by a
                commitment to clinical excellence, he combines high-end modern
                dentistry with an empathetic approach to deliver painless,
                reliable dental treatments.
              </p>
              <p>
                He earned his professional degree from Kalka Dental College and
                is a recognized member of the prestigious Indian Dental
                Association (MIDA), Delhi chapter. Before bringing world-class
                dental infrastructure to Motihari, he built a stellar reputation
                across major healthcare hubs, serving as an expert Oral & Dental
                Surgeon at KDC Hospital in Delhi and later at KDC PSDC in Patna.
              </p>
              <p>
                His diverse clinical experience in major metropolitan hospitals
                ensures that patients receive the highest standard of
                sterilized, evidence-based care.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="https://wa.me/918171779011?text=Hello%20Dr.%20Aditya,%20I%20would%20like%20to%20ask%20a%20question%20and%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-emerald-600/40 active:scale-95 sm:text-base"
              >
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-20 transition-all duration-1000 ease-out group-hover:-translate-x-48"></span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ask on WhatsApp
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
        </div>

        <div className="mb-24 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-12 lg:p-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-950">
              Philosophy of Care
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-blue-600"></div>
            <p className="mt-8 text-lg leading-relaxed text-slate-600">
              Dr. Aditya Shivi’s practice is built on the foundation of
              transparency, absolute hygiene, and honest counseling. He ensures
              every diagnostic protocol is fully backed by digital X-rays,
              taking the time to explain treatment steps clearly before
              beginning any procedure.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Residents from Nandpur, Devraha Baba Chowk, and all over Motihari
              trust Dr. Shivi because he brings Delhi and Patna-grade clinical
              expertise right to their hometown, operating with total
              transparency and gentle handling.
            </p>
          </div>
        </div>

        <div className="mb-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Core Areas of Clinical Expertise
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Advanced clinical training and years of hands-on experience across
              multiple dental specialities.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10 hover:ring-blue-100"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-24 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Professional Credentials
            </h2>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-blue-600"></div>
            <p className="mt-6 mb-8 text-lg text-slate-600">
              Officially registered and certified by dental medical councils,
              ensuring adherence to the highest standards of clinical practice
              and patient safety.
            </p>
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
              <img
                src="https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719139988/1_4_dohcai.jpg"
                alt="Certificate of Registration"
                className="w-full rounded-xl object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-2xl sm:p-12">
              <h3 className="mb-8 text-2xl font-extrabold">
                Connect with Dr. Aditya Shivi
              </h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-blue-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Clinic Location
                    </h4>
                    <p className="mt-2 text-blue-200 leading-relaxed">
                      In front of Hanuman Mandir, Devraha Baba Chowk, NH-28,
                      Nandpur, Motihari, Bihar 845402
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-blue-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Emergency Helpline
                    </h4>
                    <p className="mt-2 text-xl font-bold text-blue-300">
                      +91 8171779011
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Essential Insights for Your Optimal Oral Health
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none sm:p-8"
                >
                  <span className="text-lg font-bold text-slate-950">
                    {faq.question}
                  </span>
                  <svg
                    className={`ml-4 h-6 w-6 shrink-0 text-blue-600 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed sm:px-8 sm:pb-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
