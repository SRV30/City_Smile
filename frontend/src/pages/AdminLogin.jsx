import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const StatCard = ({ label, value, subtext }) => (
  <div className="rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-md shadow-lg shadow-blue-950/20">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="mt-1 text-sm font-medium text-white/85">{label}</div>
    <div className="mt-1 text-xs text-white/60">{subtext}</div>
  </div>
);

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearAuthError, loading, admin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (admin) {
      navigate("/admin", { replace: true });
    }
  }, [admin, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) clearAuthError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate(from, { replace: true });
    } catch (_err) {
      // Error already stored in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const isBusy = submitting || loading;
  const canSubmit = formData.email.trim() && formData.password.trim();

  return (
    <div className="min-h-screen bg-[#eef4ff]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative flex items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_#1e5cff_0%,_#0f3d9d_45%,_#06235f_100%)] px-6 py-10 text-white lg:px-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-10 top-12 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute bottom-16 right-12 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-xl">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="City Smile Dental & Implant Clinic"
                className="h-12 w-auto"
              />
            </Link>

            <div className="mt-14 max-w-lg">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                Secure Admin Access
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Manage the clinic with confidence.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-white/75">
                Login to manage appointments, gallery uploads, services, FAQs,
                testimonials, doctor information, and website settings from one
                secure dashboard.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <StatCard
                  label="Protected Access"
                  value="100%"
                  subtext="JWT + cookies"
                />
                <StatCard
                  label="Fast Workflow"
                  value="1 Place"
                  subtext="Everything in sync"
                />
                <StatCard
                  label="Admin Roles"
                  value="2"
                  subtext="Super Admin / Admin"
                />
              </div>

              <div className="mt-10 grid gap-3 text-sm text-white/80">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    ✓
                  </span>
                  Manage clinic content without touching code.
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    ✓
                  </span>
                  Secure login with HTTP-only cookie sessions.
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    ✓
                  </span>
                  Role-based control for Super Admin and Admin.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <div className="rounded-[28px] border border-white bg-white p-6 shadow-[0_24px_80px_rgba(15,61,157,0.12)] sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
                    Admin Portal
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                    Welcome back
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Sign in to continue to your dashboard.
                  </p>
                </div>
                <div className="hidden rounded-2xl bg-blue-50 p-3 sm:block">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M12 2a5 5 0 0 1 5 5v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h1V7a5 5 0 0 1 5-5Z" />
                      <path d="M9 10V7a3 3 0 1 1 6 0v3" />
                    </svg>
                  </div>
                </div>
              </div>

              {error?.message && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p className="font-semibold">{error.message}</p>
                  {Array.isArray(error.errors) && error.errors.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-red-600">
                      {error.errors.map((item, index) => (
                        <li key={`${item.field || "error"}-${index}`}>
                          {item.field ? `${item.field}: ` : ""}
                          {item.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@citysmile.com"
                    autoComplete="email"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isBusy || !canSubmit}
                  className="flex w-full items-center justify-center rounded-2xl bg-[#2457e5] px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:bg-[#1e4ed1] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isBusy ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-8 rounded-2xl bg-blue-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Secure access only
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Public registration is disabled. Only authorized clinic staff
                  can access this portal.
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              © 2026 City Smile Dental & Implant Clinic. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
