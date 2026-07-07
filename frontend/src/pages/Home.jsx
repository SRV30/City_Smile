import { useEffect, useMemo, useState } from "react";
import Seo from "../components/Seo";
import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  FeatureCard,
  GalleryThumb,
  IconBadge,
  Loader,
  SectionTitle,
  ServiceCard,
  StatCard,
  TestimonialCard,
  TimelineStep,
  Input,
  Textarea,
} from "../components/UI";
import { useSettings } from "../context/SettingsContext";
import {
  fetchFaqs,
  fetchGallery,
  fetchHome,
  fetchServices,
  fetchTestimonials,
} from "../services/content.service";
import {
  createAppointment,
  sendContactMessage,
} from "../services/interaction.service";
import {
  fallbackFaqs,
  fallbackGallery,
  fallbackHome,
  fallbackServices,
  fallbackTestimonials,
} from "../data/fallbackContent";

const defaultAppointment = {
  name: "",
  phone: "",
  date: "",
  time: "",
  treatment: "",
  message: "",
};

const defaultContact = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function normalizeArray(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.list)) return value.list;
  return fallback;
}

function normalizeObject(value, fallback = {}) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  return fallback;
}

export default function Home() {
  const { settings } = useSettings();

  const [home, setHome] = useState(fallbackHome);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [appointment, setAppointment] = useState(defaultAppointment);
  const [contact, setContact] = useState(defaultContact);
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      try {
        const [homeData, serviceData, testimonialData, faqData, galleryData] =
          await Promise.allSettled([
            fetchHome(),
            fetchServices(),
            fetchTestimonials(),
            fetchFaqs(),
            fetchGallery({ featured: true, limit: 6 }),
          ]);

        if (homeData.status === "fulfilled" && homeData.value) {
          const nextHome = normalizeObject(homeData.value, fallbackHome);

          setHome({
            ...fallbackHome,
            ...nextHome,
            hero: normalizeObject(nextHome.hero, fallbackHome.hero),
            about: normalizeObject(nextHome.about, fallbackHome.about),
            stats: normalizeArray(nextHome.stats, fallbackHome.stats),
            whyChooseUs: normalizeArray(
              nextHome.whyChooseUs,
              fallbackHome.whyChooseUs,
            ),
            process: normalizeArray(nextHome.process, fallbackHome.process),
          });
        }

        if (serviceData.status === "fulfilled") {
          setServices(normalizeArray(serviceData.value, []));
        }

        if (testimonialData.status === "fulfilled") {
          setTestimonials(normalizeArray(testimonialData.value, []));
        }

        if (faqData.status === "fulfilled") {
          setFaqs(normalizeArray(faqData.value, []));
        }

        if (galleryData.status === "fulfilled") {
          setGallery(normalizeArray(galleryData.value, []));
        }
      } catch (err) {
        setError(err.message || "Failed to load homepage");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const serviceItems = services.length ? services : fallbackServices;
  const testimonialItems = testimonials.length
    ? testimonials
    : fallbackTestimonials;
  const faqItems = faqs.length ? faqs : fallbackFaqs;
  const galleryItems = gallery.length ? gallery : fallbackGallery;

  const hero = normalizeObject(home.hero, fallbackHome.hero);
  const about = normalizeObject(home.about, fallbackHome.about);
  const stats = normalizeArray(home.stats, fallbackHome.stats);
  const whyChooseUs = normalizeArray(
    home.whyChooseUs,
    fallbackHome.whyChooseUs,
  );
  const process = normalizeArray(home.process, fallbackHome.process);

  const galleryPreview = useMemo(
    () => galleryItems.slice(0, 6),
    [galleryItems],
  );

  const handleAppointment = async (e) => {
    e.preventDefault();
    setAppointmentStatus("");

    try {
      await createAppointment(appointment);
      setAppointmentStatus("Appointment request submitted successfully.");
      setAppointment(defaultAppointment);
    } catch (err) {
      setAppointmentStatus(err.message || "Failed to submit appointment.");
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setContactStatus("");

    try {
      await sendContactMessage(contact);
      setContactStatus("Message sent successfully.");
      setContact(defaultContact);
    } catch (err) {
      setContactStatus(err.message || "Failed to send message.");
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <ErrorState title="Unable to load homepage" description={error} />
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${settings.clinicName} | Motihari`}
        description="City Smile Dental & Implant Clinic in Motihari – expert dental care, implants, braces, and cleaning."
      />

      <section id="home" className="overflow-hidden bg-[#0b3f9a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-6 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-blue-50">
              {hero.eyebrow}
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.08] md:text-6xl">
              {hero.title}
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-blue-50/90 md:text-base">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                className="!bg-white !text-blue-700"
              >
                {hero.primaryCta}
              </Button>
              <Button
                as="a"
                href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                variant="secondary"
                className="border-white/25 !bg-transparent !text-white hover:!bg-white/10"
              >
                {hero.secondaryCta}
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["👨‍⚕️", "🙂", "🦷", "✨"].map((x) => (
                  <span
                    key={x}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white text-sm"
                  >
                    {x}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  5000+ Happy Patients
                </p>
                <p className="text-xs text-blue-100">
                  Trusted by families in Motihari
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[30px] border border-white/15 bg-white/10 shadow-[0_20px_60px_rgba(2,8,23,0.35)]">
              <img
                src="/hero-doctor.jpg"
                alt={settings.doctorName}
                className="h-[360px] w-full object-cover object-center md:h-[460px]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto -mt-8 max-w-7xl px-4 pb-10 lg:px-6">
          <div className="grid gap-4 rounded-[28px] bg-white p-4 text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <StatCard
                key={index}
                icon={["👥", "⭐", "🏅", "★"][index % 4]}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-slate-50 px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <Card className="overflow-hidden p-0">
              <img
                src="/doctor-profile.jpg"
                alt={settings.doctorName}
                className="h-[420px] w-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </Card>
            <div className="absolute -bottom-5 left-5 rounded-2xl bg-blue-600 px-4 py-3 text-white shadow-lg">
              <p className="text-xl font-extrabold">10+</p>
              <p className="text-xs">Years of Experience</p>
            </div>
          </div>

          <div>
            <SectionTitle
              eyebrow={about.eyebrow}
              title={about.title}
              description={about.description}
            />
            <div className="mt-8 grid gap-4">
              <p className="text-sm leading-7 text-slate-600">
                {settings.doctorName} — {settings.designation},{" "}
                {settings.specialization}.
              </p>
              <div className="grid gap-3">
                {[
                  "Ex-Oral & Dental Surgeon, KDC Hospital, Delhi",
                  "Ex-Oral & Dental Surgeon, KDC PSDC, Patna",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <IconBadge className="h-8 w-8 text-sm">✓</IconBadge>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
              <div>
                <Button as="a" href="/doctor" variant="primary">
                  Know More About Us →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle
              eyebrow="Our Services"
              title="Comprehensive Dental Solutions"
              description="A modern treatment experience with premium care and clear communication."
            />
            <Button
              as="a"
              href="/#contact"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              View All Services
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceItems.map((item) => (
              <ServiceCard
                key={item.slug || item.title}
                icon={item.icon || "🦷"}
                title={item.title}
                description={item.description}
                slug={item.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef5ff] px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Choose Us"
            title="Advanced Care, Personal Touch"
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {whyChooseUs.map((item, index) => (
              <FeatureCard
                key={index}
                icon={["⚙", "🛡", "👨‍⚕️", "😊", "☎"][index % 5]}
                title={item.title}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Our Treatment Journey"
            title="Your Smile, Our Responsibility"
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {process.map((item, index) => (
              <Card key={index} className="p-5">
                <TimelineStep
                  index={index + 1}
                  title={item.title}
                  text={item.text}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-slate-50 px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Patient Testimonials"
            title="What Our Patients Say"
            align="center"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {testimonialItems.map((item, index) => (
              <TestimonialCard
                key={index}
                text={item.text}
                name={item.name}
                role={item.role}
                rating={item.rating || 5}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white px-4 py-16 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <SectionTitle
              eyebrow="Our Gallery"
              title="Moments of Healthy Smiles"
              description="A quick preview of the clinic environment, treatments, and patient care."
            />
            <Button
              as="a"
              href="/gallery"
              variant="secondary"
              className="hidden md:inline-flex"
            >
              View Full Gallery
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryPreview.map((item, index) => (
              <GalleryThumb
                key={index}
                image={item.image || item.url}
                title={item.title}
                category={item.category}
                onClick={() => (window.location.href = "/gallery")}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#eef5ff] px-4 py-16 lg:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_1fr_0.8fr]">
          <Card className="bg-[#0b3f9a] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
              Need Help?
            </p>
            <h3 className="mt-2 text-2xl font-extrabold">
              Get in Touch Today!
            </h3>
            <p className="mt-3 text-sm leading-7 text-blue-50">
              Your perfect smile is just a call away. We are here to help you.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-blue-50">
              <p>📞 {settings.phone}</p>
              <p>✉ {settings.clinicEmail}</p>
              <p>📍 {settings.address}</p>
              <p>⏰ {settings.workingHours}</p>
            </div>
            <Button
              as="a"
              href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
              variant="secondary"
              className="mt-6 w-full !bg-white !text-blue-700"
            >
              Book Appointment
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-2xl font-extrabold text-slate-900">
              Book Your Appointment
            </h3>
            <form onSubmit={handleAppointment} className="mt-5 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  placeholder="Your Name"
                  value={appointment.name}
                  onChange={(e) =>
                    setAppointment({ ...appointment, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone Number"
                  value={appointment.phone}
                  onChange={(e) =>
                    setAppointment({ ...appointment, phone: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  type="date"
                  value={appointment.date}
                  onChange={(e) =>
                    setAppointment({ ...appointment, date: e.target.value })
                  }
                />
                <Input
                  type="time"
                  value={appointment.time}
                  onChange={(e) =>
                    setAppointment({ ...appointment, time: e.target.value })
                  }
                />
              </div>
              <Input
                placeholder="Treatment"
                value={appointment.treatment}
                onChange={(e) =>
                  setAppointment({ ...appointment, treatment: e.target.value })
                }
              />
              <Textarea
                rows={4}
                placeholder="Message (Optional)"
                value={appointment.message}
                onChange={(e) =>
                  setAppointment({ ...appointment, message: e.target.value })
                }
              />
              <Button type="submit" variant="primary">
                Book Appointment
              </Button>
              {appointmentStatus ? (
                <p className="text-sm text-slate-600">{appointmentStatus}</p>
              ) : null}
            </form>
          </Card>

          <Card className="overflow-hidden p-0">
            <iframe
              title="City Smile Dental Clinic location"
              src={settings.googleMapEmbed}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </Card>
        </div>

        <div className="mx-auto mt-6 max-w-7xl">
          <Card className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Input
                placeholder="Your Name"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
              <Input
                placeholder="Email Address"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone Number"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
              <Input placeholder="Subject" />
            </div>
            <Textarea
              rows={5}
              placeholder="Your Message"
              className="mt-4"
              value={contact.message}
              onChange={(e) =>
                setContact({ ...contact, message: e.target.value })
              }
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <Button onClick={handleContact} variant="primary" type="button">
                Send Message
              </Button>
              {contactStatus ? (
                <p className="text-sm text-slate-600">{contactStatus}</p>
              ) : null}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
