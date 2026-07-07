import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button, Card, IconBadge } from "../components/UI";

const navItems = [
  "Dashboard",
  "Homepage",
  "Doctor",
  "Services",
  "Gallery",
  "Testimonials",
  "FAQ",
  "Appointments",
  "Messages",
  "Settings",
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-200 bg-[#082f77] p-5 text-white">
        <div className="flex items-center gap-3">
          <IconBadge className="bg-white/10 text-white">C</IconBadge>
          <div>
            <p className="text-sm font-bold">City Smile</p>
            <p className="text-xs text-blue-100">Dental & Implant Clinic</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
            Logged in as
          </p>
          <p className="mt-2 text-sm font-bold">{admin?.name || "Admin"}</p>
          <p className="text-xs text-blue-100">{admin?.email}</p>
        </div>

        <nav className="mt-6 grid gap-2">
          {navItems.map((item) => (
            <div
              key={item}
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              {item}
            </div>
          ))}
        </nav>

        <Button
          variant="secondary"
          className="mt-6 w-full justify-center border-white/20! bg-transparent! text-white! hover:!bg-white/10"
          onClick={logout}
        >
          Logout
        </Button>
      </aside>

      <section className="min-w-0">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
              Admin Panel
            </p>
            <h1 className="text-lg font-extrabold">Dashboard</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">{admin?.name}</p>
            <p className="text-xs text-slate-500">{admin?.role}</p>
          </div>
        </header>

        <div className="p-5">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
