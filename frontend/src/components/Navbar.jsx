import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 py-4 text-white">
      <div className="container">
        <div className="flex items-center justify-between rounded-2xl bg-[#062f77]/80 px-4 py-3 shadow-2xl shadow-blue-950/20 backdrop-blur-xl lg:bg-transparent lg:shadow-none">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img src={logo} alt="City Smile Dental Clinic" className="h-12 w-auto" />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-blue-200">
                {item.label}
              </a>
            ))}
          </div>

          <a href="#appointment" className="hidden rounded-lg bg-blue-500 px-6 py-3 text-sm font-bold shadow-lg shadow-blue-950/20 transition hover:bg-blue-400 lg:inline-flex">
            Book Appointment
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-2xl lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? '×' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 rounded-2xl bg-[#062f77] p-4 shadow-2xl lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu} className="rounded-xl px-4 py-3 font-semibold hover:bg-white/10">
                  {item.label}
                </a>
              ))}
              <a href="#appointment" onClick={closeMenu} className="mt-2 rounded-xl bg-blue-500 px-4 py-3 text-center font-bold">
                Book Appointment
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
