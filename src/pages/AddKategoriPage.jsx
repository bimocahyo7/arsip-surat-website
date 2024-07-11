/* eslint-disable react/no-unescaped-entities */
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

function AddKategoriPage() {
  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
        <h1 className="text-2xl text-center mb-2 font-semibold">Tambah Kategori Surat</h1>
        <p className="items-center text-center text-sm">Berikut ini adalah halaman untuk menambahkan kategori baru.</p>

        {/* Navigasi kembali */}
        <div className="mt-5">
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
