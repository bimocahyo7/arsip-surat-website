import axios from "axios";

const BASE_URL = "http://localhost:4000";

async function getKategori() {
  try {
    const response = await axios.get(`${BASE_URL}/kategori`);

    return { error: false, code: response.status, data: response.data };
  } catch (error) {
    console.error("Error fetching kategori:", error);
    return { error: true, code: error.response?.status || 500, data: null };
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
    const response = await axios.post(`${BASE_URL}/kategori/`, {
      namaKategori,
      keterangan,
    });

    return { error: false, code: response.status };
  } catch (error) {
    console.log("Error menambahkan kategori", error);
    return { error: true, code: error.response?.status || 500 };
  }
}

export { getKategori, deleteKategori, addKategori };
