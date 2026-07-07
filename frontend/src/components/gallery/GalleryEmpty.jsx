const GalleryEmpty = ({ message = 'No images found in this category.', onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 rounded-full bg-gray-100 p-6 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">No Images Available</h3>
      <p className="mb-8 max-w-xs text-gray-500">
        {message}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="rounded-full bg-blue-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          View All Gallery
        </button>
      )}
    </div>
  );
};

export default GalleryEmpty;
