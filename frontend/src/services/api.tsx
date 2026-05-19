import axios, { AxiosResponse } from "axios";

const API_URL = "http://103.127.97.79:5000";

// ===== AUTH =====
export async function getLogin(email: string, password: string): Promise<AxiosResponse> {
  return axios.post(`${API_URL}/login/login`, { email, password });
}

// ===== KATEGORI =====
export const getKategori = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/kategori`, { headers: { Authorization: token } });

export const createKategori = (data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/kategori`, data, { headers: { Authorization: token } });

export const updateKategori = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.put(`${API_URL}/kategori/${id}`, data, { headers: { Authorization: token } });

export const deleteKategori = (id: number | string, token: string): Promise<AxiosResponse> =>
  axios.delete(`${API_URL}/kategori/${id}`, { headers: { Authorization: token } });

// ===== KONTAK =====
export const getKontak = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/kontak`, { headers: { Authorization: token } });

export const createKontak = (data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/kontak`, data, { headers: { Authorization: token } });

export const updateKontak = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.put(`${API_URL}/kontak/${id}`, data, { headers: { Authorization: token } });

export const deleteKontak = (id: number | string, token: string): Promise<AxiosResponse> =>
  axios.delete(`${API_URL}/kontak/${id}`, { headers: { Authorization: token } });

// ===== BALAS OTOMATIS =====
export const getBalasOtomatis = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/balas-otomatis`, { headers: { Authorization: token } });

export const createBalasOtomatis = (data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/balas-otomatis`, data, { headers: { Authorization: token } });

export const updateBalasOtomatis = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.put(`${API_URL}/balas-otomatis/${id}`, data, { headers: { Authorization: token } });

export const deleteBalasOtomatis = (id: number | string, token: string): Promise<AxiosResponse> =>
  axios.delete(`${API_URL}/balas-otomatis/${id}`, { headers: { Authorization: token } });

// ===== GROUP =====
export const getGroup = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/group`, { headers: { Authorization: token } });

export const createGroup = (data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/group`, data, { headers: { Authorization: token } });

export const updateGroup = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.put(`${API_URL}/group/${id}`, data, { headers: { Authorization: token } });

export const deleteGroup = (id: number | string, token: string): Promise<AxiosResponse> =>
  axios.delete(`${API_URL}/group/${id}`, { headers: { Authorization: token } });

// ===== JADWAL PESAN =====
export const getJadwalPesan = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/jadwal-pesan`, { headers: { Authorization: token } });

export const createJadwalPesan = (data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/jadwal-pesan`, data, { headers: { Authorization: token } });

export const updateJadwalPesan = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.put(`${API_URL}/jadwal-pesan/${id}`, data, { headers: { Authorization: token } });

export const deleteJadwalPesan = (id: number | string, token: string): Promise<AxiosResponse> =>
  axios.delete(`${API_URL}/jadwal-pesan/${id}`, { headers: { Authorization: token } });

// ===== USER =====
export const getUser = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/user`, { headers: { Authorization: token } });

export const createUser = (data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/user`, data, { headers: { Authorization: token } });

export const updateUser = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.put(`${API_URL}/user/${id}`, data, { headers: { Authorization: token } });

export const resetUserPassword = (id: number | string, data: Record<string, any>, token: string): Promise<AxiosResponse> =>
  axios.post(`${API_URL}/user/reset${id}`, data, { headers: { Authorization: token } });

export const deleteUser = (id: number | string, token: string): Promise<AxiosResponse> =>
  axios.delete(`${API_URL}/user/${id}`, { headers: { Authorization: token } });

// ===== ROLE =====
export const getListRole = (token: string): Promise<AxiosResponse> =>
  axios.get(`${API_URL}/listrole`, { headers: { Authorization: token } });

// ===== GLOBAL API CLIENT =====
const API = axios.create({
  baseURL: "http://103.127.97.79:5000/api",
  timeout: 15000,
});

export default API;
