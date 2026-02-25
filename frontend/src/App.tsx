import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { TransactionsPage } from "./pages/TransactionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}