import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { downloadSurat } from "../utils/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import toast from "react-hot-toast";

export default function TabelSurat({ data, onDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}.${minute}`;
  };

  const handleDialogOpen = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedId(null);
    setOpenDialog(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(selectedId);
    handleDialogClose();
  };

  const handleDownloadSurat = async (id) => {
    try {
      const response = await downloadSurat(id);
      if (!response.error) {
        console.log("Surat berhasil diunduh!");
      } else {
        console.error("Gagal mengunduh surat.");
      }
    } catch (error) {
      console.error("Error downloading surat:", error);
      toast.error("Error saat mendownload", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-slate-200">
          <TableRow>
            <TableCell align="center" sx={{ width: 150, padding: "6px 16px" }}>
              Nomor Surat
            </TableCell>
            <TableCell align="center" sx={{ width: 150, padding: "6px 16px" }}>
              Kategori
            </TableCell>
            <TableCell align="center" sx={{ width: 200, padding: "6px 16px" }}>
              Judul
            </TableCell>
            <TableCell align="center" sx={{ width: 200, padding: "6px 16px" }}>
              Waktu Arsip
            </TableCell>
            <TableCell align="center" sx={{ width: 200, padding: "6px 16px" }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell
                align="center"
                sx={{ padding: "6px 16px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {item.nomorSurat}
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: "6px 16px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {item.kategori}
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: "6px 16px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {item.judul}
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: "6px 16px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {formatDate(item.createdAt)}
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Link to={`/arsip/detail/${item.id}`}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<KeyboardDoubleArrowRightIcon />}>
                      Detail
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownloadSurat(item.id)}>
                    Unduh
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDialogOpen(item.id)}>
                    Hapus
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog konfirmasi hapus*/}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
        <DialogContent>
          <DialogContentText>Apakah Anda yakin ingin menghapus arsip surat ini?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleDialogClose} color="primary">
            Batal
          </Button>
          <Button variant="outlined" onClick={handleDeleteConfirm} color="error" autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

TabelSurat.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
