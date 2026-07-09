const TreatmentProcedure = ({ title, steps }) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 text-center">
        {title}
      </h2>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="text-center relative group">
            <div className="w-10 h-10 mx-auto rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-md z-10 relative">
              {step.step}
            </div>
            <h4 className="text-xs font-bold text-slate-950 mt-4 leading-tight">
              {step.title}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TreatmentProcedure;
