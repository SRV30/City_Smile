const DoctorAbout = ({ doctor }) => (
  <section className="container py-12 lg:py-16">
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:p-10">
      <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">About Doctor</p>
      <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Professional Biography</h2>
      <div className="mt-6 grid gap-5 text-base leading-8 text-slate-600 lg:grid-cols-2">
        {doctor.longDescription?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
  </section>
);

export default DoctorAbout;
