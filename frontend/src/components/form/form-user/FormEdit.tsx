import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { updateUser } from "../../../services/api";
import Button from "../../ui/button/Button";
import Swal from 'sweetalert2'


interface FormEditProps {
  title: string;
  data: {
    id: string | number;
    email: string;
    password?: string;
    image?: File | string;
  };
  onSuccess?: () => void;
}

export default function FormEdit({ title, data, onSuccess }: FormEditProps) {
  const [form, setForm] = useState({ ...data });
  const token = localStorage.getItem("token") ?? "";
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("email", form.email);
      if (form.image) data.append("image", form.image);
      await updateUser(form.id, data, token);
      Swal.fire({
        title: "Berhasil Edit Data",
        icon: "success",
        draggable: true
      });
      setForm({ id: form.id, email: "", password: "", image: "" });
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
            <Label htmlFor="email">Email</Label>
            <Input type="Email" id="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="password">Photo</Label>
            <input
              type="file"
              className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              accept="image/*"
              onChange={(e) => setForm({ ...form, image: e.target.files && e.target.files[0] ? e.target.files[0] : "" })}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="sm" variant="warning">
              Edit
            </Button>
          </div>
        </div>
      </form>
    </ComponentCard>
  );
}
