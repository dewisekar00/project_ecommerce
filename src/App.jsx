import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const Homepage = lazy(() => import("./pages/Homepage"));
const DetailProduct = lazy(() => import("./pages/DetailProduct"));
const ProductCart = lazy(() => import("./pages/ProductCart"));
const Login = lazy(() => import("./components/Login"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center mt-24">
          <span className="loading loading-spinner loading-lg  "></span>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<ProductCart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
