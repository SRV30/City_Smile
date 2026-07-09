import { Link } from "react-router-dom";

const RelatedServices = ({ currentSlug, services }) => {
  const relatedServices = services
    .filter((service) => service.slug !== currentSlug)
    .slice(0, 4);

  return (
    <section className="mt-16">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedServices.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full"
          >
            <div className="aspect-4/3 overflow-hidden bg-slate-100 relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col grow">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 grow">
                {service.description ||
                  "Professional clinical dental care tailored to restore your perfect oral configurations and optimal aesthetic health."}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Learn More</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedServices;
