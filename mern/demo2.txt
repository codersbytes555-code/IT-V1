class UserCRUD {
  constructor() {
    this.users = [];
    this.id = 1;
  }

  // CREATE
  addUser(name) {
    const user = { id: this.id++, name };
    this.users.push(user);
    return user;
  }

  // READ (all users)
  getUsers() {
    return this.users;
  }

  // READ (single user)
  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  // UPDATE
  updateUser(id, newName) {
    let user = this.users.find(user => user.id === id);

    if (!user) return "User not found";

    user.name = newName;
    return user;
  }

  // DELETE
  deleteUser(id) {
    const initialLength = this.users.length;

    this.users = this.users.filter(user => user.id !== id);

    return this.users.length < initialLength
      ? "Deleted successfully"
      : "User not found";
  }
}


const crud = new UserCRUD();

// CREATE
crud.addUser("Amit");
crud.addUser("Rahul");

// READ ALL
console.log(crud.getUsers());

// READ ONE
console.log(crud.getUserById(1));

// UPDATE
crud.updateUser(1, "Amit Sharma");

// DELETE
crud.deleteUser(2);

console.log(crud.getUsers());













import React, { useState } from "react";

export default function CRUDApp() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // CREATE
  const addItem = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      // UPDATE
      setItems(
        items.map(item =>
          item.id === editId
            ? { ...item, name: input }
            : item
        )
      );
      setEditId(null);
    } else {
      setItems([
        ...items,
        { id: Date.now(), name: input }
      ]);
    }

    setInput("");
  };

  // DELETE
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // EDIT
  const editItem = (item) => {
    setInput(item.name);
    setEditId(item.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>React CRUD App</h2>

      {/* INPUT */}
      <input
        type="text"
        value={input}
        placeholder="Enter item..."
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addItem}>
        {editId !== null ? "Update" : "Add"}
      </button>

      {/* LIST */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}

            <button onClick={() => editItem(item)}>
              Edit
            </button>

            <button onClick={() => deleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}