const WhyChooseSection = ({ title, items }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950 mb-4">{title}</h3>
      <ul className="space-y-3 text-xs font-medium text-slate-700">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="text-emerald-500 mt-0.5">🛡️</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyChooseSection;
