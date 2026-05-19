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
import FormEdit from "../../form/form-kontak/FormEdit";

// Define the shape of a contact
interface Kontak {
  id: number;
  name: string;
  email: string;
  nomor: string;
  kategori: string;
}

interface TableKontakProps {
  data?: Kontak[];
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function TableKontak({ data = [], onDelete, onEdit }: TableKontakProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [kontakEdit, setKontakEdit] = useState<Kontak>({
    id: 0,
    name: "",
    email: "",
    nomor: "",
    kategori: "",
  });

  const handleEdit = (item: Kontak) => {
    setKontakEdit(item);
    openModal();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <FormEdit
          title="Edit Kontak"
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
                <TableCell isHeader className="px-5 py-3 width font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  No
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Email
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nomor
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Kategori
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.nomor}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.kategori}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        variant="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => onDelete(item.id)}
                        variant="error" // swapped from "error"
                      >
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
