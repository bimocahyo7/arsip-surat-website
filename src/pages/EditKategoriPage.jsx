import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getKategoriById, updateKategori } from "../utils/api";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingErrorWrapper from "../components/LoadingError";

function EditKategoriPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [namaKategori, setNamaKategori] = useState("");
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getKategoriById(id);
        setData(response);
        setNamaKategori(response.namaKategori);
        setKeterangan(response.keterangan);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = { namaKategori, keterangan };
      await updateKategori(id, updatedData);
      toast.success("Berhasil mengupdate kategori!", { duration: 3000 });
      // Navigasi setelah berhasil update
      navigate("/kategori");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <LoadingErrorWrapper loading={loading} error={error}>
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <h1 className="text-2xl text-center mb-2 font-semibold">Edit Kategori Surat</h1>
          <p className="items-center text-center text-sm">Berikut ini adalah halaman untuk mengedit kategori surat.</p>

          <form onSubmit={handleUpdate} className="mt-5 mx-7">
            <TextField label="ID" value={id} disabled fullWidth margin="normal" size="small" />
            <TextField
              label="Nama Kategori"
              value={namaKategori}
              onChange={(e) => setNamaKategori(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <Typography align="center" mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
              </Button>
            </Typography>
          </form>

          {/* Navigasi kembali */}
          <div className="mt-14 ml-7">
            <Link to={"/kategori"}>
              <Button variant="contained" color="success" size="small" startIcon={<ArrowBackIcon />}>
                Kembali
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </LoadingErrorWrapper>
  );
}

export default EditKategoriPage;
