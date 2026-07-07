import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../components/Seo";
import { Button, Card, Input } from "../../components/UI";
import useAuth from "../../hooks/useAuth";
import { useSettings } from "../../context/SettingsContext";

export default function AdminLogin() {
  const { settings } = useSettings();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Admin Login | City Smile" description="Clinic admin login" />
      <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,rgba(11,63,154,0.12),transparent_30%),#eef5ff] px-4">
        <Card className="w-full max-w-md p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
            Admin Login
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            {settings.clinicName}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Login to manage the website.
          </p>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" variant="primary" className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}
        </Card>
      </div>
    </>
  );
}
