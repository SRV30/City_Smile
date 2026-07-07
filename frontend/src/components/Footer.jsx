import { Link } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import { IconBadge } from "./UI";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#071f4b] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="flex items-center gap-3">
            <IconBadge className="bg-white/10 text-white">C</IconBadge>
            <div>
              <p className="text-sm font-bold">{settings.clinicName}</p>
              <p className="text-xs text-blue-100">Dental & Implant Clinic</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">
            We are committed to providing the highest quality dental care in a
            comfortable and friendly environment.
          </p>
        </div>

        <div>
          <p className="text-sm font-bold">Quick Links</p>
          <div className="mt-4 grid gap-2 text-sm text-blue-100">
            {footerLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Contact</p>
          <div className="mt-4 grid gap-2 text-sm text-blue-100">
            <p>{settings.phone}</p>
            <p>{settings.clinicEmail}</p>
            <p>{settings.address}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold">Working Hours</p>
          <p className="mt-4 text-sm text-blue-100">{settings.workingHours}</p>
          <div className="mt-5 flex items-center gap-3 text-blue-100">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-2"
            >
              f
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-2"
            >
              ig
            </a>
            <a
              href={`https://wa.me/${settings.phone.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-3 py-2"
            >
              wa
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-blue-100">
        © 2026 City Smile Dental & Implant Clinic. All rights reserved.
      </div>
    </footer>
  );
}
