import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import FormTambah from "../../components/form/form-jadwal-pesan/FormTambah";
import TableJadwalPesan from "../../components/tables/BasicTables/TableJadwalPesan";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import { deleteJadwalPesan, getJadwalPesan } from "../../services/api";
import Swal from "sweetalert2";

interface JadwalPesan {
  id: number
  pesan: string
  tanggal: string
  waktu: string
  kategori: string
}
export default function JadwalPesan() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState<JadwalPesan[]>([]);
const token = localStorage.getItem("token") ?? "";

  const loadDB = async () => {
    try {
      const res = await getJadwalPesan(token);
      setData(res.data);
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };
  useEffect(() => {
    loadDB();
  }, []);

  const handleSuccess = () => {
    closeModal();   // Tutup modal tambah
    loadDB();       // Refresh tabel
  };

  const handleDelete = async (id: any) => {
    Swal.fire({
      title: "Ingin Menghapus User?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          setData((prev) => {
            const newData = prev.filter((item) => item.id !== id);
            console.log("Data sesudah filter:", newData);
            return newData;  // ✅ penting: return array baru
          });
          await deleteJadwalPesan(id, token);
          loadDB();
          Swal.fire("Berhasil Menghapus!", "", "success");
        } catch (error) {
          Swal.fire("Gagal menghapus!", "", "error");
          loadDB();
          console.error("Gagal menghapus:", error);
        }
      }
    });

  };
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Jadwalkan Pesan" />
      <div className="space-y-6">
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        ><FormTambah title="Tambah Jadwal Pesan" onSuccess={handleSuccess}></FormTambah></Modal>
        <ComponentCard title={
          <Button onClick={openModal} size="sm" variant="primary">
            Tambah Kontak
          </Button>
        }>
          <TableJadwalPesan data={data} onDelete={handleDelete} onEdit={loadDB} />
        </ComponentCard>
      </div>
    </div>
  );
}
