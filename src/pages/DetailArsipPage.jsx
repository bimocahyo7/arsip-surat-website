import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import LoadingErrorWrapper from "../components/LoadingError";
import { getSuratById, downloadSurat } from "../utils/api";

function DetailArsipPage() {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}.${minute}`;
  };

  useEffect(() => {
    const fetchSuratData = async () => {
      try {
        const data = await getSuratById(id);
        setSurat(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuratData();
  }, [id]);

  const handleDownload = async () => {
    try {
      const result = await downloadSurat(id);
      if (result.error) {
        console.error("Error downloading surat:", result.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error downloading surat:", error);
    }
  };

  return (
    <LoadingErrorWrapper error={error} loading={loading}>
      <div className="bg-slate-200 min-h-full flex">
        <div className="container bg-white p-5 mx-5 my-5 rounded-lg shadow-md">
          <div className="mb-6 border-b text-center">
            <h1 className="text-2xl mb-2 font-semibold">Detail Arsip Surat</h1>
            <p className="text-sm mb-2">Berikut ini adalah halaman detail dari surat yang ada.</p>
          </div>
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
              <Typography variant="body1" gutterBottom>
                Waktu Arsip: {formatDate(surat.createdAt)}
              </Typography>
              {surat.fileDokumen ? (
                <div className="mt-4">
                  <iframe
                    src={`http://localhost:4000/uploads/${surat.fileDokumen}`}
                    width="100%"
                    height="500"
                    title="Surat Viewer"
                    onError={(e) => {
                      e.target.src = "";
                      e.target.parentNode.innerHTML = "<p>File tidak dapat ditampilkan</p>";
                    }}
                  />
                </div>
              ) : (
                <Typography variant="body2" color="error">
                  File tidak tersedia
                </Typography>
              )}
            </div>
          )}

          <div className="mt-20 flex gap-3">
            <Link to={"/arsip"}>
              <Button variant="contained" color="success" size="small" startIcon={<ArrowBackIcon />}>
                Kembali
              </Button>
            </Link>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={handleDownload}
              startIcon={<DownloadIcon />}>
              Download
            </Button>
            <Link to={`/arsip/edit-arsip/${id}`}>
              <Button variant="contained" color="info" size="small" startIcon={<EditIcon />}>
                Edit/Ganti File
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </LoadingErrorWrapper>
  );
}

export default DetailArsipPage;
