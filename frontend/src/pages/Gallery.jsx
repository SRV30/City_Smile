import { useEffect, useMemo, useState } from "react";
import Seo from "../components/Seo";
import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  GalleryThumb,
  Loader,
  SectionTitle,
} from "../components/UI";
import { fetchGallery } from "../services/content.service";
import { fallbackGallery } from "../data/fallbackContent";

const categories = [
  "All",
  "Clinic",
  "Treatment",
  "Camp",
  "Certificates",
  "Events",
  "BeforeAfter",
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchGallery(
          active === "All" ? {} : { category: active },
        );
        setItems(Array.isArray(data) && data.length ? data : fallbackGallery);
      } catch (err) {
        setError(err.message || "Failed to load gallery");
        setItems(fallbackGallery);
      } finally {
        setLoading(false);
      }
    })();
  }, [active]);

  const filtered = useMemo(() => items, [items]);

  return (
    <>
      <Seo
        title="Gallery | City Smile Dental & Implant Clinic"
        description="Clinic photos, treatment photos, certificates, and more."
      />

      <section className="bg-[#0b3f9a] px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold">
            Gallery
          </span>
          <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">
            Moments of Healthy Smiles
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50">
            A visual look at the clinic environment, patient care, treatment
            rooms, and certificate highlights.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-10 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-700 shadow-sm hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="mt-8 grid place-items-center py-20">
              <Loader />
            </div>
          ) : error ? (
            <div className="mt-8">
              <ErrorState title="Gallery error" description={error} />
            </div>
          ) : filtered.length ? (
            <div className="mt-8 columns-1 gap-4 sm:columns-2 xl:columns-3">
              {filtered.map((item, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                  <GalleryThumb
                    image={item.image || item.url}
                    title={item.title || item.caption}
                    category={item.category}
                    onClick={() => setLightbox(item)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No gallery images found"
                description="Try another category or add images later from the admin dashboard."
              />
            </div>
          )}
        </div>
      </section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <Card
            className="max-w-5xl overflow-hidden p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image || lightbox.url}
              alt={lightbox.title}
              className="max-h-[80vh] w-full object-contain bg-black"
            />
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
                  {lightbox.category}
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {lightbox.title}
                </p>
              </div>
              <Button variant="secondary" onClick={() => setLightbox(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </>
  );
}
