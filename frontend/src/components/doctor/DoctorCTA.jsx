const DoctorCTA = ({ phone }) => (
  <section id="appointment" className="container py-12 lg:py-16">
    <div className="rounded-3xl bg-blue-700 p-8 text-center text-white shadow-xl shadow-blue-950/20 lg:p-12">
      <p className="text-sm font-bold uppercase text-blue-100">Ready for a healthier smile?</p>
      <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Book Your Appointment Today</h2>
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <a href="/\#appointment" className="rounded-lg bg-white px-8 py-4 text-sm font-extrabold text-blue-700">Book Appointment</a>
        <a href={`tel:${phone || ''}`} className="rounded-lg border border-white/60 px-8 py-4 text-sm font-extrabold">Call Clinic</a>
      </div>
    </div>
  </section>
);

export default DoctorCTA;
