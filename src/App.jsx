import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DetailProduct from "./pages/DetailProduct";
import ProductCart from "./pages/ProductCart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<ProductCart />} />
        </Routes>
      </BrowserRouter>

      {/* <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-16">
        <aside>
          <p>Copyright © 2024 - All right reserved by nanamint</p>
        </aside>
      </footer> */}
    </>
  );
}

export default App;
