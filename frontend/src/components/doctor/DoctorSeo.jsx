import { useEffect } from 'react';

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes.identity).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', attributes.content);
};

const DoctorSeo = ({ doctor, settings }) => {
  useEffect(() => {
    if (!doctor) return undefined;
    const title = doctor.seo?.metaTitle || doctor.name;
    const description = doctor.seo?.metaDescription || doctor.shortDescription;
    document.title = title;
    upsertMeta('meta[name="description"]', { identity: { name: 'description' }, content: description });
    upsertMeta('meta[property="og:title"]', { identity: { property: 'og:title' }, content: title });
    upsertMeta('meta[property="og:description"]', { identity: { property: 'og:description' }, content: description });
    upsertMeta('meta[property="og:image"]', { identity: { property: 'og:image' }, content: doctor.profileImage });
    upsertMeta('meta[name="twitter:card"]', { identity: { name: 'twitter:card' }, content: 'summary_large_image' });

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: doctor.name,
      jobTitle: doctor.designation,
      image: doctor.profileImage,
      description,
      worksFor: settings ? { '@type': 'MedicalBusiness', name: settings.clinicName, telephone: settings.phone, address: settings.address } : undefined,
    });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [doctor, settings]);

  return null;
};

export default DoctorSeo;
