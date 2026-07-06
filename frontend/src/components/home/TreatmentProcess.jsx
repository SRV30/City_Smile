import { iconMap } from './iconMap';

const TreatmentProcess = ({ process }) => {
  if (!process?.steps?.length) return null;

  return (
    <section className="container py-10 lg:py-14">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">{process.eyebrow}</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{process.heading}</h2>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
        {process.steps.map((step, index) => (
          <article key={step.title} className="relative text-center">
            {index < process.steps.length - 1 && (
              <span className="absolute left-[calc(50%+2.6rem)] top-8 hidden h-px w-[calc(100%-5.2rem)] bg-blue-200 lg:block" aria-hidden="true" />
            )}
            <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full bg-blue-50 text-3xl text-blue-600 ring-8 ring-white">
              {iconMap[step.icon] || step.icon}
            </div>
            <h3 className="mt-5 text-sm font-extrabold text-slate-950">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-[160px] text-sm leading-6 text-slate-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TreatmentProcess;
