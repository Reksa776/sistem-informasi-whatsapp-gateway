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
import FormEdit from "../../form/form-group/FormEdit";

// Tipe data group
interface Group {
  id: number;
  name: string;
  kategori: string;
}

// Props
interface TableGroupProps {
  data: Group[];
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function TableGroup({ data = [], onDelete, onEdit }: TableGroupProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [groupEdit, setGroupEdit] = useState<Group>({
    id: 0,
    name: "",
    kategori: "",
  });

  const handleEdit = (item: Group) => {
    setGroupEdit(item);
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
          title="Edit Data"
          data={groupEdit}
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
                  Nama Group
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Nama Kategori
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item: Group, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start dark:text-gray-400">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.kategori}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Button type="button" onClick={() => handleEdit(item)} size="sm" variant="warning">
                        Edit
                      </Button>
                      {/* Ganti variant "error" ke "outline" kalau belum support */}
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
