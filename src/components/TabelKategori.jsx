import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TabelKategori({ data, onDelete }) {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(deleteItemId);
    setDeleteItemId(null); // Reset delete item ID
    setOpenDialog(false); // Tutup dialog setelah penghapusan
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id); // Simpan ID item yang akan dihapus
    setOpenDialog(true); // Buka dialog konfirmasi penghapusan
  };

  const handleDialogClose = () => {
    setDeleteItemId(null); // Reset delete item ID
    setOpenDialog(false); // Tutup dialog tanpa menghapus
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%", margin: "auto" }} aria-label="simple table">
        <TableHead className="bg-slate-200">
          <TableRow>
            <TableCell align="center" sx={{ border: 1 }}>
              ID Kategori
            </TableCell>
            <TableCell align="center" sx={{ border: 1 }}>
              Nama Kategori
            </TableCell>
            <TableCell align="center" sx={{ border: 1 }}>
              Keterangan
            </TableCell>
            <TableCell align="center" sx={{ border: 1 }}>
              Aksi
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 1 } }}>
              <TableCell component="th" scope="row" align="center" sx={{ border: 1 }}>
                {item.id}
              </TableCell>
              <TableCell align="center" sx={{ border: 1 }}>
                {item.namaKategori}
              </TableCell>
              <TableCell align="center" sx={{ border: 1 }}>
                {item.keterangan}
              </TableCell>
              <TableCell align="center" sx={{ border: 1 }}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Link to={`/kategori/edit/${item.id}`}>
                    <Button variant="contained" color="secondary" size="small" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      handleDeleteClick(item.id);
                    }}>
                    Delete
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
          <DialogContentText>Apakah Anda yakin ingin menghapus kategori ini?</DialogContentText>
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

TabelKategori.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};
