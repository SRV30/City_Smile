import { useEffect, useState } from 'react';
import AboutClinic from '../components/home/AboutClinic';
import ContactSection from '../components/home/ContactSection';
import FaqSection from '../components/home/FaqSection';
import GalleryPreview from '../components/home/GalleryPreview';
import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import StatisticsSection from '../components/home/StatisticsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TreatmentProcess from '../components/home/TreatmentProcess';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { useSettings } from '../context/SettingsContext';
import { getHome } from '../services/home.service';
import { getContactContent, getFaqs, getGalleryPreview } from '../services/publicContent.service';
import { getServices } from '../services/services.service';
import { getApprovedTestimonials } from '../services/testimonial.service';
import { getRandomItems } from '../utils/random.utils';
import { MAX_DISPLAY_TESTIMONIALS, TESTIMONIAL_PLACEHOLDERS } from '../constants/testimonial.constants';

const Home = () => {
  const [home, setHome] = useState(null);
  const [status, setStatus] = useState('loading');
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState(null);
  const [contact, setContact] = useState(null);
  const { settings, loading: settingsLoading } = useSettings();

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getHome(),
      getServices(),
      getApprovedTestimonials(),
      getFaqs(),
      getGalleryPreview(),
      getContactContent(),
    ])
      .then(([homeResponse, servicesResponse, testimonialsResponse, faqsResponse, galleryResponse, contactResponse]) => {
        if (isMounted) {
          setHome(homeResponse.data);
          setServices(servicesResponse.data);

          // Handle testimonials with randomization and fallback
          const fetchedTestimonials = testimonialsResponse.data || [];
          if (fetchedTestimonials.length > 0) {
            setTestimonials(getRandomItems(fetchedTestimonials, MAX_DISPLAY_TESTIMONIALS));
          } else {
            setTestimonials(TESTIMONIAL_PLACEHOLDERS);
          }

          setFaqs(faqsResponse.data);
          setGalleryPreview(galleryResponse.data);
          setContact(contactResponse.data);
          setStatus('success');
        }
      })
      .catch(() => {
        if (isMounted) setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'loading' || settingsLoading) {
    return <div className="grid min-h-screen place-items-center bg-[#062f77] text-white">Loading...</div>;
  }

  if (status === 'error') {
    return <div className="grid min-h-screen place-items-center bg-[#062f77] px-4 text-center text-white">Unable to load home content from the API.</div>;
  }

  return (
    <>
      <Hero hero={home?.hero} />
      <StatisticsSection statistics={home?.statistics} />
      <AboutClinic about={home?.aboutPreview} />
      <ServicesSection services={services} />
      <WhyChooseUs whyChooseUs={home?.whyChooseUs} />
      <TreatmentProcess process={home?.treatmentProcess} />
      <TestimonialsSection testimonials={testimonials} />
      <GalleryPreview gallery={galleryPreview} />
      <FaqSection faqs={faqs} />
      <ContactSection contact={contact} settings={settings} />
    </>
  );
};

export default Home;
