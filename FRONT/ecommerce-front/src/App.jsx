import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductsGrid from "./components/ProductsGrid";
import { useSelector } from "react-redux";
import SingleProduct from "./commons/SIngleProduct";
import Navbar from "./commons/Navbar";
import CartHistory from "./components/CartHistory";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<ProductsGrid />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/products/all"} element={<ProductsGrid />} />
        <Route path={"/products/:id"} element={<SingleProduct />} />
<<<<<<< HEAD
        <Route path={"/cart"} element={<Cart />} />
        <Route
          path={"/cart-history"}
          element={user.email ? <CartHistory /> : <Login />}
        />
=======
>>>>>>> 6e1a9a9159fbefff6e0b05af9bef51e1b4b450c2
      </Routes>
    </>
  );
}

export default App;
