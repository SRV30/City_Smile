import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, IconBadge } from "./UI";
import { useSettings } from "../context/SettingsContext";
import useAuth from "../hooks/useAuth";

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { settings } = useSettings();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleAnchor = (href) => {
    setOpen(false);
    if (href.includes("#") && !isHomePage) {
      window.location.href = href;
      return;
    }
    const id = href.split("#")[1];
    if (!id) return;
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3 md:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/20 bg-[#0b3f9a]/90 px-4 py-3 text-white shadow-[0_18px_50px_rgba(2,8,23,0.18)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt={settings.clinicName}
                className="h-11 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold leading-none">
                  {settings.clinicName}
                </p>
                <p className="text-[11px] tracking-[0.18em] text-blue-100">
                  DENTAL CLINIC
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleAnchor(item.href)}
                  className="transition hover:text-blue-200"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Button
                  as={Link}
                  to="/admin"
                  variant="secondary"
                  className="hidden md:inline-flex"
                >
                  Admin Panel
                </Button>
              ) : null}

              <Button
                as="a"
                href="#contact"
                variant="secondary"
                className="hidden md:inline-flex"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchor("/#contact");
                }}
              >
                Book Appointment
              </Button>

              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/10 text-2xl lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {open ? "×" : "☰"}
              </button>
            </div>
          </div>

          {open ? (
            <div className="mt-4 grid gap-2 rounded-[20px] bg-[#082f77] p-3 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleAnchor(item.href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold hover:bg-white/10"
                >
                  {item.label}
                </button>
              ))}
              {isAuthenticated ? (
                <Link
                  to="/admin"
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-[#082f77]"
                >
                  Admin Panel
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => handleAnchor("/#contact")}
                className="rounded-2xl bg-blue-500 px-4 py-3 text-sm font-bold text-white"
              >
                Book Appointment
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
