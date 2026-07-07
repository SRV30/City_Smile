import { useEffect, useState } from "react";
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deactivateAdmin,
  reactivateAdmin,
} from "../../services/admin.service";
import { Button, Card, Input, SectionTitle, Loader, ErrorState } from "../../components/UI";
import useAuth from "../../hooks/useAuth";

export default function AdminManagement() {
  const { admin: currentAdmin } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const data = await getAllAdmins();
      setAdmins(data);
    } catch (err) {
      setError(err.message || "Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAdmin) {
        await updateAdmin(editingAdmin._id, {
            name: form.name,
            role: form.role,
        });
      } else {
        await createAdmin(form);
      }
      setShowModal(false);
      setEditingAdmin(null);
      setForm({ name: "", email: "", password: "", role: "ADMIN" });
      fetchAdmins();
    } catch (err) {
      alert(err.message || "Action failed");
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setForm({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (admin) => {
    try {
      if (admin.isActive) {
        await deactivateAdmin(admin._id);
      } else {
        await reactivateAdmin(admin._id);
      }
      fetchAdmins();
    } catch (err) {
      alert(err.message || "Action failed");
    }
  };

  if (currentAdmin?.role !== "SUPER_ADMIN") {
    return (
      <div className="p-10">
        <ErrorState title="Access Denied" description="Only SUPER_ADMIN can access this page." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionTitle eyebrow="Admin Management" title="Manage Staff & Roles" />
        <Button variant="primary" onClick={() => {
            setEditingAdmin(null);
            setForm({ name: "", email: "", password: "", role: "ADMIN" });
            setShowModal(true);
        }}>
          Add New Admin
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-900">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-semibold text-slate-900">{admin.name}</td>
                    <td className="px-6 py-4">{admin.email}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        admin.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex h-2 w-2 rounded-full mr-2 ${admin.isActive ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                      {admin.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                      {admin._id !== currentAdmin._id && (
                        <button
                          onClick={() => handleToggleStatus(admin)}
                          className={`${admin.isActive ? 'text-rose-600' : 'text-green-600'} hover:underline font-semibold`}
                        >
                          {admin.isActive ? "Deactivate" : "Activate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {editingAdmin ? "Edit Admin" : "Add New Admin"}
            </h3>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                <Input
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              {!editingAdmin && (
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              )}
              {!editingAdmin && (
                <div className="grid gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                  <Input
                    required
                    type="password"
                    placeholder="********"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              )}
              <div className="grid gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Role</label>
                <select
                  className="w-full rounded-2xl border-slate-200 bg-slate-50 px-5 py-3 text-sm focus:border-blue-600 focus:outline-none"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>
              </div>

              <div className="mt-2 flex gap-3">
                <Button type="submit" variant="primary" className="flex-1">
                  {editingAdmin ? "Update Admin" : "Create Admin"}
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
