import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import Data from "./pages/data";
import FAQ from "./pages/faq";
import AdminUpload from "./pages/admin/upload";
import AdminLogin from "./pages/admin";

export default function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/data" element={<Data />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/upload" element={<AdminUpload />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
