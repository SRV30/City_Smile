import { useEffect, useState } from 'react';
import AboutClinic from '../components/home/AboutClinic';
import Hero from '../components/home/Hero';
import StatisticsSection from '../components/home/StatisticsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { getHome } from '../services/home.service';

const Home = () => {
  const [home, setHome] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    getHome()
      .then((response) => {
        if (isMounted) {
          setHome(response.data);
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

  if (status === 'loading') {
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
      <WhyChooseUs whyChooseUs={home?.whyChooseUs} />
      <section id="services" className="scroll-mt-28 bg-blue-50 py-20"><div className="container"><p className="text-sm font-bold uppercase text-blue-600">Our Services</p><h2 className="mt-2 text-3xl font-extrabold">Comprehensive Dental Solutions</h2></div></section>
      <section id="testimonials" className="container scroll-mt-28 py-20"><p className="text-sm font-bold uppercase text-blue-600">Patient Testimonials</p><h2 className="mt-2 text-3xl font-extrabold">What Our Patients Say</h2></section>
      <section id="gallery" className="scroll-mt-28 bg-blue-50 py-20"><div className="container"><p className="text-sm font-bold uppercase text-blue-600">Our Gallery</p><h2 className="mt-2 text-3xl font-extrabold">Moments of Healthy Smiles</h2></div></section>
      <section id="contact" className="container scroll-mt-28 py-20"><p className="text-sm font-bold uppercase text-blue-600">Contact Us</p><h2 className="mt-2 text-3xl font-extrabold">We are here to help you</h2></section>
      <section id="appointment" className="scroll-mt-28 bg-[#062f77] py-20 text-white"><div className="container"><p className="text-sm font-bold uppercase text-blue-200">Book Appointment</p><h2 className="mt-2 text-3xl font-extrabold">Get in Touch Today!</h2></div></section>
    </>
  );
};

export default Home;
