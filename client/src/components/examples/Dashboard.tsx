import { Dashboard } from '../Dashboard';

export default function DashboardExample() {
  return (
    <div className="p-6">
      <Dashboard 
        userRole="admin"
        userName="Sarah Johnson"
      />
    </div>
  );
}