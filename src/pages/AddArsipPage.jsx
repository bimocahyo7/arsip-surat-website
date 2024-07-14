import { Button, TextField, Typography, MenuItem, Select, FormControl } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addSurat, getKategori } from "../utils/api";
import toast from "react-hot-toast";

function AddArsipPage() {
  const [kategoriList, setKategoriList] = useState([]);
  const [surat, setSurat] = useState({
    nomorSurat: "",
    kategori: "",
    judul: "",
    fileDokumen: null,
  });

  useEffect(() => {
    const fetchKategori = async () => {
      const response = await getKategori();
      if (!response.error) {
        setKategoriList(response.data); // Update state dengan data kategori
      } else {
        console.error("Error fetching kategori:", response.code);
      }
    };

    fetchKategori();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Validasi inputan upload dokumen harus format PDF
    const allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.exec(file.name)) {
      toast.error("Hanya file PDF yang diperbolehkan!", { duration: 3000 });
      e.target.value = null;
      return;
    }

    setSurat({ ...surat, fileDokumen: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addSurat(surat);
      console.log(`Form submitted! ${response}`);

      if (!response.error) {
        toast.success("Berhasil menambahkan arsip!", { duration: 4000 });
        setSurat({
          nomorSurat: "",
          kategori: "",
          judul: "",
          fileDokumen: null,
        });
      } else {
        toast.error("Error menambahkan arsip!");
        console.log(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
    }
  };

  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-white p-3 mx-5 my-5 rounded-lg shadow-md">
        <h1 className="text-2xl text-center mb-2 font-semibold">Tambah Arsip Surat</h1>
        <p className="items-center text-center text-sm">
          Berikut ini adalah halaman untuk menambahkan arsip surat baru.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 mx-7">
          <div className="mb-3">
            <Typography variant="body1" mb={1}>
              Nomor Surat:
            </Typography>
            <TextField
              id="nomorSurat"
              size="small"
              fullWidth
              variant="outlined"
              required
              value={surat.nomorSurat}
              onChange={(event) => {
                const value = event.target.value;
                setSurat({ ...surat, nomorSurat: value });
              }}
            />
          </div>
          <div className="mb-3">
            <FormControl fullWidth variant="outlined" size="small">
              <Typography variant="body1" mb={1}>
                Kategori:
              </Typography>
              <Select
                required
                value={surat.kategori}
                onChange={(event) => {
                  const value = event.target.value;
                  setSurat({ ...surat, kategori: value });
                }}>
                {/* Mapping data namakategori dari tabel Kategori */}
                {kategoriList.map((kategori) => (
                  <MenuItem key={kategori.id} value={kategori.namaKategori}>
                    {kategori.namaKategori}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="mb-3">
            <Typography variant="body1" mb={1}>
              Judul:
            </Typography>
            <TextField
              id="judul"
              size="small"
              fullWidth
              variant="outlined"
              required
              value={surat.judul}
              onChange={(event) => {
                const value = event.target.value;
                setSurat({ ...surat, judul: value });
              }}
            />
          </div>
          <div className="mb-3">
            <Typography variant="body1" mb={1}>
              File Dokumen (*PDF):
            </Typography>
            <input id="fileDokumen" type="file" required onChange={handleFileChange} />
          </div>
          <Typography align="center" mt={3}>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Typography>
        </form>

        <div className="mt-5 ml-7">
          <Link to={"/arsip"}>
            <Button variant="contained" color="success" size="small" startIcon={<ArrowBackIcon />}>
              Kembali
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddArsipPage;
