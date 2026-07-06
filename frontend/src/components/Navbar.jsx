import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">City Smile</Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/doctor" className="hover:text-primary">Doctor</Link>
          <Link to="/gallery" className="hover:text-primary">Gallery</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
