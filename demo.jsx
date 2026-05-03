import React, { useState } from "react";

const questions = [
    {
        q: "What is React?",
        options: ["Library", "Framework", "Language"],
        answer: "Library"
    },
    {
        q: "JSX stands for?",
        options: ["JS XML", "Java Syntax", "JSON"],
        answer: "JS XML"
    }
];

export default function Quiz() {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);

    function handleAnswer(option) {
        if (option === questions[index].answer) {
            setScore(score + 1);
        }

        setIndex(index + 1);
    }

    if (index >= questions.length) {
        return <h1>Score: {score}</h1>;
    }

    return (
        <div>
            <h2>{questions[index].q}</h2>

            {questions[index].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)}>
                    {opt}
                </button>
            ))}
        </div>
    );
}




















import React, { useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    function toggleTheme() {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    }

    return (
        <div
            style={{
                height: "100vh",
                background: theme === "light" ? "#fff" : "#111",
                color: theme === "light" ? "#000" : "#fff",

            }}
        >
            <h1>{theme.toUpperCase()} MODE</h1>
            <button onClick={toggleTheme}>
                Toggle Theme
            </button>
        </div>
    );
}










import React, { useState } from "react";

const productsData = [
    { id: 1, name: "Laptop", category: "Electronics" },
    { id: 2, name: "Shirt", category: "Clothing" },
    { id: 3, name: "Phone", category: "Electronics" },
    { id: 4, name: "Jeans", category: "Clothing" },
];

export default function ProductFilter() {
    const [category, setCategory] = useState("All");

    const filteredProducts =
        category === "All"
            ? productsData
            : productsData.filter(
                (item) => item.category === category
            );

    return (
        <div style={{ padding: "20px" }}>
            <h2>Product List</h2>

            {/* Dropdown */}
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
            </select>

            {/* Product List */}
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        {product.name} - {product.category}
                    </li>
                ))}
            </ul>
        </div>
    );
}







import React, { useEffect, useState } from "react";

export default function App() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // fetch data
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    // debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Search triggered:", search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // filter users
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <h2>User List</h2>

            <input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "10px", marginBottom: "10px" }}
            />

            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}