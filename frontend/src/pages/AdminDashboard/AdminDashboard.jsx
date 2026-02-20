import { useEffect, useState } from "react";
import { getAllUsers, deleteUserById } from "../../services/adminApi";
import Spinner from "../../components/Spinner/Spinner";
import "./AdminDashboard.style.scss";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;

    await deleteUserById(id);

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleString("es-ES");
  };

  if (loading) return <Spinner />;

  return (
    <div className="admin-dashboard">
      <h2>Panel de Administración</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Último Login</th>
            <th>Última Modificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.displayName}</td>
              <td>{user.rol}</td>
              <td>{formatDate(user.lastLoginAt)}</td>
              <td>{formatDate(user.updatedAt)}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
