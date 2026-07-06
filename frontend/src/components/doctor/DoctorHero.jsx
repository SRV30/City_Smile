const DoctorHero = ({ doctor, phone }) => (
  <section className="relative overflow-hidden bg-[#062f77] pt-28 text-white lg:rounded-b-[2rem]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(42,129,255,.45),transparent_30%),linear-gradient(115deg,#073b91_0%,#05245f_52%,#031a48_100%)]" />
    <div className="container relative grid items-center gap-10 pb-16 lg:grid-cols-[1fr_0.85fr] lg:pt-12">
      <div>
        <p className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold ring-1 ring-white/15">Meet Your Dentist</p>
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight sm:text-6xl">{doctor.name}</h1>
        <p className="mt-4 text-2xl font-bold text-blue-200">{doctor.designation}</p>
        <p className="mt-2 text-lg text-blue-50">{doctor.specialization}</p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-blue-50/90">{doctor.shortDescription}</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="#appointment" className="rounded-lg bg-blue-500 px-7 py-4 text-center text-sm font-extrabold shadow-xl shadow-blue-950/20">Book Appointment</a>
          <a href={`tel:${phone || ''}`} className="rounded-lg border border-white/60 px-7 py-4 text-center text-sm font-extrabold">Call Now</a>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-md">
        <img src={doctor.profileImage} alt={`${doctor.name}, ${doctor.designation}`} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl shadow-blue-950/30" />
        <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-5 text-slate-950 shadow-2xl">
          <p className="text-4xl font-extrabold text-blue-600">{doctor.yearsOfExperience}+</p>
          <p className="text-sm font-bold">Years Experience</p>
        </div>
      </div>
    </div>
  </section>
);

export default DoctorHero;
