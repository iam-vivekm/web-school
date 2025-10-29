import { redirect } from 'next/navigation'
import { RoleSelector } from "../client/src/components/RoleSelector";
import { Button } from "../client/src/components/ui/button";
import { LogIn, School } from "lucide-react";

export default function HomePage() {
  const handleSelectRole = (role: 'admin' | 'teacher' | 'student' | 'parent') => {
    // In Next.js, we'll use redirect for navigation
    redirect(`/${role}/dashboard`);
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
            <Button variant="outline" onClick={() => redirect('/signin')} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button variant="outline" onClick={() => redirect('/signup')} className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to EduManage</h1>
          <p className="text-xl text-muted-foreground mb-8">School Management System for Administrators, Teachers, Students & Parents</p>
          <div className="flex gap-4 justify-center mb-8">
            <Button onClick={() => redirect('/signup')} size="lg" className="flex items-center gap-2">
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
            New to EduManage? <button onClick={() => redirect('/signup')} className="text-primary hover:underline font-medium">Sign up here</button>
          </p>
        </div>
      </main>
    </div>
  );
}
