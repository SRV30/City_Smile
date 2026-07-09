import { useState, useEffect } from "react";

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
    email: "",
    date: "",
    time: "",
    treatment: "",
    message: "",
    botField: "",
  });

  const [errors, setErrors] = useState({});
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [minTime, setMinTime] = useState("10:00");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (formData.date === minDate) {
      const today = new Date();
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;

      setMinTime(currentTime > "10:00" ? currentTime : "10:00");
    } else {
      setMinTime("10:00");
    }
  }, [formData.date, minDate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.botField) {
      return false;
    }

    const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
    if (urlPattern.test(formData.message)) {
      newErrors.message = "Links are not allowed in the message.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.date) {
      newErrors.date = "Date is required.";
    } else if (formData.date < minDate) {
      newErrors.date = "Past dates are not allowed.";
    }

    if (!formData.time) {
      newErrors.time = "Time is required.";
    } else {
      if (formData.time < "10:00" || formData.time > "20:00") {
        newErrors.time = "Please select a time between 10:00 AM and 8:00 PM.";
      } else if (formData.date === minDate) {
        const today = new Date();
        const currentHours = String(today.getHours()).padStart(2, "0");
        const currentMinutes = String(today.getMinutes()).padStart(2, "0");
        const currentTime = `${currentHours}:${currentMinutes}`;
        if (formData.time < currentTime) {
          newErrors.time = "Past times are not allowed.";
        }
      }
    }

    if (!formData.treatment) {
      newErrors.treatment = "Treatment is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const lastSubmitTime = localStorage.getItem("lastSubmitTime");
    const now = Date.now();
    if (lastSubmitTime && now - parseInt(lastSubmitTime) < 60000) {
      alert("Please wait a minute before submitting another request.");
      return;
    }

    const whatsappNumber = "918171779011";

    const whatsappMessage = `*NEW APPOINTMENT BOOKING*

 *Clinic:* City Smile Dental & Implant Clinic
━━━━━━━━━━━━━━━━━━━━━━━━━━━

*PATIENT DETAILS*
• *Name:* ${formData.name}
• *Contact:* ${formData.phone}
${formData.email ? `• *Email:* ${formData.email}` : ""}

 *CLINICAL DETAILS*
• *Treatment:* ${formData.treatment}
• *Preferred Date:* ${formData.date}
• *Preferred Time:* ${formData.time}

 *ADDITIONAL NOTES*
${formData.message.trim() ? `_" ${formData.message} "_` : "None"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Please reply to confirm this appointment slot._`;

    localStorage.setItem("lastSubmitTime", now.toString());
    setIsRedirecting(true);

    setTimeout(() => {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage,
        )}`,
        "_blank",
      );

      setIsRedirecting(false);

      setFormData({
        name: "",
        phone: "",
        email: "",
        date: "",
        time: "",
        treatment: "",
        message: "",
        botField: "",
      });
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 bg-blue-50/80 py-12 lg:py-16"
    >
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-all animate-fadeIn">
          <div className="mx-4 max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl ring-1 ring-black/5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 animate-pulse">
              📲
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Redirecting to WhatsApp
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Please hold on while we prepare your appointment details and open
              WhatsApp to finalize your booking...
            </p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{
                  animation: "loading 2.3s linear forwards",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="container grid gap-6 lg:grid-cols-[0.9fr_1.1fr_1fr]">
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
              <h4 className="mb-2 text-base font-bold">Clinic Timings</h4>

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

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <h3 className="text-center text-xl font-extrabold text-slate-950">
            {contact.formHeading}
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="botField"
              value={formData.botField}
              onChange={handleChange}
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-xl border ${
                  errors.name
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50"
                } px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10`}
                placeholder="Your Name *"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                className={`w-full rounded-xl border ${
                  errors.phone
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50"
                } px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10`}
                placeholder="Mobile Number *"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-xl border ${
                  errors.email
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50"
                } px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10`}
                placeholder="Email Address (Optional)"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  min={minDate}
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full cursor-pointer appearance-none rounded-xl border ${
                    errors.date
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 bg-slate-50/50"
                  } px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100`}
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-xs text-red-500">{errors.date}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  min={minTime}
                  max="20:00"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full cursor-pointer appearance-none rounded-xl border ${
                    errors.time
                      ? "border-red-500 bg-red-50/50"
                      : "border-slate-200 bg-slate-50/50"
                  } px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100`}
                />
              </div>
              {errors.time && (
                <p className="mt-1 text-xs text-red-500">{errors.time}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <select
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                className={`w-full cursor-pointer appearance-none rounded-xl border ${
                  errors.treatment
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50"
                } px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
                  formData.treatment ? "text-slate-900" : "text-slate-400"
                }`}
              >
                <option value="" disabled>
                  Select Treatment *
                </option>

                {treatments.map((service) => (
                  <option
                    key={service}
                    value={service}
                    className="text-slate-900"
                  >
                    {service}
                  </option>
                ))}
              </select>
              {errors.treatment && (
                <p className="mt-1 text-xs text-red-500">{errors.treatment}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`min-h-30 w-full resize-y rounded-xl border ${
                  errors.message
                    ? "border-red-500 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50"
                } px-4 py-3.5 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10`}
                placeholder="Additional Message (Optional)"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isRedirecting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 hover:shadow-green-600/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
          >
            {isRedirecting ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Connecting...
              </>
            ) : (
              "📲 Book Appointment via WhatsApp"
            )}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-100">
          <iframe
            src={settings.googleMapEmbed}
            title={contact.mapCardTitle}
            className="h-full min-h-100 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
