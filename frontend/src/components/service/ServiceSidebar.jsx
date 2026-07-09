import { Link } from "react-router-dom";

const ServiceSidebar = ({ services, currentSlug, onBookAppointment }) => {
  const staticSidebarServices = services.slice(0, 12);

  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 px-1">
          Dental Services
        </h3>
        <div className="space-y-1">
          {staticSidebarServices.map((item) => {
            const isActive = item.slug === currentSlug;
            return (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">🦷</span>
                  <span>{item.title}</span>
                </div>
                <span className="opacity-60">→</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-600/10 space-y-4">
        <h3 className="text-lg font-extrabold">Need Help?</h3>
        <p className="text-xs text-blue-100 font-medium leading-relaxed">
          We are here for you! Connect via instant chat or give us a direct call
          anytime.
        </p>
        <div className="space-y-2 pt-2">
          <a
            href="tel:+918171779011"
            className="w-full flex items-center justify-center gap-2 bg-white text-blue-700 font-bold py-3 rounded-xl text-xs shadow-md hover:bg-blue-50 transition"
          >
            📞 Call Now
          </a>
          <button
            onClick={onBookAppointment}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs shadow-md transition"
          >
            💬 WhatsApp Us
          </button>
          <button
            onClick={onBookAppointment}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-xs shadow-md transition border border-blue-500/30"
          >
            📅 Book Appointment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider px-1">
          Clinic Timings
        </h3>
        <div className="space-y-3 text-xs font-semibold text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-slate-400 font-medium text-[10px]">
              MONDAY - SATURDAY
            </div>
            <div className="text-slate-900 mt-0.5 font-bold">
              9:30 AM - 8:00 PM
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-slate-400 font-medium text-[10px]">SUNDAY</div>
            <div className="text-slate-900 mt-0.5 font-bold">
              10:00 AM - 8:00 PM
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider px-1">
          Visit Our Clinic
        </h3>
        <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
          <p className="font-bold text-slate-900">📍 Location Address</p>
          <p>
            NH-28 Devraha Baba Chowk, Near Amber Drug Agency, In Front of
            Hanuman Mandir, Motihari, Bihar 845402
          </p>
        </div>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
          className="block text-center border border-slate-200 hover:bg-slate-50 font-bold py-2.5 rounded-xl text-xs text-slate-700 transition"
        >
          Get Directions
        </a>
        <div className="h-32 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-100 flex items-center justify-center font-bold text-xs text-blue-500">
            🗺️ Interactive Map
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSidebar;
