import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white py-4 shadow-sm ring-1 ring-slate-100 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img
              src={logo}
              alt="City Smile Dental & Implant Clinic"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold lg:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`transition-colors duration-300 hover:text-blue-600 ${
                    isActive ? "text-blue-600" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <a
            href="#appointment"
            className="hidden rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/40 lg:inline-flex"
          >
            Book Appointment
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-xl text-slate-700 transition-colors hover:bg-slate-50 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {isOpen && (
          <div className="absolute left-4 right-4 top-full mt-2 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-100 lg:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                      isActive ? "bg-blue-50 text-blue-600" : "text-slate-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="#appointment"
                onClick={closeMenu}
                className="mt-4 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-700"
              >
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
