import { useEffect, useState } from "react";
import { fetchTestimonials } from "../../services/content.service";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
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

export default function TestimonialsCMS() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    patientName: "",
    treatment: "",
    quote: "",
    rating: 5,
    isActive: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await fetchTestimonials();
      setTestimonials(data);
    } catch (err) {
      toast.error("Failed to fetch testimonials");
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
        await updateTestimonial(editingItem._id, form);
        toast.success("Testimonial updated");
      } else {
        await createTestimonial(form);
        toast.success("Testimonial created");
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      toast.success("Testimonial deleted");
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      patientName: item.patientName,
      treatment: item.treatment,
      quote: item.quote,
      rating: item.rating,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="CMS" title="Testimonials Management" />
        <Button
          variant="primary"
          onClick={() => {
            setEditingItem(null);
            setForm({
              patientName: "",
              treatment: "",
              quote: "",
              rating: 5,
              isActive: true,
            });
            setShowModal(true);
          }}
        >
          Add Testimonial
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item._id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                    <h4 className="font-bold text-slate-900">{item.patientName}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{item.treatment}</p>
                </div>
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
              <p className="mt-3 text-xs italic leading-5 text-slate-600">
                "{item.quote}"
              </p>
              <div className="mt-3 flex gap-1 text-amber-500">
                {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i}>★</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-8">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {editingItem ? "Edit Testimonial" : "Add Testimonial"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Patient Name
                </label>
                <Input
                  required
                  value={form.patientName}
                  onChange={(e) =>
                    setForm({ ...form, patientName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Treatment
                </label>
                <Input
                  value={form.treatment}
                  onChange={(e) =>
                    setForm({ ...form, treatment: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quote
                </label>
                <Textarea
                  required
                  rows={4}
                  value={form.quote}
                  onChange={(e) =>
                    setForm({ ...form, quote: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Rating (1-5)
                </label>
                <select
                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-blue-600 focus:outline-none"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                >
                    {[1, 2, 3, 4, 5].map(v => <option key={v} value={v}>{v} Stars</option>)}
                </select>
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
