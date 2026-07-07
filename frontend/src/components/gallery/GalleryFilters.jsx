const GalleryFilters = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    'All',
    'Clinic',
    'Treatment',
    'Camp',
    'Certificates',
    'Events',
    'BeforeAfter',
  ];

  const formatLabel = (cat) => {
    if (cat === 'BeforeAfter') return 'Before & After';
    return cat;
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          {formatLabel(category)}
        </button>
      ))}
    </div>
  );
};

export default GalleryFilters;
