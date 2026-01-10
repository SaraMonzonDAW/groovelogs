import Header from "./components/HeaderComponent/Header";
import Discover from "../src/pages/DiscoverPage/Discover";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main className="main-container">
        <Discover />
      </main>
    </>
  );
}

export default App;

