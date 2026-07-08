const TestimonialsSection = ({ testimonials = [] }) => {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="container scroll-mt-28 py-10 lg:py-14">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">Patient Testimonials</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">What Our Patients Say</h2>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <article key={item._id || index} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="text-4xl font-black leading-none text-blue-600">“</div>
            <p className="mt-2 min-h-24 text-sm leading-7 text-slate-700">{item.review}</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {item.avatar && (
                  <img src={item.avatar} alt={item.name} className="h-11 w-11 rounded-full object-cover" />
                )}
                <div>
                  <p className="text-sm font-extrabold text-blue-600">{item.name}</p>
                  {item.service && <p className="text-xs text-slate-500">{item.service}</p>}
                </div>
              </div>
              <span className="text-yellow-400">{'★'.repeat(item.rating)}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-600" /><span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" /></div>
    </section>
  );
};

export default TestimonialsSection;
