
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import DetailPost from "./pages/DetailPost";


function App() {

  return (
 <>
 <BrowserRouter>
 <Routes >

  <Route path="/" element={ <Homepage />} />
  <Route path="/detail-product" element={ <DetailPost/>} />
 </Routes>
 </BrowserRouter>
 
 </>
  );
}

export default App;
