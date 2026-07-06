import { useEffect, useState } from 'react';
import AchievementTimeline from '../components/doctor/AchievementTimeline';
import CertificateCard from '../components/doctor/CertificateCard';
import DoctorAbout from '../components/doctor/DoctorAbout';
import DoctorCTA from '../components/doctor/DoctorCTA';
import DoctorGallery from '../components/doctor/DoctorGallery';
import DoctorHero from '../components/doctor/DoctorHero';
import DoctorSeo from '../components/doctor/DoctorSeo';
import EmptyDoctorSection from '../components/doctor/EmptyDoctorSection';
import QualificationCard from '../components/doctor/QualificationCard';
import SkillCard from '../components/doctor/SkillCard';
import { useSettings } from '../context/SettingsContext';
import { getDoctor } from '../services/doctor.service';

const SectionHeading = ({ eyebrow, title }) => (
  <div className="text-center">
    <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">{eyebrow}</p>
    <h2 className="mt-3 text-3xl font-extrabold text-slate-950">{title}</h2>
  </div>
);

const Doctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [status, setStatus] = useState('loading');
  const { settings, loading: settingsLoading } = useSettings();

  useEffect(() => {
    let isMounted = true;
    getDoctor()
      .then((response) => {
        if (isMounted) {
          setDoctor(response.data);
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
    return <div className="grid min-h-screen place-items-center bg-[#062f77] text-white">Loading doctor profile...</div>;
  }

  if (status === 'error') {
    return <div className="grid min-h-screen place-items-center bg-[#062f77] px-4 text-center text-white">Unable to load doctor profile from the API.</div>;
  }

  if (!doctor?.enabled) {
    return <div className="container py-32 text-center"><h1 className="text-3xl font-extrabold">Doctor profile is currently unavailable.</h1></div>;
  }

  return (
    <>
      <DoctorSeo doctor={doctor} settings={settings} />
      <DoctorHero doctor={doctor} phone={settings?.phone} />
      <DoctorAbout doctor={doctor} />

      <section className="bg-blue-50/70 py-12 lg:py-16">
        <div className="container">
          <SectionHeading eyebrow="Qualifications" title="Education & Training" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {doctor.qualifications?.map((qualification, index) => <QualificationCard key={qualification} qualification={qualification} index={index} />)}
          </div>
        </div>
      </section>

      <section className="container py-12 lg:py-16">
        <SectionHeading eyebrow="Certificates" title="Professional Certifications" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {doctor.certificates?.length ? doctor.certificates.map((certificate) => <CertificateCard key={`${certificate.title}-${certificate.publicId}`} certificate={certificate} />) : <div className="sm:col-span-2 lg:col-span-3"><EmptyDoctorSection message="Certificates will appear here once added from the dashboard." /></div>}
        </div>
      </section>

      <section className="bg-blue-50/70 py-12 lg:py-16">
        <div className="container">
          <SectionHeading eyebrow="Professional Skills" title="Clinical Expertise" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {doctor.professionalSkills?.map((skill) => <SkillCard key={skill} skill={skill} />)}
          </div>
        </div>
      </section>

      <AchievementTimeline achievements={doctor.achievements} />
      <DoctorGallery images={doctor.gallery} />
      <DoctorCTA phone={settings?.phone} />
    </>
  );
};

export default Doctor;
