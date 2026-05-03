import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./api";

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editId, setEditId] = useState(null);

  // FETCH
  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = async () => {
    if (!form.name || !form.email) return;

    try {
      if (editId) {
        await updateUser(editId, form);
        setEditId(null);
      } else {
        await createUser(form);
      }

      setForm({ name: "", email: "" });
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user._id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>User CRUD (Axios)</h2>

      {/* FORM */}
      <input
        name="name"
        value={form.name}
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update" : "Add"}
      </button>

      {/* LIST */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <b>{user.name}</b> - {user.email}

            <button onClick={() => handleEdit(user)}>
              Edit
            </button>

            <button onClick={() => handleDelete(user._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}