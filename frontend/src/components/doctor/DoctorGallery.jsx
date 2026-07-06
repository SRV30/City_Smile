const DoctorGallery = ({ images = [] }) => {
  if (!images.length) return (
    <section className="container py-12 lg:py-16">
      <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm ring-1 ring-slate-100">Gallery images will appear here once added from the dashboard.</div>
    </section>
  );
  return (
    <section className="container py-12 lg:py-16">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">Gallery</p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-950">Doctor Gallery</h2>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {images.map((item) => (
          <figure key={`${item.publicId}-${item.caption}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
            <img src={item.image} alt={item.caption} loading="lazy" className="h-40 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-56" />
            <figcaption className="p-4 text-sm font-bold text-slate-700">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default DoctorGallery;
