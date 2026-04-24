import AdminGate from "../components/admin/AdminGate";
import ProspectingHub from "../components/admin/ProspectingHub";

export default function AdminProspecting() {
  return (
    <AdminGate>
      <ProspectingHub />
    </AdminGate>
  );
}
