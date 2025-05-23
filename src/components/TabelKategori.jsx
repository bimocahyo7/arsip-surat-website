import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
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
import EditIcon from "@mui/icons-material/Edit";

export default function TabelKategori({ data, onDelete }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="bg-slate-200">
          <TableRow>
            <TableCell align="center" sx={{ width: 150, padding: "6px 16px" }}>
              ID Kategori
            </TableCell>
            <TableCell align="center" sx={{ width: 150, padding: "6px 16px" }}>
              Nama Kategori
            </TableCell>
            <TableCell align="center" sx={{ width: 200, padding: "6px 16px" }}>
              Keterangan
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
                {item.id}
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: "6px 16px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {item.namaKategori}
              </TableCell>
              <TableCell
                align="center"
                sx={{ padding: "6px 16px", borderLeft: "1px solid #ddd", borderRight: "1px solid #ddd" }}>
                {item.keterangan}
              </TableCell>
              <TableCell align="center">
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
                    onClick={() => handleDialogOpen(item.id)}>
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
