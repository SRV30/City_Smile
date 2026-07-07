import { useEffect, useState } from "react";
import { fetchDoctor, updateDoctor } from "../../services/content.service";
import {
  Button,
  Card,
  Input,
  SectionTitle,
  Loader,
  Textarea,
} from "../../components/UI";
import toast from "react-hot-toast";

export default function DoctorCMS() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchDoctor();
        setDoctor(data);
      } catch (err) {
        toast.error("Failed to load doctor data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoctor(doctor);
      toast.success("Doctor profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!doctor) return <div>Failed to load doctor data.</div>;

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="CMS" title="Doctor Profile Management" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900">General Information</h3>
          <div className="mt-4 grid gap-4">
             <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Name</label>
                <Input
                    value={doctor.name || ""}
                    onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Designation</label>
                <Input
                    value={doctor.designation || ""}
                    onChange={(e) => setDoctor({ ...doctor, designation: e.target.value })}
                />
            </div>
             <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Specialization</label>
                <Input
                    value={doctor.specialization || ""}
                    onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Experience</label>
                <Input
                    value={doctor.experience || ""}
                    onChange={(e) => setDoctor({ ...doctor, experience: e.target.value })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Bio</label>
                <Textarea
                    rows={6}
                    value={doctor.bio || ""}
                    onChange={(e) => setDoctor({ ...doctor, bio: e.target.value })}
                />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={saving}>
                {saving ? "Saving..." : "Save All Changes"}
            </Button>
        </div>
      </form>
    </div>
  );
}
