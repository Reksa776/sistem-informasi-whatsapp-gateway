import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import QrInput from "../../components/form/form-elements/QrInput";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Perangkat" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 text-gray-800 dark:text-white/90">
        <QrInput></QrInput>
      </div>
    </div>
  );
}
