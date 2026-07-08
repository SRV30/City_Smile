import { iconMap } from './iconMap';
import heroImg from "../../assets/heroImg.jpeg"

const Stars = ({ rating = 5 }) => (
  <span className="text-yellow-400 tracking-[2px]" aria-label={`${rating} star rating`}>
    {'★'.repeat(Math.round(rating))}
  </span>
);

const Hero = ({ hero }) => {
  if (!hero) return null;

  return (
    <section id="home" className="relative overflow-hidden bg-[#062f77] text-white lg:rounded-b-4xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(42,129,255,.45),transparent_30%),linear-gradient(115deg,#073b91_0%,#05245f_52%,rgba(5,36,95,.65)_100%)]" />
      <div className="container relative grid min-h-160 items-center gap-8 pt-28 pb-24 lg:grid-cols-[1fr_1.05fr] lg:pt-32">
        <div className="z-10 max-w-2xl">
          {hero.eyebrow && (
            <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold shadow-lg ring-1 ring-white/10 backdrop-blur">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {hero.heading?.replace(hero.subHeading, '').trim() || hero.heading}
            {hero.subHeading && <span className="block text-blue-200">{hero.subHeading}</span>}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-50/95">{hero.description}</p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {hero.ctaButtons?.map((button) => (
              <a
                key={`${button.label}-${button.href}`}
                href={button.href}
                className={`inline-flex items-center justify-center gap-3 rounded-lg px-7 py-4 text-sm font-bold transition hover:-translate-y-0.5 ${button.variant === 'secondary' ? 'border border-white/70 bg-white/5 hover:bg-white/15' : 'bg-blue-500 shadow-xl shadow-blue-950/30 hover:bg-blue-400'}`}
              >
                {button.label}
                {button.icon && <span aria-hidden="true">{iconMap[button.icon] || button.icon}</span>}
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {hero.patientAvatars?.map((avatar) => (
                <img key={avatar.name} src={avatar.image} alt={avatar.name} className="h-11 w-11 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <div className="text-sm font-semibold">
              <p>{hero.patientProofText}</p>
              <Stars rating={hero.rating} />
            </div>
          </div>
        </div>

        <div className="relative z-0 self-end lg:absolute lg:bottom-0 lg:right-0 lg:w-[58%]">
          <img src={heroImg} alt={hero.heroImageAlt} className="ml-auto max-h-147.5 w-full object-cover object-center lg:[clip-path:inset(0_0_0_0_round_0)]" />
          <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-[#062f77] to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
