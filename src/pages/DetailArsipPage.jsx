import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getSuratById, downloadSurat, updateFileSurat } from "../utils/api";
import toast from "react-hot-toast";

function DetailArsipPage() {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchSurat = async () => {
      try {
        const response = await getSuratById(id);
        setSurat(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurat();
  }, [id]);

  const handleDownload = async () => {
    try {
      const downloadResponse = await downloadSurat(id);
      if (downloadResponse.error) {
        console.error("Error downloading surat:", downloadResponse);
      }
    } catch (error) {
      console.error("Error downloading surat:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateFile = async () => {
    if (!file) return;

    try {
      await updateFileSurat(id, { fileDokumen: file });
      toast.success("File berhasil diupdate");
    } catch (error) {
      console.error("Error updating file:", error);
      toast.error("Gagal mengupdate file");
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <div className="loading-container">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <div className="error-container">
            <Typography variant="h5" color="error">
              Error: {error.message}
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl text-center mb-2 font-semibold">Detail Arsip Surat</h1>
          <Typography className="items-center text-center text-sm">
            Berikut ini adalah halaman detail dari surat yang ada.
          </Typography>
        </div>
        <Typography variant="body1" gutterBottom>
          ID Surat: {id}
        </Typography>
        {surat && (
          <div>
            <Typography variant="body1" gutterBottom>
              Nomor Surat: {surat.nomorSurat}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Kategori: {surat.kategori}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Judul: {surat.judul}
            </Typography>
            <Button variant="contained" onClick={handleDownload}>
              Download Surat
            </Button>
            <div style={{ marginTop: "20px" }}>
              <input type="file" onChange={handleFileChange} />
              <Button variant="contained" color="primary" onClick={handleUpdateFile} disabled={!file}>
                Update File
              </Button>
            </div>
          </div>
        )}

        <div className="mt-20 ml-7">
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

export default DetailArsipPage;
