import { useMemo } from "react";
import { Link } from "react-router-dom";

export const dentalServices = [
  {
    title: "Dental X-ray",
    slug: "dental-x-ray",
    description:
      "Precise diagnostic imaging to detect hidden dental conditions and assess overall bone health.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719141989/dental_xrays_meoqup.jpg",
  },
  {
    title: "Root Canal Treatment",
    slug: "root-canal-treatment",
    description:
      "Relieve severe tooth pain and save infected teeth with advanced, comfortable endodontic care.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142016/images_llr978.jpg",
  },
  {
    title: "Teeth Coloured Filling",
    slug: "teeth-coloured-filling",
    description:
      "Restore decayed teeth using durable, aesthetically pleasing materials that match your natural enamel.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719141982/5_l86gfw.jpg",
  },
  {
    title: "Complete & Partial Denture",
    slug: "complete-partial-denture",
    description:
      "Regain your smile and chewing ability with custom-fitted removable prosthetics.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719141822/cp2_aicqrt.jpg",
  },
  {
    title: "Crown & Bridges",
    slug: "crown-bridges",
    description:
      "Durable fixed restorations designed to protect damaged teeth and seamlessly replace missing ones.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142009/images_1_z4izy7.jpg",
  },
  {
    title: "Tooth Extraction",
    slug: "tooth-extraction",
    description:
      "Safe, effective, and painless removal of problematic, severely decayed, or damaged teeth.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142009/images_2_fj8bwo.jpg",
  },
  {
    title: "Dental Implant",
    slug: "dental-implant",
    description:
      "Permanent, natural-looking replacements for missing teeth that function just like your real teeth.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142010/images_3_ddxkrr.jpg",
  },
  {
    title: "Ultrasonic Scaling",
    slug: "ultrasonic-scaling",
    description:
      "Professional deep cleaning to efficiently remove stubborn plaque and tartar buildup.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142019/Ultrasonic-Scaling-in-Shillong-pgx2aikkntqt1k2r974r2qwhriq3vrv3q0vmhe2w6o_goykpb.webp",
  },
  {
    title: "Impaction",
    slug: "impaction",
    description:
      "Specialized surgical removal of partially erupted or stuck wisdom teeth to prevent future complications.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142011/images_4_b44iqp.jpg",
  },
  {
    title: "Orthodontic Treatment",
    slug: "orthodontic-treatment",
    description:
      "Straighten misaligned teeth and correct bite issues to achieve a perfectly aligned smile.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719141984/7b1ee9d53527319fb0fbb15ae6fe0076767c0e22_wow5lx.webp",
  },
  {
    title: "Tooth Problems of Children",
    slug: "pediatric-dentistry",
    description:
      "Gentle, specialized pediatric dental care tailored specifically for growing smiles.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142012/images_5_jdwnoe.jpg",
  },
  {
    title: "Smile Designing",
    slug: "smile-designing",
    description:
      "Custom cosmetic treatments combining multiple procedures to completely transform and enhance your smile.",
    image:
      "https://res.cloudinary.com/dbnmsrlm7/image/upload/v1719142016/images_6_t2adup.jpg",
  },
];

const ServicesSection = () => {
  const displayServices = useMemo(() => {
    const shuffled = [...dentalServices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 8);
  }, []);

  return (
    <section
      id="services"
      className="scroll-mt-28 bg-blue-50/70 py-12 lg:py-16"
    >
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">
              Our Services
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Comprehensive Dental Solutions
            </h2>
          </div>
          <Link
            to="/services"
            className="hidden rounded-lg border border-blue-600 px-6 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white sm:inline-flex"
          >
            View All Services
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayServices.map((service, index) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className={`group flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 ${
                index >= 4 ? "hidden sm:flex" : "flex"
              }`}
            >
              <div className="aspect-4/3 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-extrabold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/services"
          className="mt-8 flex w-full justify-center rounded-lg bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/10 transition hover:bg-blue-700 sm:hidden"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
