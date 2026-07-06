const AchievementTimeline = ({ achievements = [] }) => {
  if (!achievements.length) return (
    <section className="container py-12 lg:py-16">
      <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-100">Achievements will appear here once added from the dashboard.</div>
    </section>
  );
  return (
    <section className="container py-12 lg:py-16">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">Achievements</p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Professional Milestones</h2>
      </div>
      <div className="mx-auto mt-10 max-w-4xl space-y-5">
        {achievements.map((item) => (
          <article key={`${item.year}-${item.title}`} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:grid-cols-[120px_1fr]">
            <div className="text-3xl font-extrabold text-blue-600">{item.year}</div>
            <div><h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3><p className="mt-2 leading-7 text-slate-600">{item.description}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AchievementTimeline;
