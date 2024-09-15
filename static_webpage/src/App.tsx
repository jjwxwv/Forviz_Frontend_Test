import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="bookings" />} />
        <Route path="bookings" element={<AppLayout />} />
        <Route path="bookings/:param" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
