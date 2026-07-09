const CTASection = ({ title, description, onBookAppointment }) => {
  return (
    <section className="bg-linear-to-r from-blue-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/10">
      <div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-blue-100 mt-2 max-w-md font-medium">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-end">
        <button
          onClick={onBookAppointment}
          className="bg-white text-blue-700 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md hover:bg-blue-50 transition w-full sm:w-auto"
        >
          Book Appointment
        </button>
        <a
          href="tel:+918171779011"
          className="border border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition text-center w-full sm:w-auto"
        >
          Call Now
        </a>
      </div>
    </section>
  );
};

export default CTASection;
