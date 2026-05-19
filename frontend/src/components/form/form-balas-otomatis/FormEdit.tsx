import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import { updateBalasOtomatis } from "../../../services/api";
import Swal from "sweetalert2";


interface FormEditProps {
  title: string;
  data: {
    id: string | number;
    nama: string;
    perintah: string;
    balasan: string;
    [key: string]: any;
  };
  onSuccess?: () => void;
}

export default function FormEdit({ title, data, onSuccess }: FormEditProps) {
  const [form, setForm] = useState({ ...data });
  console.log({ data });
const token = localStorage.getItem("token") ?? "";


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await updateBalasOtomatis(form.id, form, token);
      Swal.fire({
        title: "Berhasil Edit Data",
        icon: "success",
        draggable: true
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal update:", error);
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
          <Button type="submit" size="sm" variant="warning">
            Edit
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
