import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import TestimonialModal from "./modal/TestimonialModal";
import TestimonialSkeleton from "./TestimonialSkeleton";

const TestimonialsSection = ({
  testimonials = [],
  isLoading = false,
  isError = false,
  onRetry,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const autoPlayRef = useRef(null);

  const AUTO_PLAY_INTERVAL = 5000;
  const minSwipeDistance = 50;

  const [itemsPerPage, setItemsPerPage] = useState(3);

  const shuffledTestimonials = useMemo(() => {
    const array = [...testimonials];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }, [testimonials]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(shuffledTestimonials.length / itemsPerPage);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isPaused && totalPages > 1 && !isLoading && !isError) {
      autoPlayRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, totalPages, nextSlide, isLoading, isError]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  if (isLoading) {
    return (
      <section
        id="testimonials"
        className="container scroll-mt-28 py-10 lg:py-14"
      >
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">
              Patient Testimonials
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              What Our Patients Say
            </h2>
          </div>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <TestimonialSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section
        id="testimonials"
        className="container scroll-mt-28 py-10 lg:py-14"
      >
        <div className="rounded-3xl bg-red-50 p-10 text-center border border-red-100">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">
            Oops! Failed to load testimonials
          </h3>
          <p className="mt-2 text-slate-600">
            We encountered an error while fetching patient stories. Please try
            again.
          </p>
          <button
            onClick={onRetry}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
          >
            Retry Loading
          </button>
        </div>
      </section>
    );
  }

  if (shuffledTestimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="container scroll-mt-28 py-10 lg:py-14"
      >
        <div className="rounded-3xl bg-blue-50/50 p-10 text-center border border-blue-100/50">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-slate-900">
            No testimonials available yet
          </h3>
          <p className="mt-2 text-slate-600">
            Be the first patient to share your experience with us!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700"
          >
            Share Your Experience
          </button>
        </div>
        <TestimonialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="container scroll-mt-28 py-10 lg:py-14"
    >
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <div className="text-center sm:text-left">
          <p className="text-xs font-extrabold uppercase tracking-wide text-blue-600">
            Patient Testimonials
          </p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            What Our Patients Say
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 active:scale-95 mr-2"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Share Your Experience
          </button>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-90"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 active:scale-90"
              aria-label="Next testimonial"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative mt-8 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="grid w-full shrink-0 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {shuffledTestimonials
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((item, index) => (
                  <article
                    key={item._id || index}
                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 flex flex-col h-full"
                  >
                    <div className="text-4xl font-black leading-none text-blue-600">
                      “
                    </div>
                    <p className="mt-2 grow text-sm leading-7 text-slate-700">
                      {item.review}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-lg border border-blue-100">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-blue-600">
                            {item.name}
                          </p>
                          {item.service && (
                            <p className="text-xs text-slate-500">
                              {item.service}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-yellow-400">
                        {"★".repeat(item.rating)}
                      </span>
                    </div>
                  </article>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-8 bg-blue-600" : "w-2.5 bg-slate-300"
              }`}
              aria-label={`Go to testimonial page ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 active:scale-95 sm:hidden"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Share Your Experience
        </button>
      </div>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default TestimonialsSection;
