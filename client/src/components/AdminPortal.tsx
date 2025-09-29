import { useParams } from "wouter";

export function AdminPortal() {
  const params = useParams();
  const page = params.page || 'dashboard';

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Administrator Portal</h1>
      <p className="text-muted-foreground mb-6">Current page: {page}</p>

      {page === 'parents' && (
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Parents Management</h2>
          <p className="text-muted-foreground mb-6">Manage parent records and communication.</p>
          <p>Parent management features coming soon...</p>
        </div>
      )}

      {page === 'dashboard' && (
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p>Welcome to the Administrator Dashboard</p>
        </div>
      )}

      {!['parents', 'dashboard'].includes(page) && (
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">{page} Page</h2>
          <p>This page is under development.</p>
        </div>
      )}
    </div>
  );
}
