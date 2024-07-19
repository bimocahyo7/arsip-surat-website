import { Button, TextField, Typography, MenuItem, Select, FormControl } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSuratById, updateSurat, getKategori } from "../utils/api";
import toast from "react-hot-toast";

function EditArsipPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kategoriList, setKategoriList] = useState([]);
  const [surat, setSurat] = useState({
    nomorSurat: "",
    kategori: "",
    judul: "",
    fileDokumen: null,
  });
  const [namaFile, setNamaFile] = useState(""); // State untuk menyimpan nama file yang dipilih

  useEffect(() => {
    const fetchSuratAndKategori = async () => {
      try {
        const responseSurat = await getSuratById(id);
        setSurat({
          nomorSurat: responseSurat.nomorSurat,
          kategori: responseSurat.kategori,
          judul: responseSurat.judul,
          fileDokumen: responseSurat.fileDokumen, // Set fileDokumen dari data surat
        });

        // Set nama file jika fileDokumen sudah ada
        if (responseSurat.fileDokumen) {
          setNamaFile(responseSurat.fileDokumen);
        } else {
          setNamaFile("Tidak ada file dipilih"); // Pesan jika tidak ada file
        }

        const responseKategori = await getKategori();
        if (!responseKategori.error) {
          setKategoriList(responseKategori.data);
        } else {
          console.error("Error fetching kategori:", responseKategori.code);
        }
      } catch (error) {
        console.error("Error fetching surat or kategori:", error);
      }
    };

    fetchSuratAndKategori();
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.exec(file.name)) {
      toast.error("Hanya file PDF yang diperbolehkan!", { duration: 3000 });
      e.target.value = null;
      return;
    }

    setSurat({ ...surat, fileDokumen: file });
    setNamaFile(file.name); // Set nama file untuk ditampilkan
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateSurat(id, surat);
      if (!response.error) {
        toast.success("Berhasil mengupdate arsip!", { duration: 4000 });
        // Navigasi ke halaman detail setelah berhasil update datanya
        navigate(`/arsip/detail/${id}`);
      } else {
        toast.error("Error mengupdate arsip!");
      }
    } catch (error) {
      console.error("Error updating surat:", error);
      toast.error("Error mengupdate arsip!");
    }
  };

  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-white p-3 mx-5 my-5 rounded-lg shadow-md">
        <h1 className="text-2xl text-center mb-2 font-semibold">Edit Arsip Surat</h1>
        <p className="items-center text-center text-sm">Berikut ini adalah halaman untuk mengedit arsip surat.</p>

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
            <input
              id="fileDokumen"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ display: "none" }} // Sembunyikan input file yang sebenarnya
            />
            <div>
              <label htmlFor="fileDokumen">
                <Button component="span" variant="outlined">
                  Pilih File
                </Button>
              </label>
              <span className="ml-2">File saat ini: {namaFile}</span>
            </div>
          </div>
          <Typography align="center" mt={3}>
            <Button type="submit" variant="contained" size="large">
              Update
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

export default EditArsipPage;
