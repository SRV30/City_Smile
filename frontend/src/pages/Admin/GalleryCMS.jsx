import { useEffect, useState } from "react";
import { fetchGallery } from "../../services/content.service";
import {
  uploadGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} from "../../services/gallery.service";
import {
  Button,
  Card,
  Input,
  SectionTitle,
  Loader,
  GalleryThumb,
} from "../../components/UI";
import toast from "react-hot-toast";

const categories = [
  "Clinic",
  "Treatment",
  "Camp",
  "Certificates",
  "Events",
  "BeforeAfter",
  "Others",
];

export default function GalleryCMS() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    title: "",
    caption: "",
    category: "Clinic",
    featured: false,
    isActive: true,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await fetchGallery();
      setItems(Array.isArray(data) ? data : data.images || []);
    } catch (err) {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return toast.error("Select images first");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("caption", form.caption);
    formData.append("category", form.category);
    formData.append("featured", String(form.featured));
    formData.append("isActive", String(form.isActive));

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    setUploading(true);
    try {
      await uploadGalleryImages(formData);
      toast.success("Images uploaded successfully");
      setShowUpload(false);
      setForm({ title: "", caption: "", category: "Clinic", featured: false, isActive: true });
      setSelectedFiles([]);
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateGalleryImage(editingItem._id, form);
      toast.success("Image updated successfully");
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteGalleryImage(id);
      toast.success("Image deleted successfully");
      fetchItems();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      caption: item.caption || "",
      category: item.category,
      featured: item.featured,
      isActive: item.isActive,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="CMS" title="Gallery Management" />
        <Button variant="primary" onClick={() => setShowUpload(true)}>
          Upload Images
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <Card key={item._id} className="group relative overflow-hidden p-0">
              <GalleryThumb
                image={item.image}
                title={item.title}
                category={item.category}
              />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-white/90 p-3 backdrop-blur transition group-hover:translate-y-0">
                <div className="flex gap-2">
                   {item.featured && <span className="text-[10px] font-bold text-amber-600">★ FEATURED</span>}
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
            </Card>
          ))}
        </div>
      )}

      {(showUpload || editingItem) && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-8">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {editingItem ? "Edit Image Details" : "Upload New Images"}
            </h3>
            <form
              onSubmit={editingItem ? handleUpdate : handleUpload}
              className="mt-6 grid gap-4"
            >
              {!editingItem && (
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Select Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Title
                </label>
                <Input
                  required
                  placeholder="Image Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Description
                </label>
                <Textarea
                  placeholder="Image Description / Caption"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </label>
                <select
                  className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-blue-600 focus:outline-none"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm({ ...form, featured: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) =>
                      setForm({ ...form, isActive: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                  />
                  Active
                </label>
              </div>

              <div className="mt-2 flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={uploading}
                >
                  {uploading
                    ? "Processing..."
                    : editingItem
                      ? "Update"
                      : "Upload"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setShowUpload(false);
                    setEditingItem(null);
                    setSelectedFiles([]);
                  }}
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
