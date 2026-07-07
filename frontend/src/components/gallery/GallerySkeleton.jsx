const GallerySkeleton = ({ count = 8, className = "" }) => {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="aspect-[4/3] animate-pulse rounded-xl bg-gray-200"
        >
          <div className="h-full w-full rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton;
