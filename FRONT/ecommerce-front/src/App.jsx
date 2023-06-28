import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<h1>hola</h1>} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
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
