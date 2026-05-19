import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { createKategori } from "../../../services/api";
import Button from "../../ui/button/Button";
import Swal from "sweetalert2";


interface FormTambahProps {
  title: string;
  onSuccess?: () => void;
}

export default function FormTambah({ title, onSuccess }: FormTambahProps) {
  const [namaKategori, setNamaKategori] = useState({ kategori: "" });
  const token = localStorage.getItem("token") ?? "";

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await createKategori(namaKategori, token);
      Swal.fire({
        title: "Berhasil Tambah Data",
        icon: "success",
        draggable: true
      });
      setNamaKategori({ kategori: "" });
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
      {/* <form onSubmit={createState} className="mb-4"> */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="space-y-6">
          <div>
            <Label htmlFor="input">Nama Kategori</Label>
            <Input type="text" id="input" placeholder="Nama Kategori" value={namaKategori.kategori} onChange={(e) => setNamaKategori({ kategori: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="" size="sm" variant="primary">
              Tambah
            </Button>
          </div>
        </div>
      </form>
      {/* </form> */}
    </ComponentCard>
  );
}
