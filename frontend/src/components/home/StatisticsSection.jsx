import { iconMap } from './iconMap';

const StatisticsSection = ({ statistics = [] }) => {
  if (!statistics.length) return null;

  return (
    <section aria-label="Clinic statistics" className="container relative z-20 -mt-16 pb-10 lg:-mt-12">
      <div className="grid gap-3 rounded-2xl bg-white p-4 text-slate-950 shadow-2xl shadow-blue-950/15 ring-1 ring-slate-100 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 lg:p-6">
        {statistics.map((stat) => (
          <div key={`${stat.value}-${stat.label}`} className="flex items-center gap-4 rounded-xl p-3 lg:justify-center">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue-50 text-2xl text-blue-600 ring-8 ring-blue-50/40">
              {iconMap[stat.icon] || stat.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold leading-none text-slate-950">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
