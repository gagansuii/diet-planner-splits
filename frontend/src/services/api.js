import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

export async function analyzeFood(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/analyze-food/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export default api;
