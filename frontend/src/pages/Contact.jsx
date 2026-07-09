import { useState } from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for the field being typed in
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: null });
    }
  };

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

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const spamRegex = /(http|https|www\.|<a)/i; // Basic spam detection (blocks links and HTML tags)

    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!emailRegex.test(formData.email))
      errors.email = "Please enter a valid email address.";
    if (!phoneRegex.test(formData.phone))
      errors.phone = "Phone number must be exactly 10 digits.";
    if (!formData.treatment) errors.treatment = "Please select a treatment.";
    if (spamRegex.test(formData.message))
      errors.message = "URLs and HTML tags are not allowed.";

    return errors;
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    // Construct WhatsApp message
    const whatsappMessage = `*New Clinic Appointment/Query*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Treatment:* ${formData.treatment}%0A*Message:* ${formData.message || "N/A"}`;

    window.open(`https://wa.me/918171779011?text=${whatsappMessage}`, "_blank");
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16 max-w-3xl"
        >
          <h1 className="text-4xl font-extrabold text-slate-950 sm:text-5xl">
            Contact the Leading Dental Surgeon in Motihari
          </h1>
          <div className="mt-6 h-1.5 w-20 rounded-full bg-blue-600"></div>
          <p className="mt-8 text-lg leading-relaxed text-slate-600">
            Have a question regarding an ongoing oral health concern, advanced
            treatment pathways, or clinical fees? Simply submit your query using
            the form below, and our dedicated clinical support desk at City
            Smile Dental & Implant Clinic, Motihari will reach out to you
            promptly.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Whether you are seeking detailed insights into Dental Implants,
            specialized Root Canal Treatments, Orthodontic Treatment, or Tooth
            Problems of Children, we are fully committed to guiding you with
            absolute clinical clarity and transparent pricing metrics before
            your visit.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column: Contact Form & Emergency CTA */}
          <div className="space-y-12">
            {/* Contact Form */}
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              onSubmit={handleWhatsAppSubmit}
              className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
            >
              <h2 className="mb-8 text-2xl font-bold text-slate-950">
                Send a Query
              </h2>
              <div className="grid gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Full Name"
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${formErrors.name ? "border-red-500" : "border-slate-200"} px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors`}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Email Address"
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${formErrors.email ? "border-red-500" : "border-slate-200"} px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      placeholder="10-Digit Phone Number"
                      onChange={handleChange}
                      className={`w-full rounded-xl border ${formErrors.phone ? "border-red-500" : "border-slate-200"} px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <select
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${formErrors.treatment ? "border-red-500" : "border-slate-200"} px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-500 transition-colors`}
                  >
                    <option value="">Select Treatment</option>
                    {treatments.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {formErrors.treatment && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.treatment}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    placeholder="Your Message"
                    onChange={handleChange}
                    className={`w-full rounded-xl border ${formErrors.message ? "border-red-500" : "border-slate-200"} px-4 py-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-colors hover:bg-blue-700 shadow-md hover:shadow-lg"
                >
                  Submit Query via WhatsApp
                </motion.button>
              </div>
            </motion.form>

            {/* Emergency CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold">
                  Need Immediate Dental Help?
                </h3>
                <p className="mt-3 text-blue-50">
                  Tap below to chat with our team on WhatsApp and get an instant
                  response from City Smile Dental & Implant Clinic, Motihari.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/918171779011?text=Hi%20City%20Smile%20Dental%20Clinic,%20I%20need%20immediate%20dental%20help!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl bg-white px-8 py-3 font-bold text-blue-600 shadow-lg"
                  >
                    👉 Tap to Chat!
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="tel:+918171779011"
                    className="inline-block rounded-xl bg-blue-500 px-8 py-3 font-bold text-white shadow-lg border border-blue-400 hover:bg-blue-400"
                  >
                    📞 Call Now
                  </motion.a>
                </div>
              </div>
              {/* Decorative Background Element */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
            </motion.div>
          </div>

          {/* Right Column: Info Card & Map */}
          <div className="space-y-8">
            {/* Info Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl"
            >
              <h2 className="text-2xl font-bold">Get in Touch Today!</h2>
              <p className="mt-2 text-blue-50">
                Your perfect smile is just a call away. We are here to help you.
              </p>
              <div className="mt-8 space-y-4">
                <p className="font-semibold flex items-center gap-2">
                  <span>📞</span> +91 81717 79011
                </p>
                <p className="font-semibold flex items-center gap-2 break-all">
                  <span>✉️</span> citysmilebydraditya@gmail.com
                </p>
                <p className="text-blue-100 flex items-start gap-2 leading-relaxed">
                  <span className="mt-1">📍</span>
                  NH-28 Devraha Baba Chowk, Near Amber Drug Agency, In Front of
                  Hanuman Mandir, Motihari, Bihar
                </p>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 ring-1 ring-slate-100"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3565.3221681188793!2d84.91794127488663!3d26.670176970472376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993357dc707a59d%3A0x7e82dd9d06646d48!2sCity%20Smile%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1783599905816!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
