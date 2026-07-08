import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import TestimonialManagement from "./Admin/TestimonialManagement";

const sidebarItems = [
  "Dashboard",
  "Admins",
  "Appointments",
  "Messages",
  "Gallery",
  "Doctor",
  "Homepage CMS",
  "Services",
  "Testimonials",
  "Reviews",
  "FAQs",
  "Website Settings",
  "Analytics",
  "Activity Logs",
  "Chatbot",
  "Profile",
  "Logout",
];

const stats = [
  { label: "Appointments Today", value: "28", change: "+12%" },
  { label: "Pending Messages", value: "14", change: "+4" },
  { label: "Gallery Images", value: "186", change: "+8 this week" },
  { label: "Active Services", value: "12", change: "Stable" },
];

const quickActions = [
  "Add New Admin",
  "Upload Gallery Images",
  "Update Doctor Info",
  "Add Service",
  "Review Testimonials",
  "Edit FAQ",
];

const recentAppointments = [
  {
    name: "Ritika Sharma",
    service: "Root Canal Treatment",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    name: "Aman Verma",
    service: "Dental Implant Consultation",
    time: "11:15 AM",
    status: "Pending",
  },
  {
    name: "Neha Singh",
    service: "Teeth Whitening",
    time: "01:40 PM",
    status: "Completed",
  },
];

const AdminDashboard = () => {
  const { admin, logout, refreshing, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#eef4ff] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-[290px] shrink-0 flex-col bg-[linear-gradient(180deg,#0f3d9d_0%,#082b73_100%)] px-5 py-6 text-white lg:flex">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
            <img src={logo} alt="City Smile" className="h-10 w-auto" />
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
              Logged in as
            </p>
            <h2 className="mt-2 text-lg font-bold">
              {admin?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
            </h2>
            <p className="mt-1 text-sm text-white/70">
              {admin?.email || "admin@citysmile.com"}
            </p>
          </div>

          <nav className="mt-6 flex-1 space-y-1 overflow-y-auto pr-1">
            {sidebarItems.map((item) => {
              const active = item === "Dashboard";
              const isLogout = item === "Logout";

              if (isLogout) {
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
                      •
                    </span>
                    {item}
                  </button>
                );
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveTab(item)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === item
                      ? "bg-white text-blue-700 shadow-lg shadow-black/10"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                      activeTab === item
                        ? "bg-blue-50 text-blue-600"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    •
                  </span>
                  {item}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 rounded-3xl bg-white/10 p-4">
            <p className="text-sm font-semibold">System Status</p>
            <div className="mt-3 h-2 rounded-full bg-white/15">
              <div className="h-2 w-[84%] rounded-full bg-emerald-400" />
            </div>
            <p className="mt-2 text-xs text-white/70">
              All services running smoothly
            </p>
          </div>
        </aside>

        <main className="flex-1">
          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {activeTab === "Testimonials" ? (
              <div className="rounded-[30px] bg-white p-6 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-8">
                <TestimonialManagement />
              </div>
            ) : (
            <div className="rounded-[30px] bg-[linear-gradient(135deg,#ffffff_0%,#f5f8ff_100%)] p-5 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
                    Admin Dashboard
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    Welcome back, {admin?.name || "Administrator"}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Manage your clinic website, update content, review
                    appointments, and keep the entire experience polished from
                    one dashboard.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700">
                    Add New Content
                  </button>
                  <button className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50">
                    View Live Site
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                  {admin?.role || "SUPER_ADMIN"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
                  Session{" "}
                  {refreshing
                    ? "Refreshing..."
                    : loading
                      ? "Loading..."
                      : "Active"}
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                    <div className="mt-3 flex items-end justify-between gap-3">
                      <h2 className="text-3xl font-extrabold text-slate-900">
                        {item.value}
                      </h2>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <div className="space-y-6">
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                        Quick Actions
                      </p>
                      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                        Manage site content
                      </h2>
                    </div>
                    <button className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                      See All
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        className="rounded-3xl border border-slate-100 bg-[#f8fbff] p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                          +
                        </div>
                        <p className="mt-4 text-sm font-bold text-slate-900">
                          {action}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Click to open the corresponding management section.
                        </p>
                      </button>
                    ))}
                  </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-2">
                  <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                          Appointments
                        </p>
                        <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                          Today&apos;s Schedule
                        </h2>
                      </div>
                      <button className="text-sm font-bold text-blue-700 hover:text-blue-800">
                        View All
                      </button>
                    </div>

                    <div className="mt-5 space-y-3">
                      {recentAppointments.map((item) => (
                        <div
                          key={`${item.name}-${item.time}`}
                          className="rounded-3xl border border-slate-100 bg-[#f8fbff] p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-bold text-slate-900">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-slate-500">
                                {item.service}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                item.status === "Confirmed"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : item.status === "Pending"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                            <span>Appointment Time</span>
                            <span className="font-semibold text-slate-700">
                              {item.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                        Website Summary
                      </p>
                      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                        Current system health
                      </h2>
                    </div>

                    <div className="mt-5 space-y-4">
                      {[
                        { label: "Homepage CMS", value: 92 },
                        { label: "Gallery Content", value: 88 },
                        { label: "Testimonials", value: 76 },
                        { label: "FAQs", value: 81 },
                      ].map((row) => (
                        <div key={row.label}>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-600">
                              {row.label}
                            </span>
                            <span className="font-bold text-slate-900">
                              {row.value}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-[linear-gradient(90deg,#2457e5_0%,#4d7cff_100%)]"
                              style={{ width: `${row.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-3xl bg-[linear-gradient(135deg,#2457e5_0%,#0f3d9d_100%)] p-5 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                        Live Status
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold">
                        All services are running normally
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-white/80">
                        No critical issues detected. Content updates and
                        appointment flow are functioning as expected.
                      </p>
                    </div>
                  </section>
                </div>
              </div>

              <div className="space-y-6">
                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                    Profile
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-extrabold text-blue-700">
                      {admin?.name?.[0] || "S"}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {admin?.name || "Super Admin"}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {admin?.email || "admin@citysmile.com"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-[#f8fbff] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Role
                      </p>
                      <p className="mt-2 font-bold text-slate-900">
                        {admin?.role || "Super Admin"}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-[#f8fbff] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Status
                      </p>
                      <p className="mt-2 font-bold text-emerald-600">Active</p>
                    </div>
                  </div>

                  <button className="mt-5 w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700">
                    Edit Profile
                  </button>
                </section>

                <section className="rounded-[30px] bg-white p-5 shadow-[0_18px_60px_rgba(15,61,157,0.08)] sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
                    Activity
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                    Latest updates
                  </h2>

                  <div className="mt-5 space-y-4">
                    {[
                      "Gallery images uploaded successfully.",
                      "New appointment request received.",
                      "Homepage hero section updated.",
                      "FAQ entry approved by admin.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-3xl border border-slate-100 bg-[#f8fbff] p-4"
                      >
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                          ✓
                        </span>
                        <p className="text-sm leading-6 text-slate-600">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
