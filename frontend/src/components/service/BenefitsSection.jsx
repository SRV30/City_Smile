const BenefitsSection = ({ title, benefits }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950 mb-4">{title}</h3>
      <ul className="space-y-3 text-xs font-medium text-slate-700">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="text-blue-600 mt-0.5">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsSection;
