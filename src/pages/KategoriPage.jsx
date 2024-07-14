/* eslint-disable react/no-unescaped-entities */
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteKategori, getKategori } from "../utils/api";
import TabelKategori from "../components/TabelKategori";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoadingErrorWrapper from "../components/LoadingError";

function KategoriPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKategori, seeSearchKategori] = useState("");

  const fetchData = async () => {
    try {
      const response = await getKategori();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function onHandleDelete(id) {
    try {
      const response = await deleteKategori(id);
      if (!response.error) {
        // Jika penghapusan berhasil, perbarui data dengan data yang baru
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      } else {
        // Handle error jika diperlukan
        console.error("Error deleting kategori:", response.error);
      }
    } catch (error) {
      console.error("Error deleting kategori:", error);
    }
  }

  const handleSearch = () => {
    if (searchKategori.trim() === "") {
      // Jika inputan field kosong, load semua data
      fetchData();
    } else {
      const filteredData = data.filter((item) =>
        item.namaKategori.toLowerCase().includes(searchKategori.toLowerCase())
      );
      // Tampilkan data yang telah filter dari field
      setData(filteredData);
    }
  };

  const handleChangeSearch = (event) => {
    const value = event.target.value;
    seeSearchKategori(value);
  };

  return (
    <LoadingErrorWrapper error={error} loading={loading}>
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <h1 className="text-2xl text-center mb-2 font-semibold">Kategori Arsip</h1>
          <p className="items-center text-center text-sm">
            Berikut ini adalah kategori yang bisa digunakan untuk melabeli surat.
            <div className="block">Klik "Tambah" pada kolom aksi untuk menambahkan kategori baru</div>
          </p>

          {/* Search */}
          <div className="flex items-center mt-5 gap-6 justify-center">
            <label>Cari kategori:</label>
            <TextField
              placeholder="Ketikan nama kategori"
              id="outlined-basic"
              size="small"
              variant="outlined"
              className="w-96"
              value={searchKategori}
              onChange={handleChangeSearch}
            />
            <Button variant="contained" onClick={handleSearch}>
              Cari
            </Button>
          </div>

          <div className="mt-5">
            {data.length > 0 ? (
              <TabelKategori data={data} onDelete={onHandleDelete} />
            ) : (
              // Jika data kategori pada database kosong
              <div>
                <h1 className="text-center font-semibold text-lg text-red-500 mt-14">
                  "Tidak ada data kategori ditemukan"
                </h1>
              </div>
            )}
          </div>

          {/* Button Tambah Kategori */}
          <div className="mt-5">
            {/* Navigasi ke halaman Tambah Kategori */}
            <Link to={"/kategori/tambah-kategori"}>
              <Button variant="contained" color="success" size="small" startIcon={<AddBoxIcon />}>
                Tambah kategori baru
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </LoadingErrorWrapper>
  );
}

export default KategoriPage;
