import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/HeaderComponent/Header";
import Discover from "./pages/DiscoverPage/Discover";
import Login from "./pages/LoginPage/LoginPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="main-container">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
