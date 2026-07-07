import { Link } from "react-router-dom";
import { Button, Card, SectionTitle, StatCard } from "../components/UI";
import useAuth from "../hooks/useAuth";
import { useSettings } from "../context/SettingsContext";

export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const { settings } = useSettings();

  const cards = [
    { value: "12", label: "Appointments" },
    { value: "24", label: "Messages" },
    { value: "9", label: "Services" },
    { value: "36", label: "Gallery Images" },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-[#0b3f9a] p-6 text-white">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-100">
          Welcome Back
        </p>
        <h2 className="mt-2 text-3xl font-extrabold">Dr. Aditya Shivi</h2>
        <p className="mt-2 text-sm text-blue-50">
          {settings.clinicName} — {settings.address}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            as={Link}
            to="/gallery"
            variant="secondary"
            className="!bg-white !text-blue-700"
          >
            View Gallery
          </Button>
          <Button
            variant="secondary"
            onClick={logout}
            className="border-white/20 !bg-transparent !text-white hover:!bg-white/10"
          >
            Logout
          </Button>
        </div>
      </Card>

      <SectionTitle
        eyebrow="Overview"
        title="Quick Dashboard Stats"
        description="This is the dashboard foundation. CMS pages will be connected in the next phase."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item, index) => (
          <StatCard
            key={index}
            icon={["📅", "✉", "🦷", "🖼"][index]}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <p className="text-sm font-bold text-slate-900">Current Admin</p>
          <p className="mt-3 text-sm text-slate-600">{admin?.name}</p>
          <p className="text-sm text-slate-600">{admin?.email}</p>
          <p className="text-sm text-slate-600">{admin?.role}</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm font-bold text-slate-900">Next Phase</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600">
            <li>Homepage CMS</li>
            <li>Doctor CMS</li>
            <li>Gallery CMS</li>
            <li>Services CMS</li>
            <li>Testimonials, FAQ, Settings</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
