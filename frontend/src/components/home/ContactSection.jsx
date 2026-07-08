import { useState } from "react";

const treatments = [
  "Dental X-ray",
  "Root Canal Treatment",
  "Teeth Coloured Filling",
  "Complete & Partial Denture",
  "Crown & Bridges",
  "Tooth Extraction",
  "Dental Implant",
  "Ultrasonic Scaling",
  "Impaction",
  "Orthodontic Treatment",
  "Tooth Problems of Children",
  "Smile Designing",
];

const ContactSection = ({ contact, settings }) => {
  if (!contact || !settings) return null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    treatment: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.treatment
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const whatsappNumber = "918171779011";

    const whatsappMessage = `
━━━━━━━━━━━━━━━━━━━━━━
🦷 *City Smile Dental & Implant Clinic*
*Appointment Request*
━━━━━━━━━━━━━━━━━━━━━━

👤 *Patient Name*
${formData.name}

📱 *Mobile Number*
${formData.phone}

🦷 *Treatment Required*
${formData.treatment}

📅 *Preferred Date*
${formData.date}

🕒 *Preferred Time*
${formData.time}

📝 *Additional Notes*
${formData.message || "N/A"}

━━━━━━━━━━━━━━━━━━━━━━

Please confirm my appointment.

Thank You.
`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage,
      )}`,
      "_blank",
    );

    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      treatment: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="scroll-mt-28 bg-blue-50/80 py-12 lg:py-16">
      <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr]">
        {/* Left Card */}
        <div
          id="appointment"
          className="rounded-3xl bg-blue-700 p-7 text-white shadow-xl shadow-blue-950/15"
        >
          <p className="text-xs font-bold uppercase text-blue-100">
            {contact.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">{contact.heading}</h2>

          <p className="mt-4 text-sm leading-7 text-blue-50">
            {contact.description}
          </p>

          <div className="mt-7 space-y-4 text-sm">
            <p>
              📞 <strong>{settings.phone}</strong>
            </p>

            <p>
              ✉ <strong>{settings.clinicEmail}</strong>
            </p>

            <p>📍 {settings.address}</p>

            <div className="pt-2">
              <h4 className="font-bold text-base mb-2">Clinic Timings</h4>

              <div className="space-y-2 text-blue-100">
                <p>
                  🕒 Monday - Saturday
                  <br />
                  <strong>9:30 AM - 8:00 PM</strong>
                </p>

                <p>
                  🕒 Sunday
                  <br />
                  <strong>10:00 AM - 8:00 PM</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <h3 className="text-center text-xl font-extrabold text-slate-950">
            {contact.formHeading}
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              placeholder="Your Name *"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              placeholder="Phone Number *"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <select
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:col-span-2"
            >
              <option value="">Select Treatment</option>

              {treatments.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="min-h-24 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 sm:col-span-2"
              placeholder="Additional Message (Optional)"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-lg bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700"
          >
            📲 Book Appointment via WhatsApp
          </button>
        </div>

        {/* Google Map */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <iframe
            src={settings.googleMapEmbed}
            title={contact.mapCardTitle}
            className="h-full min-h-105 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
