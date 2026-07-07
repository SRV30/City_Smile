import { Link } from "react-router-dom";

export const IconBadge = ({ children, className = "" }) => (
  <span
    className={`inline-grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600 ${className}`}
  >
    {children}
  </span>
);

export const Button = ({
  as: Comp = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500",
    secondary: "border border-blue-200 bg-white text-blue-700 hover:bg-blue-50",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  };

  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-400/60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const Card = ({ className = "", children }) => (
  <div
    className={`rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)] ${className}`}
  >
    {children}
  </div>
);

export const SectionTitle = ({
  eyebrow,
  title,
  description,
  align = "left",
}) => (
  <div
    className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
  >
    {eyebrow ? (
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-blue-600">
        {eyebrow}
      </p>
    ) : null}
    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
      {title}
    </h2>
    {description ? (
      <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
        {description}
      </p>
    ) : null}
  </div>
);

export const StatCard = ({ icon = "★", value, label }) => (
  <Card className="p-5">
    <div className="flex items-center gap-4">
      <IconBadge>{icon}</IconBadge>
      <div>
        <p className="text-xl font-extrabold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  </Card>
);

export const ServiceCard = ({ icon = "🦷", title, description, slug }) => (
  <Link
    to={slug ? `/services/${slug}` : "#"}
    className="group block h-full rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(37,99,235,0.12)]"
  >
    <IconBadge>{icon}</IconBadge>
    <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
      Learn more <span className="transition group-hover:translate-x-1">→</span>
    </span>
  </Link>
);

export const FeatureCard = ({ icon = "✓", title, text }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
    <IconBadge className="mx-auto">{icon}</IconBadge>
    <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
    <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
  </div>
);

export const TimelineStep = ({ index, title, text }) => (
  <div className="flex gap-4">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-700">
      {String(index).padStart(2, "0")}
    </div>
    <div>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  </div>
);

export const TestimonialCard = ({ text, name, role, rating = 5 }) => (
  <Card className="p-5">
    <div className="flex items-start gap-3">
      <IconBadge className="mt-1">“</IconBadge>
      <div>
        <p className="text-sm leading-7 text-slate-600">{text}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-900">{name}</p>
            <p className="text-xs text-slate-500">{role}</p>
          </div>
          <div className="text-sm font-bold text-amber-500">
            {"★".repeat(rating)}
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export const GalleryThumb = ({ image, title, category, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
  >
    <img
      src={image}
      alt={title}
      className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
    <div className="absolute bottom-3 left-3 right-3 text-left opacity-0 transition group-hover:opacity-100">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
        {category}
      </p>
      <p className="text-sm font-bold text-white">{title}</p>
    </div>
  </button>
);

export const FAQItem = ({ question, answer }) => (
  <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
    <summary className="cursor-pointer list-none text-sm font-bold text-slate-900">
      {question}
    </summary>
    <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
  </details>
);

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${className}`}
    {...props}
  />
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${className}`}
    {...props}
  />
);

export const Select = ({ className = "", ...props }) => (
  <select
    className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${className}`}
    {...props}
  />
);

export const Loader = () => (
  <div className="flex items-center gap-3 text-sm font-semibold text-blue-700">
    <span className="h-3 w-3 animate-pulse rounded-full bg-blue-600" />
    Loading...
  </div>
);

export const EmptyState = ({ title, description }) => (
  <Card className="p-8 text-center">
    <p className="text-lg font-bold text-slate-900">{title}</p>
    <p className="mt-2 text-sm text-slate-500">{description}</p>
  </Card>
);

export const ErrorState = ({ title, description }) => (
  <Card className="p-8 text-center">
    <p className="text-lg font-bold text-rose-600">{title}</p>
    <p className="mt-2 text-sm text-slate-500">{description}</p>
  </Card>
);
