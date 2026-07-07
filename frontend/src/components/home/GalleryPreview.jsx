import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGalleryImages } from '../../services/gallery.service';
import GalleryCard from '../gallery/GalleryCard';
import GallerySkeleton from '../gallery/GallerySkeleton';
import GalleryLightbox from '../gallery/GalleryLightbox';

const GalleryPreview = ({ gallery: staticGallery }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      try {
        setLoading(true);
        const response = await getGalleryImages({ featured: true, limit: 6 });
        setImages(response.data.images);
      } catch (err) {
        console.error('Error fetching featured gallery images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedImages();
  }, []);

  const openLightbox = (image) => {
    const index = images.findIndex(img => img._id === image._id);
    setLightbox({ isOpen: true, index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, index: 0 });
  };

  const nextImage = () => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + 1) % images.length
    }));
  };

  const prevImage = () => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index - 1 + images.length) % images.length
    }));
  };

  if (!loading && images.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-28 py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            {staticGallery?.eyebrow || 'Our Gallery'}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {staticGallery?.heading || 'Moments of Healthy Smiles'}
          </h2>
        </div>

        {loading ? (
          <GallerySkeleton count={6} className="lg:grid-cols-6" />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {images.map((image) => (
              <GalleryCard key={image._id} image={image} onClick={openLightbox} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-200 active:scale-95"
          >
            {staticGallery?.ctaLabel || 'View Full Gallery'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <GalleryLightbox
          images={images}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
};

export default GalleryPreview;
