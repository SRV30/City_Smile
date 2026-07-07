import { useEffect, useState } from "react";
import { fetchFaqs } from "../../services/content.service";
import {
  createFaq,
  updateFaq,
  deleteFaq,
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

export default function FaqCMS() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    isActive: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await fetchFaqs();
      setFaqs(data);
    } catch (err) {
      toast.error("Failed to fetch FAQs");
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
        await updateFaq(editingItem._id, form);
        toast.success("FAQ updated");
      } else {
        await createFaq(form);
        toast.success("FAQ created");
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await deleteFaq(id);
      toast.success("FAQ deleted");
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      question: item.question,
      answer: item.answer,
      isActive: item.isActive,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="CMS" title="FAQ Management" />
        <Button
          variant="primary"
          onClick={() => {
            setEditingItem(null);
            setForm({
              question: "",
              answer: "",
              isActive: true,
            });
            setShowModal(true);
          }}
        >
          Add FAQ
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4">
          {faqs.map((item) => (
            <Card key={item._id} className="p-6">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-slate-900 pr-4">{item.question}</h4>
                <div className="flex gap-2 shrink-0">
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
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.answer}
              </p>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-2xl p-8">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {editingItem ? "Edit FAQ" : "Add FAQ"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Question
                </label>
                <Input
                  required
                  value={form.question}
                  onChange={(e) =>
                    setForm({ ...form, question: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Answer
                </label>
                <Textarea
                  required
                  rows={5}
                  value={form.answer}
                  onChange={(e) =>
                    setForm({ ...form, answer: e.target.value })
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
