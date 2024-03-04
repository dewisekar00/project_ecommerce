import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DetailProduct from "./pages/DetailProduct";
import ProductCart from "./pages/ProductCart";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
