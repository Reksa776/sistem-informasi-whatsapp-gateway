import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import Label from "../Label";
import Input from "../input/InputField";
import { updateKategori } from "../../../services/api";
import { useState } from "react";
import Swal from "sweetalert2";


interface FormEditProps {
  title: string;
  data: { id: number; kategori: string };
  onSuccess?: () => void;
}

export default function FormEdit({ title, data, onSuccess }: FormEditProps) {
  const [form, setForm] = useState({ ...data });
  const token = localStorage.getItem("token") ?? "";
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await updateKategori(form.id, form, token);
      Swal.fire({
        title: "Berhasil Edit Data",
        icon: "success",
        draggable: true
      });
      setForm({ id: form.id, kategori: "" });
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
            <Label htmlFor="kategori">kategori</Label>
            <Input type="kategori" id="kategori" placeholder="Kategori" value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="" size="sm" variant="warning">
              Edit
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard >
  );
}
