import { useState } from "react";
import { Route, Routes } from "react-router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Routes>
        <Route path={"/"} element={<h1>hola</h1>} />
        {/* <Route path={"/users/:id"} element={<Profile />} />
        <Route path={"/products/all"} element={<Products />} />
        <Route path={"/products/:type"} element={<Product />} />
        <Route path={"/products/search/:name"} element={<Search />} />
        <Route path={"/faq"} element={<Faq />} />
        <Route path={"/contact"} element={<Contact />} /> */}
      </Routes>
    </>
  );
}

export default App;
