const TreatmentTypes = ({ title, types }) => {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 text-center lg:text-left">
        {title}
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {types.map((type, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-xs mb-4">
              ★
            </div>
            <h4 className="text-sm font-bold text-slate-950">{type.name}</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {type.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TreatmentTypes;
