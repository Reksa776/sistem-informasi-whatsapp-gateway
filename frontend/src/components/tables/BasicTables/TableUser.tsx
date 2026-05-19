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
import FormEdit from "../../form/form-user/FormEdit";

// Tipe untuk User
interface User {
  id: number;
  email: string;
  password?: string;
  image?: string;
  role: string;
}

interface TableUserProps {
  data: User[];
  onDelete: (id: number) => void;
  onEdit: () => void;
}

const IMAGE_URL = "http://103.127.97.79:5000/uploads/";

export default function TableUser({ data = [], onDelete, onEdit }: TableUserProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [userEdit, setUserEdit] = useState<User | null>(null);

  const handleEdit = (item: User) => {
    setUserEdit(item);
    openModal();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        {userEdit && (
          <FormEdit
            title="Edit User"
            data={userEdit}
            onSuccess={() => {
              onEdit();
              closeModal();
            }}
          />
        )}
      </Modal>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 width font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Foto
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start dark:text-gray-400 ">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.image && (
                      <img
                        src={`${IMAGE_URL}${item.image}`}
                        alt="user"
                        className="w-16 h-16 mt-2 rounded-full object-cover"
                      />
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {item.role === "member" && (
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
                          variant="error"
                        >
                          Hapus
                        </Button>
                      </div>
                    )}
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
