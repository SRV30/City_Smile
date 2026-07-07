import { useEffect, useState } from "react";
import { fetchHome, updateHome } from "../../services/content.service";
import {
  Button,
  Card,
  Input,
  SectionTitle,
  Loader,
  Textarea,
} from "../../components/UI";
import toast from "react-hot-toast";

export default function HomepageCMS() {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchHome();
        setHome(data);
      } catch (err) {
        toast.error("Failed to load homepage data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateHome(home);
      toast.success("Homepage updated successfully");
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!home) return <div>Failed to load homepage data.</div>;

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="CMS" title="Homepage Management" />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900">Hero Section</h3>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Eyebrow</label>
                <Input
                    value={home.hero?.eyebrow || ""}
                    onChange={(e) => setHome({ ...home, hero: { ...home.hero, eyebrow: e.target.value } })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</label>
                <Input
                    value={home.hero?.title || ""}
                    onChange={(e) => setHome({ ...home, hero: { ...home.hero, title: e.target.value } })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
                <Textarea
                    value={home.hero?.description || ""}
                    onChange={(e) => setHome({ ...home, hero: { ...home.hero, description: e.target.value } })}
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary CTA</label>
                    <Input
                        value={home.hero?.primaryCta || ""}
                        onChange={(e) => setHome({ ...home, hero: { ...home.hero, primaryCta: e.target.value } })}
                    />
                </div>
                <div className="grid gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Secondary CTA</label>
                    <Input
                        value={home.hero?.secondaryCta || ""}
                        onChange={(e) => setHome({ ...home, hero: { ...home.hero, secondaryCta: e.target.value } })}
                    />
                </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900">About Section</h3>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Eyebrow</label>
                <Input
                    value={home.about?.eyebrow || ""}
                    onChange={(e) => setHome({ ...home, about: { ...home.about, eyebrow: e.target.value } })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Title</label>
                <Input
                    value={home.about?.title || ""}
                    onChange={(e) => setHome({ ...home, about: { ...home.about, title: e.target.value } })}
                />
            </div>
            <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
                <Textarea
                    rows={4}
                    value={home.about?.description || ""}
                    onChange={(e) => setHome({ ...home, about: { ...home.about, description: e.target.value } })}
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
