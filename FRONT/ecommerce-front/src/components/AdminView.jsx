import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminView = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/admin", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => a.id - b.id);
        setUsers(sortedUsers);
      });
  }, []);

  const handleRoleChange = (id) => {
    if (user.id !== id) {
      axios
        .get(`http://localhost:3000/api/users/admin/${id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        })
        .then(() => {
          refreshUsers();
        });
    } else {
      alert("No puedes quitarte los privilegios de administrador a ti mismo.");
    }
  };

  const handleDeleteUser = (id) => {
    if (user.id != id) {
      const confirmed = window.confirm(
        "¿Estás seguro de eliminar este usuario?"
      );

      if (confirmed) {
        axios
          .delete(`http://localhost:3000/api/users/admin/${id}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "include",
          })
          .then(() => {
            refreshUsers();
          });
      }
    } else {
      alert("No puedes eliminarte a ti mismo.");
    }
  };

  const refreshUsers = () => {
    axios
      .get("http://localhost:3000/api/users/admin", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => a.id - b.id);
        setUsers(sortedUsers);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dirección
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rol
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-mediumtext-gray-500 uppercase tracking-wider">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-black divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={user.role === "admin"}
                  onChange={() => handleRoleChange(user.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;
