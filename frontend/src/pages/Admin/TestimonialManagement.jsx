import { useState, useEffect } from "react";
import {
  getAllTestimonials,
  toggleApproval,
  toggleFeatured,
  deleteTestimonial
} from "../../services/testimonial.service";

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await getAllTestimonials();
      setTestimonials(response.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch testimonials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleApproval = async (id, currentStatus) => {
    try {
      await toggleApproval(id, !currentStatus);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, approved: !currentStatus } : t))
      );
    } catch (err) {
      alert("Failed to update approval status.");
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await toggleFeatured(id, !currentStatus);
      setTestimonials((prev) =>
        prev.map((t) => (t._id === id ? { ...t, featured: !currentStatus } : t))
      );
    } catch (err) {
      alert("Failed to update featured status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete testimonial.");
    }
  };

  if (loading) return <div className="p-8 text-center text-blue-600 font-bold">Loading Testimonials...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-slate-900">Manage Testimonials</h2>
        <button
          onClick={fetchTestimonials}
          className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100 transition"
        >
          Refresh List
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-[30px] border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Name & Service</th>
              <th className="px-6 py-4 text-center">Rating</th>
              <th className="px-6 py-4">Review</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">
                  No testimonials found in the database.
                </td>
              </tr>
            ) : (
              testimonials.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.service}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-600 border border-yellow-100">
                      {item.rating} ★
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">{item.review}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2 items-center">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                        item.approved
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {item.approved ? "Approved" : "Pending"}
                      </span>
                      {item.featured && (
                        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 border border-blue-100">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleToggleApproval(item._id, item.approved)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          item.approved
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        }`}
                      >
                        {item.approved ? "Unapprove" : "Approve"}
                      </button>
                      <button
                        onClick={() => handleToggleFeatured(item._id, item.featured)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                          item.featured
                            ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        {item.featured ? "Unfeature" : "Feature"}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestimonialManagement;
