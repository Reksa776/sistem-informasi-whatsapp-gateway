import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import Swal from "sweetalert2";
import { getKategori, updateGroup } from "../../../services/api";


interface FormEditProps {
  title: string;
  data: {
    id: string | number;
    name: string;
    kategori: string;
    [key: string]: any;
  };
  onSuccess?: () => void;
}

export default function FormEdit({ title, data, onSuccess }: FormEditProps) {
  const [form, setForm] = useState({ ...data });
  interface KategoriItem {
    id: string | number;
    kategori: string;
    [key: string]: any;
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
      await updateGroup(form.id, form, token);
      Swal.fire({
        title: "Berhasil Edit Data",
        icon: "success",
        draggable: true
      });
      setForm({ ...form, kategori: "" });
      if (onSuccess) onSuccess(); // Tutup modal dan reload tabel
    } catch (error) {
      console.error("Gagal menambah:", error);
    }
  };

  return (
    <ComponentCard title={title}>
      <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Nama Group</Label>
          <Input type="text" id="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
          <Button type="submit" className="" size="sm" variant="warning">
            Edit
          </Button>
        </div>
      </div>
      </form>
    </ComponentCard>
  );
}
