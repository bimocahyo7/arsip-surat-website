import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import KategoriPage from "./pages/KategoriPage";
import ArsipPage from "./pages/ArsipPage";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import AddKategoriPage from "./pages/AddKategoriPage";
import EditKategoriPage from "./pages/EditKategoriPage";
import AddArsipPage from "./pages/AddArsipPage";
import DetailArsipPage from "./pages/DetailArsipPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          {/* ARSIP */}
          <Route exact path="/arsip" element={<ArsipPage />} />
          <Route exact path="arsip/tambah-arsip" element={<AddArsipPage />} />
          <Route exact path="arsip/detail/:id" element={<DetailArsipPage />} />

          {/* KATEGORI */}
          <Route exact path="/kategori" element={<KategoriPage />} />
          <Route exact path="/kategori/edit/:id" element={<EditKategoriPage />} />
          <Route exact path="/kategori/tambah-kategori" element={<AddKategoriPage />} />

          {/* PROFILE */}
          <Route exact path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
