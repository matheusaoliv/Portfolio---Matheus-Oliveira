import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import CurriculoPage from "@/react-app/pages/Curriculo";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/curriculo" element={<CurriculoPage />} />
      </Routes>
    </Router>
  );
}
