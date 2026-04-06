import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./Portfolio";
import Filmmaking from "./Filmmaking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/filmmaking" element={<Filmmaking />} />
      </Routes>
    </BrowserRouter>
  );
}
