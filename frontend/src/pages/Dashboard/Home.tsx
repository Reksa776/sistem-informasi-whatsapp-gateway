import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 ">
          <EcommerceMetrics />

        </div>

        <div className="col-span-12">
          <UserMetaCard />
        </div>
      </div>
    </>
  );
}
