import { useMemo } from "react";
import { Link } from "react-router-dom";
import { dentalServices } from "../data/services";

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
