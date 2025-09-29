import { useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Dashboard } from "./Dashboard";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

export function AdminPortal() {
  const [location, navigate] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  const page = pathParts.length > 1 ? pathParts[1] : 'dashboard';

  const handleLogout = () => navigate('/');

  const renderPage = () => {
    switch(page) {
      case 'dashboard':
        return <Dashboard userRole="admin" userName="Dr. Ramesh Patel" />;
      case 'parents':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Parents Management</h1>
            <p className="text-muted-foreground mb-6">Manage parent records and communication.</p>
            <div className="bg-card p-6 rounded-lg border">
              <p>Parent management features coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{page} Page</h1>
            <p className="text-muted-foreground">This page is under development.</p>
          </div>
        );
    }
  };

  const style = { "--sidebar-width": "18rem", "--sidebar-width-icon": "3rem" };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole="admin" userName="Dr. Ramesh Patel" />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <School className="h-6 w-6 text-primary" />
                <span className="font-semibold font-heading">EduManage</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
