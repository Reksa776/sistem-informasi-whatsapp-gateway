import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { createJadwalPesan, getKategori } from "../../../services/api";
import Button from "../../ui/button/Button";
import Swal from "sweetalert2";


interface FormTambahProps {
  title: string;
  onSuccess?: () => void;
}

export default function FormTambah({ title, onSuccess }: FormTambahProps) {
  const [form, setForm] = useState({ name: "", kategori: "", email: "", nomor: undefined, pesan: "", tanggal: "", waktu: "" });
  interface KategoriItem {
    id: number;
    kategori: string;
  }
  const [kategori, setKategori] = useState<KategoriItem[]>([]);
  const token = localStorage.getItem("token") ?? "";

  const loadDB = async () => {
    try {
      const res = await getKategori(token);
      setKategori(res.data);
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };

  useEffect(() => {
    loadDB();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await createJadwalPesan(form, token);
      Swal.fire({
        title: "Berhasil Tambah Data",
        icon: "success",
        draggable: true
      });
      setForm({ name: "", kategori: "", email: "", nomor: undefined, pesan: "", tanggal: "", waktu: "" });
      if (onSuccess) onSuccess(); // Tutup modal dan reload tabel
    } catch (error) {
      Swal.fire({
        title: "Gagal Tambah Data",
        icon: "error",
        draggable: true
      });
      if (onSuccess) onSuccess();
      console.error("Gagal menambah:", error);
    }
  };

  return (
    <ComponentCard title={title}>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="space-y-6">
          <div>
            <Label htmlFor="pesan">Pesan</Label>
            <Input type="text" id="pesan" placeholder="Pesan" value={form.pesan} onChange={(e) => setForm({ ...form, pesan: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="Tanggal">Tanggal</Label>
            <Input type="date" id="Tanggal" placeholder="Tanggal" value={form.tanggal} onChange={(e) => setForm({ ...form, tanggal: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="Waktu">Waktu</Label>
            <Input type="time" id="Waktu" value={form.waktu} onChange={(e) => setForm({ ...form, waktu: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="kategori">Kategori</Label>
            <select id="kategori" value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
              <option value="" disabled>Pilih Kategori</option>
              {kategori.map((item) => (
                <option value={item.kategori} key={item.id}>{item.kategori}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="" size="sm" variant="primary">
              Tambah
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
