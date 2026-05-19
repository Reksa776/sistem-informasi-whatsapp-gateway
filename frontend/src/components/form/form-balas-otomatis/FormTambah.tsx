// components/form/form-balas-otomatis/FormTambah.tsx
import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { createBalasOtomatis } from "../../../services/api";
import Button from "../../ui/button/Button";
import Swal from "sweetalert2";

interface FormTambahProps {
  title: string;
  onSuccess?: () => void;
}

export default function FormTambah({ title, onSuccess }: FormTambahProps) {
  const [form, setForm] = useState({ nama: "", perintah: "", balasan: "" });
const token = localStorage.getItem("token") ?? "";

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await createBalasOtomatis(form, token);
      Swal.fire({
        title: "Berhasil Tambah Data",
        icon: "success",
        draggable: true
      });
      setForm({ nama: "", perintah: "", balasan: "" });
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input
            type="text"
            id="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="perintah">Perintah</Label>
          <Input
            type="text"
            id="perintah"
            placeholder="Perintah"
            value={form.perintah}
            onChange={(e) => setForm({ ...form, perintah: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="balasan">Balasan</Label>
          <Input
            type="text"
            id="balasan"
            placeholder="Balasan"
            value={form.balasan}
            onChange={(e) => setForm({ ...form, balasan: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="sm" variant="primary">
            Tambah
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
