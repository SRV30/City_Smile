import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useSettings } from "../context/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#062f77] py-10 text-white lg:rounded-t-3xl">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <img
            src={logo}
            alt="City Smile Dental & Implant Clinic"
            className="h-12 w-auto"
          />
          <p className="mt-5 text-sm leading-7 text-blue-50">
            We are committed to providing the highest quality dental care in a
            comfortable and friendly environment.
          </p>
          <div className="mt-5 flex gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
              f
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
              ◎
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
              ☏
            </span>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-blue-50">
            <a href="#home">Home</a>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Our Services</h3>
          <div className="mt-4 grid gap-2 text-sm text-blue-50">
            <Link to="/services/dental-implant">Dental Implants</Link>
            <Link to="/services/root-canal-treatment">
              Root Canal Treatment
            </Link>
            <Link to="/services/teeth-extraction">Teeth Extraction</Link>
            <Link to="/services/crown-bridges">Crown & Bridges</Link>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold">Contact Info</h3>
          <div className="mt-4 grid gap-3 text-sm text-blue-50">
            <p>☎ {settings?.phone}</p>
            <p>✉ {settings?.clinicEmail}</p>
            <p>⌖ {settings?.address}</p>
          </div>
        </div>
      </div>
      <div className="container mt-8 border-t border-white/10 pt-5 text-center text-xs text-blue-50 md:flex md:justify-between">
        <p>
          © 2026 {settings?.clinicName || "City Smile Dental & Implant Clinic"}.
          All Rights Reserved.
        </p>
        <p>Designed with ❤️ for Healthy Smiles</p>
      </div>
    </footer>
  );
};

export default Footer;
