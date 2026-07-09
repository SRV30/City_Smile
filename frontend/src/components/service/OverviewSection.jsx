const OverviewSection = ({ title, description, image }) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
        <div className="rounded-2xl overflow-hidden h-44 bg-slate-100">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
