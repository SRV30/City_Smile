import { Link } from 'react-router-dom';

const GalleryPreview = ({ gallery }) => {
  if (!gallery?.images?.length) return null;

  return (
    <section id="gallery" className="container scroll-mt-28 py-10 lg:py-14">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">{gallery.eyebrow}</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{gallery.heading}</h2>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {gallery.images.slice(0, 4).map((image) => (
          <img key={image.title} src={image.image} alt={image.alt} className="h-32 w-full rounded-xl object-cover shadow-sm sm:h-40" />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to={gallery.ctaHref} className="inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-950/10">
          {gallery.ctaLabel}<span aria-hidden="true">⌘</span>
        </Link>
      </div>
    </section>
  );
};

export default GalleryPreview;
