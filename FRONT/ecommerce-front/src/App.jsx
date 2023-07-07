import { Route, Routes } from "react-router";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductsGrid from "./components/ProductsGrid";
import { useSelector } from "react-redux";
import SingleProduct from "./commons/SIngleProduct";
import Navbar from "./commons/Navbar";
import CartHistory from "./components/CartHistory";
import Cart from "./commons/Cart";
import Categories from "./components/Categories";
import Gorras from "./components/Gorras";
import Remeras from "./components/Remeras";
import Buzos from "./components/Buzos";
import Checkout from "./components/Checkout";
import AdminView from "./components/AdminView";
import EditProduct from "./commons/EditProduct";
import AddProduct from "./components/AddProduct";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="w-screen">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<ProductsGrid />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/products/all"} element={<ProductsGrid />} />
        <Route path={"/products/:id"} element={<SingleProduct />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/categories/"} element={<Categories />} />
        <Route path={"/categories/1"} element={<Gorras />} />
        <Route path={"/categories/2"} element={<Remeras />} />
        <Route path={"/categories/3"} element={<Buzos />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route
          path={"/cart-history"}
          element={user.email ? <CartHistory /> : <Login />}
        />
        <Route
          path={"/admin"}
          element={user.role == "admin" ? <AdminView /> : <ProductsGrid />}
        />
        <Route
          path={"/admin/editproduct/:id"}
          element={user.role == "admin" ? <EditProduct /> : <ProductsGrid />}
        />
        <Route
          path={"/admin/addproduct"}
          element={user.role == "admin" ? <AddProduct /> : <ProductsGrid />}
        />
      </Routes>
    </div>
  );
}

export default App;
