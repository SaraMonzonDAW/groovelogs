import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/HeaderComponent/Header";
import Search from "./components/SearchComponent/Search";
import NewList from "./components/NewListComponent/NewList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Header />
        <main className="main-container">
          <Search />
          <NewList />
        </main>
      </div>
    </>
  );
}

export default App;
