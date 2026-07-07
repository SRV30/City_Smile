import { useEffect, useState } from "react";
import { getAllAppointments, deleteAppointment } from "../../services/interaction.service";
import {
  Card,
  SectionTitle,
  Loader,
} from "../../components/UI";
import toast from "react-hot-toast";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment record?")) return;
    try {
      await deleteAppointment(id);
      toast.success("Record deleted");
      fetchItems();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Records" title="Patient Appointments" />

      {loading ? (
        <Loader />
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-900">
                <tr>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Date/Time</th>
                  <th className="px-6 py-4">Treatment</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {appointments.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                    <td className="px-6 py-4">{item.phone}</td>
                    <td className="px-6 py-4">
                      <p>{item.date}</p>
                      <p className="text-[10px] text-slate-400">{item.time}</p>
                    </td>
                    <td className="px-6 py-4">{item.treatment}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
