import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import GalleryHero from '../components/gallery/GalleryHero';
import GalleryFilters from '../components/gallery/GalleryFilters';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryCard from '../components/gallery/GalleryCard';
import GallerySkeleton from '../components/gallery/GallerySkeleton';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import GalleryEmpty from '../components/gallery/GalleryEmpty';
import { getGalleryImages } from '../services/gallery.service';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });
  const [error, setError] = useState(null);

  const fetchImages = useCallback(async (category, pageNum, append = false) => {
    try {
      setLoading(true);
      const response = await getGalleryImages({
        category,
        page: pageNum,
        limit: 12
      });

      const newImages = response.data.images;
      setImages(prev => append ? [...prev, ...newImages] : newImages);
      setHasMore(response.data.pagination.page < response.data.pagination.pages);
      setError(null);
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError('Unable to load gallery images. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    fetchImages(activeCategory, 1, false);
  }, [activeCategory, fetchImages]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(activeCategory, nextPage, true);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

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

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>Gallery | City Smile Dental Clinic</title>
        <meta name="description" content="Explore our dental clinic, advanced treatments, community camps, and happy patient smiles. View our premium gallery of dental success stories." />
        <meta property="og:title" content="Gallery | City Smile Dental Clinic" />
        <meta property="og:description" content="Explore our dental clinic, advanced treatments, community camps, and happy patient smiles." />
        <meta name="twitter:title" content="Gallery | City Smile Dental Clinic" />
        <meta name="twitter:description" content="Explore our dental clinic, advanced treatments, community camps, and happy patient smiles." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "City Smile Dental Clinic Gallery",
            "description": "A collection of photos from City Smile Dental Clinic including treatments, camps, and clinic facilities.",
            "url": window.location.href
          })}
        </script>
      </Helmet>
      <GalleryHero />

      {/* Gallery Content */}
      <div className="container mx-auto px-4 pt-12">
        <GalleryFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {error ? (
          <GalleryEmpty message={error} onReset={() => setActiveCategory('All')} />
        ) : images.length === 0 && !loading ? (
          <GalleryEmpty onReset={() => setActiveCategory('All')} />
        ) : (
          <>
            <GalleryGrid>
              {images.map((image) => (
                <GalleryCard
                  key={image._id}
                  image={image}
                  onClick={openLightbox}
                />
              ))}
            </GalleryGrid>

            {loading && <div className="mt-8"><GallerySkeleton count={4} /></div>}

            {hasMore && !loading && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:scale-95 transition-all"
                >
                  Load More Images
                </button>
              </div>
            )}
          </>
        )}
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
    </main>
  );
};

export default Gallery;
