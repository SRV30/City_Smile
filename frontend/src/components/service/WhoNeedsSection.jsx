const WhoNeedsSection = ({ title, items }) => {
  return (
    <section>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 text-center lg:text-left">
        {title}
      </h2>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center"
          >
            <div className="w-8 h-8 mx-auto bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs mb-3">
              ✓
            </div>
            <div className="text-xs font-bold text-slate-900">{item.title}</div>
            <div className="text-[11px] text-slate-500 mt-1 leading-tight">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoNeedsSection;
