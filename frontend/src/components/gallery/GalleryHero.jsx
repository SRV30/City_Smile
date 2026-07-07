import { Link } from 'react-router-dom';

const GalleryHero = ({ title, subtitle }) => {
  return (
    <section className="bg-[#062f77] py-16 text-white md:py-24">
      <div className="container mx-auto px-4 text-center">
        <nav className="mb-4 flex items-center justify-center space-x-2 text-sm text-blue-200">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Gallery</span>
        </nav>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          {title || 'Moments of Healthy Smiles'}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-blue-100">
          {subtitle || 'Explore our clinic, treatments, and the happy smiles we\'ve helped create.'}
        </p>
      </div>
    </section>
  );
};

export default GalleryHero;
