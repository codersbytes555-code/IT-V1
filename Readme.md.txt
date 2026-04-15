import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // CREATE
  const addItem = () => {
    if (input === "") return;
    setItems([...items, input]);
    setInput("");
  };

  // DELETE
  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // EDIT (SET)
  const editItem = (index) => {
    setInput(items[index]);
    setEditIndex(index);
  };

  // UPDATE
  const updateItem = () => {
    const updatedItems = [...items];
    updatedItems[editIndex] = input;
    setItems(updatedItems);
    setInput("");
    setEditIndex(null);
  };

  return (
    <div>
      <h2>Simple CRUD App</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {editIndex === null ? (
        <button onClick={addItem}>Add</button>
      ) : (
        <button onClick={updateItem}>Update</button>
      )}

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => editItem(index)}>Edit</button>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






























import express, { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =====================================================
   📦 MODEL (Normally: models/item.model.ts)
===================================================== */
interface IItem extends Document {
  name: string;
}

const ItemSchema = new Schema(
  {
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Item = mongoose.model<IItem>("Item", ItemSchema);

/* =====================================================
   ⚙️ SERVICE (Business Logic Layer)
   (Normally: services/item.service.ts)
===================================================== */
const ItemService = {
  create: async (data: { name: string }) => {
    const item = new Item(data);
    return await item.save();
  },

  getAll: async () => {
    return await Item.find();
  },

  getOne: async (id: string) => {
    return await Item.findById(id);
  },

  update: async (id: string, data: { name: string }) => {
    return await Item.findByIdAndUpdate(id, data, { new: true });
  },

  delete: async (id: string) => {
    return await Item.findByIdAndDelete(id);
  }
};

/* =====================================================
   🎮 CONTROLLER (Request/Response Handling)
   (Normally: controllers/item.controller.ts)
===================================================== */
const ItemController = {
  create: async (req: Request, res: Response) => {
    try {
      const item = await ItemService.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const items = await ItemService.getAll();
      res.json(items);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const item = await ItemService.getOne(req.params.id);
      res.json(item);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const item = await ItemService.update(req.params.id, req.body);
      res.json(item);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await ItemService.delete(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

/* =====================================================
   🌐 ROUTES (API Endpoints)
   (Normally: routes/item.routes.ts)
===================================================== */
const router = express.Router();

router.post("/", ItemController.create);
router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.delete);

app.use("/api/items", router);

/* =====================================================
   🚀 DATABASE + SERVER START
===================================================== */
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(err))



;


















You’re trying to do two opposite things at once: “industry-level structure” + “everything in one file.”
Real projects don’t do that—but we can simulate clean architecture inside ONE file so it still looks professional.
Below is a simple full-stack MERN CRUD (no CSS) with:
•	Clean layering (service/controller)
•	Good naming
•	Minimal but impressive structure
•	Easy to run
________________________________________
🚀 📁 Folder Structure
mern-crud/
 ├── backend/
 │    ├── server.ts
 │    ├── package.json
 │    ├── tsconfig.json
 │    └── .env
 └── frontend/
      ├── package.json
      └── src/App.js
________________________________________
⚙️ BACKEND (Express + MongoDB + TS)
📄 backend/server.ts (ALL-IN-ONE, structured)
import express, { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================= MODEL ================= */
interface IItem extends Document {
  name: string;
}

const Item = mongoose.model<IItem>(
  "Item",
  new Schema({ name: { type: String, required: true } }, { timestamps: true })
);

/* ================= SERVICE ================= */
const itemService = {
  create: async (data: { name: string }) => new Item(data).save(),
  getAll: async () => Item.find().sort({ createdAt: -1 }),
  update: async (id: string, data: { name: string }) =>
    Item.findByIdAndUpdate(id, data, { new: true }),
  delete: async (id: string) => Item.findByIdAndDelete(id)
};

/* ================= CONTROLLER ================= */
const itemController = {
  create: async (req: Request, res: Response) => {
    try {
      if (!req.body.name) return res.status(400).json({ msg: "Name required" });
      const data = await itemService.create(req.body);
      res.status(201).json(data);
    } catch (e) {
      res.status(500).json(e);
    }
  },

  getAll: async (_: Request, res: Response) => {
    const data = await itemService.getAll();
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const data = await itemService.update(req.params.id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    await itemService.delete(req.params.id);
    res.json({ msg: "Deleted" });
  }
};

/* ================= ROUTES ================= */
const router = express.Router();

router.post("/", itemController.create);
router.get("/", itemController.getAll);
router.put("/:id", itemController.update);
router.delete("/:id", itemController.delete);

app.use("/api/items", router);

/* ================= START ================= */
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(5000, () => console.log("Backend running on 5000"));
});
________________________________________
📄 backend/package.json
{
  "name": "backend",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only server.ts"
  },
  "dependencies": {
    "express": "^4",
    "mongoose": "^8",
    "cors": "^2",
    "dotenv": "^16"
  },
  "devDependencies": {
    "typescript": "^5",
    "ts-node-dev": "^2",
    "@types/node": "^20",
    "@types/express": "^4"
  }
}
________________________________________
📄 backend/tsconfig.json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "strict": true
  }
}
________________________________________
📄 backend/.env
MONGO_URI=mongodb://localhost:27017/mern_crud
________________________________________
💻 FRONTEND (React - Simple, Clean)
📄 frontend/src/App.js
import React, { useEffect, useState } from "react";

const API = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // READ
  const fetchItems = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // CREATE
  const addItem = async () => {
    if (!input) return;
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input })
    });
    setInput("");
    fetchItems();
  };

  // UPDATE
  const updateItem = async () => {
    await fetch(`${API}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input })
    });
    setInput("");
    setEditId(null);
    fetchItems();
  };

  // DELETE
  const deleteItem = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div>
      <h2>MERN CRUD</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {editId ? (
        <button onClick={updateItem}>Update</button>
      ) : (
        <button onClick={addItem}>Add</button>
      )}

      <ul>
        {items.map((i) => (
          <li key={i._id}>
            {i.name}
            <button onClick={() => { setEditId(i._id); setInput(i.name); }}>
              Edit
            </button>
            <button onClick={() => deleteItem(i._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
________________________________________
📄 frontend/package.json
{
  "name": "frontend",
  "dependencies": {
    "react": "^18",
    "react-dom": "^18"
  },
  "scripts": {
    "start": "react-scripts start"
  }
}
________________________________________
⚙️ 🧪 SETUP & RUN
1️⃣ Backend
cd backend
npm install
npm run dev
2️⃣ Frontend
cd frontend
npx create-react-app .   # if empty
npm install
npm start
________________________________________
🧠 Why this impresses seniors
This is where most people fail—you didn’t:
•	✅ Proper layering (service/controller)
•	✅ Clean API structure
•	✅ Async/await usage
•	✅ Input validation (basic)
•	✅ Separation of concerns (even in one file)
•	✅ No over-engineering
________________________________________
🔥 What to say in interview
“I kept the project minimal but followed layered architecture and clean separation so it can scale easily.”
________________________________________
🚀 If you want upgrade (strong portfolio)
Next step I recommend:
•	Add JWT Auth
•	Add error middleware
•	Add pagination + search
•	Convert to Prisma + PostgreSQL
Say “upgrade” and I’ll make this production-level.

