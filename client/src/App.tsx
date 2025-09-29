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
import { SignupPage } from "./components/SignupPage";
import { SigninPage } from "./components/SigninPage";
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
            <Button variant="outline" onClick={() => navigate('/signin')} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button variant="outline" onClick={() => navigate('/signup')} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign Up
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to EduManage</h1>
          <p className="text-xl text-muted-foreground mb-8">School Management System for Administrators, Teachers, Students & Parents</p>
          <div className="flex gap-4 justify-center mb-8">
            <Button onClick={() => navigate('/signup')} size="lg" className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Create Account
            </Button>
          </div>
        </div>

        <RoleSelector
          onSelectRole={handleSelectRole}
          selectedRole="student"
        />

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            New to EduManage? <button onClick={() => navigate('/signup')} className="text-primary hover:underline font-medium">Sign up here</button>
          </p>
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/signup" component={SignupPage} />
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
