import image from "../../assets/dr.jpeg";

const AboutClinic = ({ about }) => {
  if (!about) return null;

  return (
    <section id="about" className="container scroll-mt-28 py-8 lg:py-14">
      <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <img
            src={image}
            alt={about.imageAlt}
            className="aspect-4/5 w-full rounded-2xl object-fit shadow-xl shadow-slate-200"
          />
          <div className="absolute bottom-0 right-0 translate-x-3 translate-y-3 rounded-2xl bg-blue-600 px-6 py-5 text-center font-bold text-white shadow-xl shadow-blue-950/20 sm:translate-x-5 sm:translate-y-5">
            <p className="text-3xl">{about.experienceBadgeValue}</p>
            <p className="max-w-23 text-sm leading-tight">
              {about.experienceBadgeLabel}
            </p>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {about.heading?.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-blue-600">
              {about.heading?.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="mt-4 font-semibold uppercase tracking-wide text-slate-700">
            {about.subHeading}
          </p>

          <div className="mt-5 space-y-3 text-left">
            {about.highlights?.map((highlight) => (
              <p
                key={highlight}
                className="flex items-start gap-3 text-sm font-bold text-slate-900"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-600 text-[10px] text-white">
                  ✓
                </span>
                {highlight}
              </p>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-left text-base leading-8 text-slate-600">
            {about.description?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {about.cta?.label && (
            <a
              href="/about"
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/15 transition hover:bg-blue-500"
            >
              {about.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutClinic;
