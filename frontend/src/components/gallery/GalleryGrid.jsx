const GalleryGrid = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ${className}`}>
      {children}
    </div>
  );
};

export default GalleryGrid;
