import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { listClient, deleteClient } from "../../../services/userServices";
import { StatCard } from "./AllUsers";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Building2,
  RefreshCw,
  CircleCheck,
  BadgeAlert,
  Edit,
  Trash2,
} from "lucide-react";

function Clients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  //  MODAL STATE
  const [selectedClient, setSelectedClient] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await listClient();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = [...clients];

    if (searchTerm.trim()) {
      data = data.filter(
        (c) =>
          c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone?.includes(searchTerm) ||
          c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(c.user_id).includes(searchTerm),
      );
    }

    setFilteredClients(data);
  }, [searchTerm, clients]);

  const stats = useMemo(() => {
    return {
      total: clients.length,
      verified: clients.filter((c) => c.verified == 1).length,
      unverified: clients.filter((c) => c.verified == 0).length,
    };
  }, [clients]);

  // OPEN MODAL
  const openViewModal = (client) => {
    setSelectedClient(client);
    setIsViewModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setSelectedClient(null);
    setIsViewModalOpen(false);
  };

  const handleDeleteClient = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await deleteClient(id);

      setClients((prev) => prev.filter((c) => c.id !== id));

      closeModal();

      toast.success("Client deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete a client");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow border p-8 text-center">
          <RefreshCw className="animate-spin mx-auto mb-3 text-amber-500" />
          <p className="text-gray-500">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen overflow-x-hidden w-full max-w-full">
      <div className="w-full max-w-full flex flex-col gap-6">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Clients Management
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all registered clients
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchClients}
              className="bg-amber-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-amber-400 transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
            <button
              onClick={() => navigate("/admin/create/client")}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              + Add Client
            </button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Total Clients"
            value={stats.total}
            icon={<Users />}
          />
          <StatCard
            title="Verified Clients"
            value={stats.verified}
            icon={<CircleCheck />}
          />
          <StatCard
            title="Unverified Clients"
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
              placeholder="Search clients by email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <section className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-225 w-full">
              <thead className="bg-amber-300 sticky top-0 z-10">
                <tr>
                  <th className="p-3 text-left whitespace-nowrap">ID</th>
                  <th className="p-3 text-left whitespace-nowrap">Company</th>
                  <th className="p-3 text-left whitespace-nowrap">Email</th>
                  <th className="p-3 text-left whitespace-nowrap">Phone</th>
                  <th className="p-3 text-left whitespace-nowrap">Location</th>
                  <th className="p-3 text-left whitespace-nowrap">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => openViewModal(c)}
                  >
                    <td className="p-3 whitespace-nowrap">#{c.id}</td>
                    <td className="p-3 whitespace-nowrap">
                      {c.company_name || "—"}
                    </td>
                    <td className="p-3 whitespace-nowrap">{c.email}</td>
                    <td className="p-3 whitespace-nowrap">{c.phone || "—"}</td>
                    <td className="p-3 whitespace-nowrap">
                      {c.location || "—"}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {c.verified ? "Verified" : "Not Verified"}
                    </td>
                    <td
                      className="px-6 py-4 flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteClient(c.id)}
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
      {isViewModalOpen && selectedClient && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-[95%] sm:max-w-md bg-white rounded-xl shadow-xl p-4 sm:p-6 max-h-[85vh] overflow-y-auto mt-16 md:mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Client Details</h2>

            <div className="space-y-3 text-sm">
              <p>
                <strong>ID:</strong> #{selectedClient.id}
              </p>

              <p className="flex items-center gap-2">
                <Building2 size={16} />
                {selectedClient.company_name || "—"}
              </p>

              <p className="flex items-center gap-2">
                <Mail size={16} />
                {selectedClient.email}
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                {selectedClient.phone || "—"}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} />
                {selectedClient.location || "—"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {selectedClient.verified ? "Verified" : "Not Verified"}
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

export default Clients;
