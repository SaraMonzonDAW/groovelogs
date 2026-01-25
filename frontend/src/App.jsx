import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthModal from "./components/AuthModalComponent/AuthModal";
import Header from "./components/HeaderComponent/Header";
import Discover from "./pages/DiscoverPage/Discover";
import Signup from "./pages/SignupPage/SignupPage";
import SignupSuccess from "./pages/SignupSuccess/SignupSuccess";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsAuthOpen(true);
    } else {
      setIsAuthOpen(false);
    }
  }, [location.pathname]);

  const closeModal = () => {
    setIsAuthOpen(false);
    navigate("/");
  };

  return (
    <>
      <Header />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
        </Routes>

        <AuthModal isOpen={isAuthOpen} onClose={closeModal} />
      </main>
      </>
  );
}

export default App;
