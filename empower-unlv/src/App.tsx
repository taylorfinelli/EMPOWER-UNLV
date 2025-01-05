import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NavBar from "./components/navbar";
import Data from "./pages/data";
import FAQ from "./pages/faq";
import AdminUpload from "./pages/admin/upload";
import AdminLogin from "./pages/admin";
import Contact from "./pages/contact";
import About from "./pages/about";
import { useEffect, useState } from "react";
import { getData, handleData } from "./api/visitors";

export default function App() {
  const [userInfoLogged, setUserInfoLogged] = useState<boolean>(false);

  useEffect(() => {
    const logUserInfo = async () => {
      try {
        const response = await getData();
        handleData(response);
        setUserInfoLogged(true);
      } catch (err) {
        console.error("Unable to determine if unique user.");
      }
    };

    // Only log user info if it hasn't been logged already
    if (!userInfoLogged) {
      logUserInfo();
    }
  }, [userInfoLogged]);

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
            <Route path="/admin" element={<AdminUpload />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}
