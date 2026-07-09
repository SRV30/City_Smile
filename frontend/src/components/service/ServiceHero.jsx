import { Link } from "react-router-dom";

const ServiceHero = ({ title, description, image, highlights, stats }) => {
  const handleBookAppointment = (e) => {
    e.preventDefault();
    window.open(
      "https://wa.me/918171779011?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment.",
      "_blank",
    );
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-slate-600 leading-relaxed">{description}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleBookAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition text-sm"
            >
              Book Appointment
            </button>
            <a
              href="tel:+918171779011"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl active:scale-95 transition text-sm"
            >
              Call Now
            </a>
          </div>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 pt-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="text-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100"
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-xs text-slate-500 font-medium">
              {stat.label}
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHero;
