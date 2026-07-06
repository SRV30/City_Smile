const ContactSection = ({ contact, settings }) => {
  if (!contact || !settings) return null;

  return (
    <section id="contact" className="scroll-mt-28 bg-blue-50/80 py-12 lg:py-16">
      <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr]">
        <div id="appointment" className="rounded-3xl bg-blue-700 p-7 text-white shadow-xl shadow-blue-950/15">
          <p className="text-xs font-bold uppercase text-blue-100">{contact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold">{contact.heading}</h2>
          <p className="mt-4 text-sm leading-7 text-blue-50">{contact.description}</p>
          <div className="mt-7 space-y-4 text-sm font-semibold">
            <p>☎ {settings.phone}</p>
            <p>✉ {settings.clinicEmail}</p>
            <p>⌖ {settings.address}</p>
            <p>◷ Mon - Sun : 9:30 AM - 8:00 PM</p>
          </div>
        </div>

        <form className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <h3 className="text-center text-xl font-extrabold text-slate-950">{contact.formHeading}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Your Name" />
            <input className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Phone Number" />
            <input className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Preferred Date" />
            <input className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Preferred Time" />
            <select className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:col-span-2" defaultValue="">
              <option value="" disabled>Select Treatment</option>
              <option>Dental Implants</option>
              <option>Root Canal Treatment</option>
              <option>Teeth Whitening</option>
            </select>
            <textarea className="min-h-20 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:col-span-2" placeholder="Message (Optional)" />
          </div>
          <button type="button" className="mt-5 w-full rounded-lg bg-blue-600 px-6 py-4 text-sm font-bold text-white">{contact.submitLabel}</button>
        </form>

        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <iframe src={settings.googleMapEmbed} title={contact.mapCardTitle} className="h-full min-h-[360px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a href={settings.googleMapUrl} target="_blank" rel="noreferrer" className="absolute left-5 top-5 rounded-2xl bg-white p-4 text-sm shadow-xl">
            <strong className="block text-slate-950">{contact.mapCardTitle}</strong>
            <span className="mt-1 block max-w-[220px] text-slate-600">{settings.address}</span>
            <span className="mt-2 block text-yellow-400">4.9 ★★★★★</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
