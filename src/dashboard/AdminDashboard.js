import { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

  const fetchUsers = () => {
    setLoading(true); 

    fetch(`http://localhost:8000/api/admin/users/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setTotalPages(data.total_pages || 1);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const toggleStatus = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    setLoading(true);

    await fetch(
      `http://localhost:8000/api/admin/users/${id}/toggle/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessage("User status updated");
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* 🔹 LOADING TEXT */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" align="center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.is_active ? "Active" : "Inactive"}</td>
                  <td>
                    <button onClick={() => toggleStatus(u.id)}>
                      {u.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <br />

      <button
        disabled={page === 1 || loading}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages || loading}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default AdminDashboard;
