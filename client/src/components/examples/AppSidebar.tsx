import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../AppSidebar';

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "3rem",
  };
  
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-[600px] w-full">
        <AppSidebar 
          userRole="admin"
          userName="Sarah Johnson"
        />
        <div className="flex-1 p-8 bg-background">
          <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
          <p className="text-muted-foreground">
            This is where the main dashboard content would appear. The sidebar adapts based on user role.
          </p>
        </div>
      </div>
    </SidebarProvider>
  );
}