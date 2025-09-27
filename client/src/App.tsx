import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { AppSidebar } from "./components/AppSidebar";
import { Dashboard } from "./components/Dashboard";
import { SchoolHero } from "./components/SchoolHero";
import { RoleSelector } from "./components/RoleSelector";
import { Button } from "@/components/ui/button";
import { LogIn, School } from "lucide-react";
import { useState } from "react";
import NotFound from "@/pages/not-found";

function HomePage() {
  const [currentView, setCurrentView] = useState<'hero' | 'roleSelector' | 'dashboard'>('hero');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student' | 'parent'>('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleGetStarted = () => {
    setCurrentView('roleSelector');
  };
  
  const handleSelectRole = (role: 'admin' | 'teacher' | 'student' | 'parent') => {
    setSelectedRole(role);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };
  
  const handleLogin = () => {
    setCurrentView('roleSelector');
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('hero');
  };
  
  const roleNames = {
    admin: 'Sarah Johnson',
    teacher: 'Dr. Jennifer Martinez', 
    student: 'Emily Johnson',
    parent: 'Michael Chen'
  };
  
  if (currentView === 'hero') {
    return (
      <div className="min-h-screen bg-background">
        <header className="absolute top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-heading">EduManage</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button onClick={handleLogin} data-testid="button-login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </header>
        
        <SchoolHero 
          schoolName="Springfield Academy"
          onGetStarted={handleGetStarted}
          onLearnMore={() => console.log('Learn more clicked')}
        />
      </div>
    );
  }
  
  if (currentView === 'roleSelector') {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-background border-b">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-heading">EduManage</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" onClick={() => setCurrentView('hero')} data-testid="button-back">
                Back to Home
              </Button>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-6 py-12">
          <RoleSelector 
            onSelectRole={handleSelectRole}
            selectedRole={selectedRole}
          />
        </main>
      </div>
    );
  }
  
  // Dashboard view with sidebar
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "3rem",
  };
  
  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar 
          userRole={selectedRole}
          userName={roleNames[selectedRole]}
        />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <div className="flex items-center gap-2">
                <School className="h-6 w-6 text-primary" />
                <span className="font-semibold font-heading">EduManage</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
                Logout
              </Button>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            <Dashboard 
              userRole={selectedRole}
              userName={roleNames[selectedRole]}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Router />
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
