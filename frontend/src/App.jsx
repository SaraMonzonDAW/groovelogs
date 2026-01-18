import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/HeaderComponent/Header";
import Discover from "./pages/DiscoverPage/Discover";
import Signup from "./pages/SignupPage/SignupPage";
import SignupSuccess from "./pages/SignupSuccess/SignupSuccess";



import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup-success" element={<SignupSuccess />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
