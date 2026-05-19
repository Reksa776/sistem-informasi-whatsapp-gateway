import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Label from "../../components/form/Label";
import { getKontak } from "../../services/api";
import Swal from "sweetalert2";

interface Kontak {
  id: number;
  name: string;
  nomor: string;
}
export default function KirimPesan() {
  const [nomor, setNomor] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("text");
  const [file, setFile] = useState<File | null>(null);
  const [contacts, setContacts] = useState<Kontak[]>([]);
  const [loading, setLoading] = useState("page");
const token = localStorage.getItem("token") ?? "";

  // ✅ Ambil kontak dari database
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const response = await getKontak(token);
    setContacts(response.data);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nomor", nomor);
    formData.append("type", type);
    formData.append("message", message);
    if (file) formData.append("file", file);

    try {
      setLoading("loading")
      await axios.post("http://103.127.97.79:5000/api/sending", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("");
      setFile(null);
      setLoading("page")
      Swal.fire({
        title: "Berhasil Mengirim Pesan!",
        icon: "success",
        draggable: true
      });
    } catch (err) {
      setLoading("page")
      Swal.fire({
        title: "Gagal Mengirim Pesan!",
        icon: "error",
        draggable: true
      });
    }
  };
  if (loading === "page") {
    return (
      <div>
        <PageMeta
          title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
          description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="Kirim Pesan" />
        <div className="min-h-auto rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ✅ Dropdown pilih nomor dari database */}
            <div>
              <Label htmlFor="nomor">Nama Kontak</Label>
              <select
                id="nomor"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                required
              >
                <option value="">-- Pilih Kontak --</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.nomor}>
                    {c.name} ({c.nomor})
                  </option>
                ))}
              </select>
            </div>

            {/* Pilih jenis pesan */}
            <div>
              <Label htmlFor="type">Jenis Pesan</Label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="document">Document</option>
              </select>
            </div>

            {/* Input pesan */}
            <div>
              <Label htmlFor="Pesan">Pesan</Label>
              <textarea
                id="Pesan"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan..."
                className="h-25 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              />
            </div>

            {/* Upload file kalau type ≠ text */}
            {type !== "text" && (
              <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
                className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              />
            )}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Kirim
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative w-full h-full">
        <PageMeta
          title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
          description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
        />
        <PageBreadcrumb pageTitle="Kirim Pesan" />
        <div >
          <ReactLoading type="cylon" color="#2b7fff" />
          <p className="text-gray-800 dark:text-white/90">Mengirim Pesan</p>
        </div>
      </div>
    );
  }


}
