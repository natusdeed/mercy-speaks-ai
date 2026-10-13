// EXCLUDED FROM BUNDLE (P0 hotfix): not imported anywhere. Must not be re-routed until
// rebuilt with server-side auth and server-side provider calls (no VITE_ secrets, no browser API calls).
import AdminGate from "../components/admin/AdminGate";
import ProspectingHub from "../components/admin/ProspectingHub";

export default function AdminProspecting() {
  return (
    <AdminGate>
      <ProspectingHub />
    </AdminGate>
  );
}
