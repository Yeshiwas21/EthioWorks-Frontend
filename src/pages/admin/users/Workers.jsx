import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { listWorker, deleteWorker } from "../../../services/userServices";
import { StatCard } from "./AllUsers";
import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  CircleCheck,
  BadgeAlert,
  Edit,
  Trash2,
} from "lucide-react";

function Workers() {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // MODAL STATE
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const data = await listWorker();
      setWorkers(data);
      setFilteredWorkers(data);
    } catch (err) {
      console.error("Failed to fetch workers", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = [...workers];

    if (searchTerm.trim()) {
      data = data.filter(
        (w) =>
          w.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.phone?.includes(searchTerm) ||
          w.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(w.user_id).includes(searchTerm),
      );
    }

    setFilteredWorkers(data);
  }, [searchTerm, workers]);

  const stats = useMemo(() => {
    return {
      total: workers.length,
      verified: workers.filter((w) => w.verified == 1).length,
      unverified: workers.filter((w) => w.verified == 0).length,
    };
  }, [workers]);
  // OPEN MODAL
  const openViewModal = (worker) => {
    setSelectedWorker(worker);
    setIsViewModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setSelectedWorker(null);
    setIsViewModalOpen(false);
  };

  const handleDeleteWorker = async (id) => {
    if (!window.confirm("Are you sure you want to delete this worker?")) return;

    try {
      await deleteWorker(id);

      setWorkers((prev) => prev.filter((w) => w.id !== id));

      closeModal();
      toast.success("Worker deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete client");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow border p-8 text-center">
          <RefreshCw className="animate-spin mx-auto mb-3 text-amber-500" />
          <p className="text-gray-500">Loading workers...</p>
        </div>
      </div>
    );
  }
  // DELETION STATUS
  {
    toast && (
      <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-50">
        {toast}
      </div>
    );
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen overflow-x-hidden w-full max-w-full">
      <div className="w-full max-w-full flex flex-col gap-6">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Workers Management
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all registered workers
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchWorkers}
              className="bg-amber-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={() => navigate("/admin/create/worker")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              + Add Worker
            </button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Total Workers"
            value={stats.total}
            icon={<Users />}
          />
          <StatCard
            title="Verified Workers"
            value={stats.verified}
            icon={<CircleCheck />}
          />
          <StatCard
            title="Unverified Workers"
            value={stats.unverified}
            icon={<BadgeAlert />}
          />
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl shadow border">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              className="w-full pl-10 p-2 border rounded-lg"
              placeholder="Search workers by email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <section className="bg-white rounded-xl shadow border w-full max-w-full overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed min-w-225">
              <thead className="bg-amber-300 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredWorkers.map((w) => (
                  <tr
                    key={w.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => openViewModal(w)} // ✅ OPEN MODAL
                  >
                    <td className="p-3 truncate">#{w.id}</td>
                    <td className="p-3 truncate">
                      {[w.first_name, w.last_name].filter(Boolean).join(" ") ||
                        "—"}
                    </td>
                    <td className="p-3 truncate">{w.email}</td>
                    <td className="p-3 truncate">{w.phone}</td>
                    <td className="p-3 truncate">{w.location}</td>
                    <td className="p-3 truncate">
                      {w.verified ? "Verified" : "Not Verified"}
                    </td>
                    <td
                      className="px-6 py-4 flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteWorker(w.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ================= MODAL ================= */}
      {isViewModalOpen && selectedWorker && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[95%] sm:max-w-md bg-white rounded-xl shadow-xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto mt-16 md:mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Worker Details</h2>

            <div className="space-y-3 text-sm">
              <p>
                <strong>ID:</strong> #{selectedWorker.id}
              </p>

              <p className="flex items-center gap-2">
                <Users size={16} />
                <strong>Full Name:</strong>
                {[selectedWorker.first_name, selectedWorker.last_name]
                  .filter(Boolean)
                  .join(" ") || "—"}
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} />
                {selectedWorker.email}
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                {selectedWorker.phone || "—"}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {selectedWorker.location || "—"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedWorker.verified ? "Verified" : "Not Verified"}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Workers;
