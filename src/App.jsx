import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DetailPost from "./pages/DetailPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail-product" element={<DetailPost />} />
        </Routes>
      </BrowserRouter>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-16">
        <aside>
          <p>Copyright © 2024 - All right reserved by nanamint</p>
        </aside>
      </footer>
    </>
  );
}

export default App;
