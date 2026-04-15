import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Technologies from "./pages/Technologies";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Technologies />} />
        <Route path="/technologies" element={<Technologies />} />
        {/* Add more routes here as they are implemented */}
        <Route path="*" element={<div className="flex h-screen items-center justify-center font-bold text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
