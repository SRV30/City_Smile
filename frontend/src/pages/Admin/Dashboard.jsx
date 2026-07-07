import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, SectionTitle, StatCard, Loader } from "../../components/UI";
import useAuth from "../../hooks/useAuth";
import { useSettings } from "../../context/SettingsContext";
import api from "../../services/api";

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const { settings } = useSettings();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
        try {
            const res = await api.get("/stats");
            setStats(res.data.data || res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    })();
  }, []);

  const cards = [
    { value: stats?.appointments || "0", label: "Appointments", icon: "📅" },
    { value: stats?.messages || "0", label: "Messages", icon: "✉" },
    { value: stats?.services || "0", label: "Services", icon: "🦷" },
    { value: stats?.gallery || "0", label: "Gallery Images", icon: "🖼" },
  ];

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <Card className="bg-[#0b3f9a] p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
             <span className="text-9xl">🦷</span>
        </div>
        <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-100 font-bold">
              Welcome Back
            </p>
            <h2 className="mt-2 text-4xl font-extrabold">{admin?.name}</h2>
            <p className="mt-2 text-sm text-blue-50 max-w-md">
              {settings.clinicName} Management System. You have full access to manage website content and patient records.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                as={Link}
                to="/admin/gallery"
                variant="secondary"
                className="!bg-white !text-blue-700"
              >
                Manage Gallery
              </Button>
              <Button
                variant="secondary"
                onClick={logout}
                className="border-white/20 !bg-transparent !text-white hover:!bg-white/10"
              >
                Logout Account
              </Button>
            </div>
        </div>
      </Card>

      <SectionTitle
        eyebrow="Overview"
        title="Quick Statistics"
        description="Real-time data from your clinic's website activity."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item, index) => (
          <StatCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-extrabold text-slate-900">Current Session</h3>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${admin?.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {admin?.role}
              </span>
           </div>
           <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-500 font-semibold">Logged in as</span>
                    <span className="text-sm text-slate-900 font-bold">{admin?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-500 font-semibold">Email Address</span>
                    <span className="text-sm text-slate-900 font-bold">{admin?.email}</span>
                </div>
                 <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-500 font-semibold">Account Status</span>
                    <span className="text-sm text-green-600 font-bold">Active</span>
                </div>
           </div>
        </Card>

        <Card className="p-8">
          <h3 className="font-extrabold text-slate-900 mb-6">System Health</h3>
           <div className="space-y-4">
                 <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-500 font-semibold">API Version</span>
                    <span className="text-sm text-slate-900 font-bold">1.0.0</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-500 font-semibold">Database</span>
                    <span className="text-sm text-green-600 font-bold">Connected</span>
                </div>
                 <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-sm text-slate-500 font-semibold">Staff Members</span>
                    <span className="text-sm text-slate-900 font-bold">{stats?.admins || "1"}</span>
                </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
