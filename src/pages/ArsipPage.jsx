/* eslint-disable react/no-unescaped-entities */
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import TabelSurat from "../components/TabelSurat.jsx";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { deleteSurat, getSurat } from "../utils/api.js";

function ArsipPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSurat();
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteSurat = async (id) => {
    try {
      await deleteSurat(id);
      setData(data.filter((surat) => surat.id !== id)); // Update state setelah surat dihapus
    } catch (error) {
      console.error("Error deleting surat:", error);
      setError(error);
    }
  };

  const handleSearch = () => {
    // Filter data berdasarkan judul surat
    const filteredData = data.filter((item) => item.judul.toLowerCase().includes(searchTitle.toLowerCase()));
    setData(filteredData);
  };

  const handleInputChange = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleResetSearch = () => {
    setSearchTitle("");
    fetchData(); // Mengambil kembali data lengkap setelah mereset pencarian
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getSurat();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
        <h1 className="text-2xl text-center mb-2 font-semibold">Daftar Arsip Surat</h1>
        <p className="items-center text-center text-sm">
          Berikut ini adalah daftar surat yang tersedia.
          <div className="block">Klik "Tambah" untuk menambahkan surat baru.</div>
        </p>

        {/* Search */}
        <div className="flex items-center mt-5 gap-6 justify-center">
          <label>Cari surat:</label>
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
          <Button variant="outlined" onClick={handleResetSearch}>
            Reset
          </Button>
        </div>

        <div className="mt-5">
          {data.length > 0 ? (
            <TabelSurat data={data} onDelete={handleDeleteSurat} />
          ) : (
            // Jika data surat pada database kosong
            <div>
              <h1 className="text-center font-semibold text-lg text-red-500 mt-14">"Tidak ada data surat ditemukan"</h1>
            </div>
          )}
        </div>

        {/* Button Tambah Surat */}
        <div className="mt-5">
          {/* Navigasi ke halaman Tambah Surat */}
          <Link to={"/arsip/tambah-arsip"}>
            <Button variant="contained" color="success" size="small" startIcon={<AddBoxIcon />}>
              Tambah arsip baru
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArsipPage;
