import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModalComponent/AuthModal";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import Header from "./components/HeaderComponent/Header";
import Discover from "./pages/DiscoverPage/Discover";
import Signup from "./pages/SignupPage/SignupPage";
import SignupSuccess from "./pages/SignupSuccess/SignupSuccess";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Profile from "./pages/ProfilePage/Profile";
import EditProfile from "./pages/ProfilePage/EditProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Handle GitHub Pages 404.html redirect for SPA routing
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('/');
    if (redirect) {
      navigate('/' + redirect.replace(/~and~/g, '&'), { replace: true });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/login" && !isAuthenticated) {
      setIsAuthOpen(true);
    } else {
      setIsAuthOpen(false);
    }
  }, [location.pathname, isAuthenticated]);

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
          <Route path="/search" element={<Discover />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} target="_blank" />
        </Routes>
        <AuthModal isOpen={isAuthOpen} onClose={closeModal} />
      </main>
    </>
  );
}

export default App;
