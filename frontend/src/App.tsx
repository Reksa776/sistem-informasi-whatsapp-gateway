// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import UserProfiles from "./pages/UserProfiles";
import { ProtectedRoute } from './components/middleware/protectedRoute';
import { PublicRoute } from './components/middleware/PublicRoute';
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import DataUser from "./pages/DataUser/DataUser";
import ListRole from "./pages/HakAkses/ListRole";
import Perangkat from "./pages/Perangkat/Perangkat";
import DaftarKategori from "./pages/Pesan/DaftarKategori";
import DaftarGroup from "./pages/Pesan/DaftarGroup";
import DaftarKontak from "./pages/Pesan/DaftarKontak";
import DaftarPesan from "./pages/Pesan/DaftarPesan";
import BalasOtomatis from "./pages/Pesan/BalasOtomatis";
import JadwalPesan from "./pages/Pesan/JadwalPesan";
import KirimPesan from "./pages/Pesan/KirimPesan";
import NotFound from "./pages/OtherPage/NotFound";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<PublicRoute><SignIn /></PublicRoute>} />

        {/* Protected Routes with Layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute role={["admin", "member"]}><Home /></ProtectedRoute>} />
          <Route path="/data-user" element={<ProtectedRoute role={["admin"]}><DataUser /></ProtectedRoute>} />
          <Route path="/list-role" element={<ProtectedRoute role={["admin"]}><ListRole /></ProtectedRoute>} />
          <Route path="/perangkat" element={<ProtectedRoute role={["admin", "member"]}><Perangkat /></ProtectedRoute>} />
          <Route path="/daftar-kategori" element={<ProtectedRoute role={["admin", "member"]}><DaftarKategori /></ProtectedRoute>} />
          <Route path="/daftar-group" element={<ProtectedRoute role={["admin", "member"]}><DaftarGroup /></ProtectedRoute>} />
          <Route path="/daftar-kontak" element={<ProtectedRoute role={["admin", "member"]}><DaftarKontak /></ProtectedRoute>} />
          <Route path="/daftar-pesan" element={<ProtectedRoute role={["admin", "member"]}><DaftarPesan /></ProtectedRoute>} />
          <Route path="/balas-otomatis" element={<ProtectedRoute role={["admin", "member"]}><BalasOtomatis /></ProtectedRoute>} />
          <Route path="/jadwal-pesan" element={<ProtectedRoute role={["admin", "member"]}><JadwalPesan /></ProtectedRoute>} />
          <Route path="/kirim-pesan" element={<ProtectedRoute role={["admin", "member"]}><KirimPesan /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute role={["admin", "member"]}><UserProfiles /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
