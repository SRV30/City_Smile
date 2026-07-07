import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button, IconBadge } from "../components/UI";

const navItems = [
  { label: "Dashboard", path: "/admin", end: true },
  { label: "Homepage", path: "/admin/homepage" },
  { label: "Doctor", path: "/admin/doctor" },
  { label: "Services", path: "/admin/services" },
  { label: "Gallery", path: "/admin/gallery" },
  { label: "Testimonials", path: "/admin/testimonials" },
  { label: "FAQ", path: "/admin/faq" },
  { label: "Appointments", path: "/admin/appointments" },
  { label: "Messages", path: "/admin/messages" },
  { label: "Settings", path: "/admin/settings" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col border-r border-slate-200 bg-[#082f77] p-5 text-white">
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
          <p className="mt-2 text-sm font-bold truncate">{admin?.name || "Admin"}</p>
          <p className="text-[10px] text-blue-100 truncate">{admin?.email}</p>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto grid gap-1 pr-2 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-white text-blue-900 shadow-lg" : "text-white/80 hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {admin?.role === "SUPER_ADMIN" && (
            <NavLink
              to="/admin/admins"
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive ? "bg-white text-blue-900 shadow-lg" : "text-white/80 hover:bg-white/10"
                }`
              }
            >
              Staff Management
            </NavLink>
          )}
        </nav>

        <Button
          variant="secondary"
          className="mt-6 w-full justify-center border-white/20 !bg-transparent !text-white hover:!bg-white/10"
          onClick={logout}
        >
          Logout
        </Button>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">
              Admin Panel
            </p>
            <h1 className="text-lg font-extrabold">System Dashboard</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">{admin?.name}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{admin?.role}</p>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
