import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";
import { SchoolHero } from "./components/SchoolHero";
import { RoleSelector } from "./components/RoleSelector";
import { Button } from "@/components/ui/button";
import { LogIn, School } from "lucide-react";
import NotFound from "@/pages/not-found";
import { AdminPortal } from "./components/AdminPortal";
import { TeacherPortal } from "./components/TeacherPortal";
import { StudentPortal } from "./components/StudentPortal";
import { ParentPortal } from "./components/ParentPortal";
import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: '#fee', border: '1px solid #fcc', margin: '20px' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

function HomePage() {
  const [, navigate] = useLocation();

  const handleSelectRole = (role: 'admin' | 'teacher' | 'student' | 'parent') => {
    navigate(`/${role}/dashboard`);
  };

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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <RoleSelector
          onSelectRole={handleSelectRole}
          selectedRole="student"
        />
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminPortal} />
      <Route path="/admin/:page*" component={AdminPortal} />
      <Route path="/teacher" component={TeacherPortal} />
      <Route path="/teacher/:page*" component={TeacherPortal} />
      <Route path="/student" component={StudentPortal} />
      <Route path="/student/:page*" component={StudentPortal} />
      <Route path="/parent" component={ParentPortal} />
      <Route path="/parent/:page*" component={ParentPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  console.log('App component rendering');
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <Router />
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
