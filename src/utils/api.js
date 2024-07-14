import axios from "axios";

const BASE_URL = "http://localhost:4000";

// KATEGORI
async function getKategori() {
  try {
    const response = await axios.get(`${BASE_URL}/kategori`);

    return { error: false, code: response.status, data: response.data };
  } catch (error) {
    console.error("Error fetching kategori:", error);
    return { error: true, code: error.response?.status || 500, data: null };
  }
}

async function getKategoriById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/kategori/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error get data kategori by id:", error);
    throw error;
  }
}

async function updateKategori(id, data) {
  try {
    const response = await axios.put(`${BASE_URL}/kategori/${id}`, data);
    return response.data;
  } catch (error) {
    console.log("Error edit data", error);
    throw error;
  }
}

async function deleteKategori(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/kategori/${id}`);
    return { error: false, code: response.status };
  } catch (error) {
    console.error("Error deleting kategori:", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

async function addKategori({ namaKategori, keterangan }) {
  try {
    const response = await axios.post(`${BASE_URL}/kategori`, {
      namaKategori,
      keterangan,
    });

    return { error: false, code: response.status };
  } catch (error) {
    console.log("Error menambahkan kategori", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

// SURAT
async function getSurat() {
  try {
    const response = await axios.get(`${BASE_URL}/surat`);
    return { error: false, code: response.status, data: response.data };
  } catch (error) {
    console.error("Error fetching surat:", error);
    return { error: true, code: error.response?.status || 500, data: null };
  }
}

async function getSuratById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/surat/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching surat with ID ${id}:`, error);
    throw error;
  }
}

async function addSurat({ nomorSurat, kategori, judul, fileDokumen }) {
  try {
    const formData = new FormData();
    formData.append("nomorSurat", nomorSurat);
    formData.append("kategori", kategori);
    formData.append("judul", judul);
    formData.append("fileDokumen", fileDokumen);

    const response = await axios.post(`${BASE_URL}/surat`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { error: false, code: response.status };
  } catch (error) {
    console.error("Error adding surat:", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

async function deleteSurat(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/surat/${id}`);
    return { error: false, code: response.status };
  } catch (error) {
    console.error("Error deleting surat:", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

async function downloadSurat(id) {
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}/surat/download/${id}`,
      responseType: "blob",
    });

    return { error: false, code: response.status, data: response.data };
  } catch (error) {
    console.error("Error downloading surat:", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

async function updateFileSurat(id, { fileDokumen }) {
  try {
    const formData = new FormData();
    if (fileDokumen) {
      formData.append("fileDokumen", fileDokumen);
    }

    const response = await axios.put(`${BASE_URL}/surat/update-file/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { error: false, code: response.status };
  } catch (error) {
    console.error("Error updating surat:", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

export {
  getKategori,
  deleteKategori,
  addKategori,
  getKategoriById,
  updateKategori,
  getSurat,
  getSuratById,
  addSurat,
  deleteSurat,
  downloadSurat,
  updateFileSurat,
};
