import { useEffect, useState } from "react";
import { getAllMessages, deleteMessage } from "../../services/interaction.service";
import {
  Card,
  SectionTitle,
  Loader,
} from "../../components/UI";
import toast from "react-hot-toast";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getAllMessages();
      setMessages(data);
    } catch (err) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      toast.success("Message deleted");
      fetchItems();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Records" title="Contact Messages" />

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4">
          {messages.map((item) => (
            <Card key={item._id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.email} • {item.phone}</p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Delete
                </button>
              </div>
              <p className="mt-2 text-xs font-bold text-blue-600 uppercase tracking-wider">{item.subject}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600 bg-slate-50 p-4 rounded-2xl">
                {item.message}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
