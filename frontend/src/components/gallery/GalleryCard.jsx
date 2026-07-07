const GalleryCard = ({ image, onClick }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer shadow-sm transition-all hover:shadow-md aspect-[4/3]"
      onClick={() => onClick(image)}
    >
      <img
        src={image.image.replace('/upload/', '/upload/f_auto,q_auto,w_600/')}
        alt={image.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-semibold text-white">{image.title}</h3>
        {image.caption && (
          <p className="mt-1 text-sm text-gray-200 line-clamp-2">{image.caption}</p>
        )}
        <div className="mt-2 flex items-center text-xs font-medium text-white">
          <span className="rounded-full bg-blue-600 px-2.5 py-0.5">{image.category}</span>
        </div>
      </div>
      <div className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
    </div>
  );
};

export default GalleryCard;
