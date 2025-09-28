import React, { useEffect, useState } from "react";
import api from "../../api";
import AddUser from "./AddUser";
import AddStore from "./AddStore";
import AdminUsersList from "./AdminUsersList";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "../authentication/UpdatePassword";


function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });
   const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await api.get("/admin/stores", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStores(res.data);
  };
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2  className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>
      <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Summary</h3>
       <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Logout
        </button>
      <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Update Password
      </button>

      <UpdatePassword
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
     

     
       <div className="bg-white shadow rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-700">Total Users:</h3>

     <p  className="text-2xl font-bold text-green-600"> {stats.totalUsers} </p>
</div>
      <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Stores</h3>
          <p className="text-2xl font-bold text-green-600">{stats.totalStores}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Ratings</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.totalRatings}</p>
        </div>
     
      </div>
     <div className="grid md:grid-cols-2 gap-6 mb-10">
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add User</h3>
        <AddUser />
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Users List</h3>
        <AdminUsersList />
      </div>
    </div>

    <div className="bg-white shadow rounded-xl p-6 mb-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Store</h3>
      <AddStore />
    </div>

    {/* Stores Table */}
    <h3 className="text-xl font-semibold text-gray-800 mb-4">All Stores</h3>
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Address</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{store.name}</td>
              <td className="px-4 py-2">{store.email}</td>
              <td className="px-4 py-2">{store.address}</td>
              <td className="px-4 py-2">
                {store.rating ? Number(store.rating).toFixed(1) : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
export default AdminDashboard;