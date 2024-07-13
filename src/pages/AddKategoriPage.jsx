/* eslint-disable react/no-unescaped-entities */
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addKategori } from "../utils/api";
import toast from "react-hot-toast";

function AddKategoriPage() {
  const [kategori, setKategori] = useState({
    namaKategori: "",
    keterangan: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addKategori(kategori);
      console.log(`Form submitted! ${response}`);

      if (response) {
        toast.success("Berhasil menambahkan kategori!", { duration: 3000 });
        // Reset state and textfield after success submit
        setKategori({ namaKategori: "", keterangan: "" });
      } else {
        toast.error("Error menambahkan kategori!");
        console.log(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
    }
  };

  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
        <h1 className="text-2xl text-center mb-2 font-semibold">Tambah Kategori Arsip</h1>
        <p className="items-center text-center text-sm">Berikut ini adalah halaman untuk menambahkan kategori baru.</p>

        <form onSubmit={handleSubmit} className="mt-5 mx-7">
          <div className="mb-3">
            <Typography variant="body1" mb={1}>
              Nama Kategori:
            </Typography>
            <TextField
              id="namakategori"
              size="small"
              fullWidth
              variant="outlined"
              required
              value={kategori.namaKategori}
              onChange={(event) => {
                const value = event.target.value;
                setKategori({ ...kategori, namaKategori: value });
              }}
            />
          </div>
          <div className="mb-3">
            <Typography variant="body1" mb={1}>
              Keterangan:
            </Typography>
            <TextField
              id="kategori"
              size="medium"
              fullWidth
              variant="outlined"
              required
              value={kategori.keterangan}
              onChange={(event) => {
                const value = event.target.value;
                setKategori({ ...kategori, keterangan: value });
              }}
            />
          </div>
          <Typography align="center" mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Typography>
        </form>

        {/* Navigasi kembali */}
        <div className="mt-20 ml-7">
          <Link to={"/kategori"}>
            <Button variant="contained" color="success" size="small" startIcon={<ArrowBackIcon />}>
              Kembali
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddKategoriPage;
