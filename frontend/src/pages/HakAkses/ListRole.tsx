import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import TableListRole from "../../components/tables/BasicTables/TableListRole";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="List Role"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="List Role" />
      <div className="space-y-6">
        <ComponentCard title="List Role">
        <TableListRole />
        </ComponentCard>
      </div>
    </div>
  );
}
