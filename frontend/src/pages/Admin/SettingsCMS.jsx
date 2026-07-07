import { useEffect, useState } from "react";
import { fetchSettings, updateSettings } from "../../services/content.service";
import {
  Button,
  Card,
  Input,
  SectionTitle,
  Loader,
  Textarea,
} from "../../components/UI";
import toast from "react-hot-toast";

export default function SettingsCMS() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (err) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSettings(settings);
      toast.success("Settings updated successfully");
      // Optional: window.location.reload() to refresh SettingsContext
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!settings) return <div>Failed to load settings.</div>;

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="System" title="Clinic Settings" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900">Clinic Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinic Name</label>
                <Input
                    value={settings.clinicName || ""}
                    onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                <Input
                    value={settings.phone || ""}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinic Email</label>
                <Input
                    value={settings.clinicEmail || ""}
                    onChange={(e) => setSettings({ ...settings, clinicEmail: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Working Hours</label>
                <Input
                    value={settings.workingHours || ""}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                />
            </div>
            <div className="md:col-span-2 grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Address</label>
                <Textarea
                    value={settings.address || ""}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
            </div>
          </div>
        </Card>

        <Card className="p-6">
           <h3 className="text-lg font-bold text-slate-900">Maps & Integration</h3>
           <div className="mt-4 grid gap-4">
                <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Google Maps Embed URL</label>
                    <Textarea
                        rows={3}
                        value={settings.googleMapEmbed || ""}
                        onChange={(e) => setSettings({ ...settings, googleMapEmbed: e.target.value })}
                    />
                </div>
           </div>
        </Card>

        <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving..." : "Save Settings"}
            </Button>
        </div>
      </form>
    </div>
  );
}
