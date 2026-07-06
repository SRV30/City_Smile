import { Link } from 'react-router-dom';
import { iconMap } from './iconMap';

const ServicesSection = ({ services = [] }) => {
  if (!services.length) return null;

  return (
    <section id="services" className="scroll-mt-28 bg-blue-50/70 py-12 lg:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">Our Services</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Comprehensive Dental Solutions</h2>
          </div>
          <a href="#services" className="hidden rounded-lg border border-blue-600 px-6 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-600 hover:text-white sm:inline-flex">
            View All Services
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="group rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-3xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                {iconMap[service.icon] || service.icon}
              </div>
              <h3 className="mt-6 text-lg font-extrabold text-slate-950">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
            </Link>
          ))}
        </div>

        <a href="#services" className="mt-6 flex w-full justify-center rounded-lg bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/10 sm:hidden">
          View All Services
        </a>
      </div>
    </section>
  );
};

export default ServicesSection;
