import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import FormEdit from "../../form/form-balas-otomatis/FormEdit";

// Tipe data balasan otomatis
interface BalasOtomatis {
  id: number;
  nama: string;
  perintah: string;
  balasan: string;
}

// Props komponen
interface TableBalasOtomatisProps {
  data: BalasOtomatis[];
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function TableBalasOtomatis({ data = [], onDelete, onEdit }: TableBalasOtomatisProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [kontakEdit, setKontakEdit] = useState<BalasOtomatis>({
    id: 0,
    nama: "",
    perintah: "",
    balasan: "",
  });

  const handleEdit = (item: BalasOtomatis) => {
    setKontakEdit(item);
    openModal();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
        <FormEdit
          title="Edit Balasan Otomatis"
          data={kontakEdit}
          onSuccess={() => {
            onEdit();
            closeModal();
          }}
        />
      </Modal>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 width font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">No</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nama</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Perintah</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Balasan</TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Aksi</TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item: BalasOtomatis, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start dark:text-gray-400 ">{index + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.nama}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.perintah}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{item.balasan}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Button type="button" size="sm" onClick={() => handleEdit(item)} variant="warning">
                        Edit
                      </Button>
                      {/* Jika ButtonProps tidak support "error", ubah jadi outline atau extend tipenya */}
                      <Button type="button" size="sm" onClick={() => onDelete(item.id)} variant="error">
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
