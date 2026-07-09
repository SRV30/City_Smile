import { useEffect, useState } from 'react';
import AboutClinic from '../components/home/AboutClinic';
import ContactSection from '../components/home/ContactSection';
import FaqSection from '../components/home/FaqSection';
import GalleryPreview from '../components/home/GalleryPreview';
import Hero from '../components/home/Hero';
import ServicesSection from '../pages/ServicesSection';
import StatisticsSection from '../components/home/StatisticsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TreatmentProcess from '../components/home/TreatmentProcess';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { useSettings } from '../context/SettingsContext';
import { getHome } from '../services/home.service';
import { getContactContent, getFaqs, getGalleryPreview } from '../services/publicContent.service';
import { getServices } from '../services/services.service';
import { getApprovedTestimonials } from '../services/testimonial.service';

const Home = () => {
  const [home, setHome] = useState(null);
  const [status, setStatus] = useState('loading');
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState(null);
  const [contact, setContact] = useState(null);
  const { settings, loading: settingsLoading } = useSettings();

  const fetchTestimonials = async () => {
    setTestimonialsLoading(true);
    setTestimonialsError(false);
    try {
      const response = await getApprovedTestimonials();
      setTestimonials(response.data || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      setTestimonialsError(true);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getHome(),
      getServices(),
      fetchTestimonials(),
      getFaqs(),
      getGalleryPreview(),
      getContactContent(),
    ])
      .then(([homeResponse, servicesResponse, _testimonialsResult, faqsResponse, galleryResponse, contactResponse]) => {
        if (isMounted) {
          setHome(homeResponse.data);
          setServices(servicesResponse.data);
          setFaqs(faqsResponse.data);
          setGalleryPreview(galleryResponse.data);
          setContact(contactResponse.data);
          setStatus('success');
        }
      })
      .catch((err) => {
        console.error('Failed to fetch home content:', err);
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
      <TestimonialsSection
        testimonials={testimonials}
        isLoading={testimonialsLoading}
        isError={testimonialsError}
        onRetry={fetchTestimonials}
      />
      <GalleryPreview gallery={galleryPreview} />
      <FaqSection faqs={faqs} />
      <ContactSection contact={contact} settings={settings} />
    </>
  );
};

export default Home;
