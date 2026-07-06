const formatDate = (value) => value ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value)) : 'Certification';

const CertificateCard = ({ certificate }) => (
  <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
    <img src={certificate.image} alt={certificate.title} className="h-44 w-full object-cover" loading="lazy" />
    <div className="p-5">
      <h3 className="font-extrabold text-slate-950">{certificate.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{certificate.issuingOrganization}</p>
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-blue-600">{formatDate(certificate.issueDate)}</p>
    </div>
  </article>
);

export default CertificateCard;
