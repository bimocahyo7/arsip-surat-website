/* eslint-disable react/no-unescaped-entities */
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TabelSurat from "../components/TabelSurat.jsx";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { deleteSurat, getSurat } from "../utils/api.js";
import LoadingErrorWrapper from "../components/LoadingError.jsx";

function ArsipPage() {
  const [originalData, setOriginalData] = useState([]); // State untuk menyimpan data asli dari API
  const [data, setData] = useState([]); // State untuk menampilkan data yang sedang ditampilkan
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getSurat();
      setOriginalData(response.data); // Menyimpan data asli ke state originalData
      setData(response.data); // Menampilkan data yang sedang ditampilkan
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSurat = async (id) => {
    try {
      await deleteSurat(id);
      setData(data.filter((surat) => surat.id !== id)); // Update state setelah surat dihapus
      setOriginalData(originalData.filter((surat) => surat.id !== id)); // Update data asli jika diperlukan
    } catch (error) {
      console.error("Error deleting surat:", error);
      setError(error);
    }
  };

  // Handle pencarian berdasarkan judul surat
  const handleSearch = () => {
    if (searchTitle.trim() === "") {
      // Tampilkan semua data jika pencarian kosong
      setData(originalData);
    } else {
      const filteredData = originalData.filter((item) => item.judul.toLowerCase().includes(searchTitle.toLowerCase()));
      // Update state data untuk menampilkan hasil pencarian
      setData(filteredData);
    }
  };

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  return (
    <LoadingErrorWrapper loading={loading} error={error}>
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-9 mx-5 my-5 rounded-lg shadow-md">
          <div className="pb-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold pb-3">Daftar Arsip Surat</h1>
            <p className="text-sm">Berikut ini adalah daftar surat yang tersedia.</p>
            <p className="text-sm">Klik "Tambah" untuk menambahkan surat baru.</p>
          </div>

          {/* Search */}
          <div className="flex items-center mt-5 gap-6 justify-between">
            <div>
              {/* Navigasi ke halaman Tambah Surat */}
              <Link to={"/arsip/tambah-arsip"}>
                <Button variant="contained" color="success" size="small" startIcon={<AddBoxIcon />}>
                  Tambah arsip baru
                </Button>
              </Link>
            </div>
            <div className="flex gap-3 justify-center items-center">
              <Typography>Cari surat:</Typography>
              <TextField
                placeholder="Ketikan judul surat"
                id="outlined-basic"
                size="small"
                variant="outlined"
                className="w-96"
                value={searchTitle}
                onChange={handleInputChange}
              />
              <Button variant="contained" onClick={handleSearch}>
                Cari
              </Button>
            </div>
          </div>

          <div className="mt-5">
            {data.length > 0 ? (
              <TabelSurat data={data} onDelete={handleDeleteSurat} />
            ) : (
              // Jika data surat pada database kosong
              <div>
                <h1 className="text-center font-semibold text-lg text-red-500 mt-14">
                  "Tidak ada data surat ditemukan"
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </LoadingErrorWrapper>
  );
}

export default ArsipPage;
