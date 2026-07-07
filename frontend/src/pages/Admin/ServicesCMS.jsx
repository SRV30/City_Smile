import { useEffect, useState } from "react";
import { fetchServices } from "../../services/content.service";
import {
  createService,
  updateService,
  deleteService,
} from "../../services/cms.service";
import {
  Button,
  Card,
  Input,
  SectionTitle,
  Loader,
  Textarea,
} from "../../components/UI";
import toast from "react-hot-toast";

export default function ServicesCMS() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "🦷",
    fullDescription: "",
    isActive: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch (err) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateService(editingItem._id, form);
        toast.success("Service updated");
      } else {
        await createService(form);
        toast.success("Service created");
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      icon: item.icon,
      fullDescription: item.fullDescription,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="CMS" title="Services Management" />
        <Button
          variant="primary"
          onClick={() => {
            setEditingItem(null);
            setForm({
              title: "",
              description: "",
              icon: "🦷",
              fullDescription: "",
              isActive: true,
            });
            setShowModal(true);
          }}
        >
          Add Service
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <Card key={item._id} className="p-6">
              <div className="flex items-start justify-between">
                <span className="text-3xl">{item.icon}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <h4 className="mt-3 font-bold text-slate-900">{item.title}</h4>
              <p className="mt-2 text-xs leading-5 text-slate-500 line-clamp-2">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-2xl p-8">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {editingItem ? "Edit Service" : "Add Service"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Title
                  </label>
                  <Input
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Icon (Emoji)
                  </label>
                  <Input
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Short Description
                </label>
                <Textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Full Description
                </label>
                <Textarea
                  rows={5}
                  value={form.fullDescription}
                  onChange={(e) =>
                    setForm({ ...form, fullDescription: e.target.value })
                  }
                />
              </div>

              <div className="mt-2 flex gap-3">
                <Button type="submit" variant="primary" className="flex-1">
                  {editingItem ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
