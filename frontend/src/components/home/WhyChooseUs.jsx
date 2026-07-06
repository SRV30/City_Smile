import { iconMap } from './iconMap';

const WhyChooseUs = ({ whyChooseUs }) => {
  if (!whyChooseUs?.items?.length) return null;

  return (
    <section className="container py-8 lg:py-12">
      <div className="rounded-3xl bg-blue-50/80 px-5 py-10 shadow-sm ring-1 ring-blue-100 sm:px-8 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">{whyChooseUs.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{whyChooseUs.heading}</h2>
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.items.map((item) => (
            <article key={item.title} className="text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-100 text-3xl text-blue-600">
                {iconMap[item.icon] || item.icon}
              </div>
              <h3 className="mt-5 text-base font-extrabold text-slate-950">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-[170px] text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
