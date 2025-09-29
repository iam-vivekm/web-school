import { useParams, useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Dashboard } from "./Dashboard";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

const StudentAssignments = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Assignments</h1>
    <p className="text-muted-foreground mb-6">View and submit your assignments.</p>
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Mathematics Assignment - Algebra</h3>
        <p className="text-sm text-muted-foreground">Due: March 20, 2024</p>
        <p className="mt-2">Solve the following algebraic equations...</p>
        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Submitted</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Grade: A-</span>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Physics Lab Report</h3>
        <p className="text-sm text-muted-foreground">Due: March 25, 2024</p>
        <p className="mt-2">Write a detailed report on the pendulum experiment...</p>
        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Pending</span>
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">2 days left</span>
        </div>
      </div>
    </div>
  </div>
);

const StudentAttendance = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Attendance</h1>
    <p className="text-muted-foreground mb-6">View your attendance record.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Monthly Overview</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Present Days</span>
            <span className="text-green-600">22</span>
          </div>
          <div className="flex justify-between">
            <span>Absent Days</span>
            <span className="text-red-600">2</span>
          </div>
          <div className="flex justify-between">
            <span>Total Days</span>
            <span>24</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Attendance Rate</span>
            <span className="text-blue-600">92%</span>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Recent Attendance</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Today</span>
            <span className="text-green-600">Present</span>
          </div>
          <div className="flex justify-between">
            <span>Yesterday</span>
            <span className="text-green-600">Present</span>
          </div>
          <div className="flex justify-between">
            <span>March 15</span>
            <span className="text-red-600">Absent</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentExams = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Exams & Results</h1>
    <p className="text-muted-foreground mb-6">View your exam results and upcoming exams.</p>
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Results</h3>
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold">Mathematics Mid-term</h4>
            <p className="text-sm text-muted-foreground">March 10, 2024</p>
            <div className="mt-2 flex gap-4">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Score: 85/100</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Grade: A</span>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold">Physics Quiz</h4>
            <p className="text-sm text-muted-foreground">March 5, 2024</p>
            <div className="mt-2 flex gap-4">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Score: 18/20</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Grade: A-</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Exams</h3>
        <div className="bg-card p-4 rounded-lg border">
          <h4 className="font-semibold">English Literature Final</h4>
          <p className="text-sm text-muted-foreground">April 15, 2024 - 2 hours</p>
          <p className="mt-2">Study chapters 5-8, focus on Shakespeare analysis.</p>
        </div>
      </div>
    </div>
  </div>
);

const StudentFees = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Fee Status</h1>
    <p className="text-muted-foreground mb-6">View your fee payments and outstanding balances.</p>
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Tuition Fee - Semester 2</h3>
        <p className="text-sm text-muted-foreground">Due: April 15, 2024</p>
        <div className="mt-2 flex gap-4">
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Outstanding: $500</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Due in 15 days</span>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Library Fee - Annual</h3>
        <p className="text-sm text-muted-foreground">Paid: March 1, 2024</p>
        <div className="mt-2 flex gap-4">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Paid: $50</span>
        </div>
      </div>
    </div>
  </div>
);

const StudentGrades = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Grades</h1>
    <p className="text-muted-foreground mb-6">View your academic grades and performance.</p>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Current Semester Grades</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Mathematics:</span>
              <span className="font-bold text-blue-600">A</span>
            </div>
            <div className="flex justify-between">
              <span>Physics:</span>
              <span className="font-bold text-blue-600">A-</span>
            </div>
            <div className="flex justify-between">
              <span>Chemistry:</span>
              <span className="font-bold text-green-600">B+</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>English:</span>
              <span className="font-bold text-green-600">B+</span>
            </div>
            <div className="flex justify-between">
              <span>History:</span>
              <span className="font-bold text-blue-600">A-</span>
            </div>
            <div className="flex justify-between">
              <span>Computer Science:</span>
              <span className="font-bold text-blue-600">A</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Grade Point Average</h3>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">3.7</div>
          <div className="text-sm text-muted-foreground">Out of 4.0</div>
          <div className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded inline-block">Excellent Performance</div>
        </div>
      </div>
    </div>
  </div>
);

const StudentTimetable = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Timetable</h1>
    <p className="text-muted-foreground mb-6">View your daily class schedule.</p>
    <div className="bg-card p-4 rounded-lg border">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
          <div>
            <div className="font-medium">9:00 - 10:00</div>
            <div className="text-sm text-muted-foreground">Mathematics</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Dr. Priya Sharma</div>
            <div className="text-xs text-muted-foreground">Room 201</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-green-50 rounded">
          <div>
            <div className="font-medium">10:00 - 11:00</div>
            <div className="text-sm text-muted-foreground">Physics</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Prof. Amit Singh</div>
            <div className="text-xs text-muted-foreground">Lab 301</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
          <div>
            <div className="font-medium">11:30 - 12:30</div>
            <div className="text-sm text-muted-foreground">English Literature</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Ms. Kavita Rao</div>
            <div className="text-xs text-muted-foreground">Room 105</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
          <div>
            <div className="font-medium">2:00 - 3:00</div>
            <div className="text-sm text-muted-foreground">Computer Science</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Mr. Vikram Jain</div>
            <div className="text-xs text-muted-foreground">Lab 401</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StudentMessages = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Messages</h1>
    <p className="text-muted-foreground mb-6">View messages from teachers and administrators.</p>
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">From: Dr. Priya Sharma (Mathematics)</h3>
        <p className="text-blue-800 dark:text-blue-200 mt-2">Great work on your algebra assignment! Keep up the excellent progress.</p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">2 days ago</p>
      </div>
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100">School Notice</h3>
        <p className="text-green-800 dark:text-green-200 mt-2">Annual Sports Day registration is now open. Check the notice board for details.</p>
        <p className="text-xs text-green-600 dark:text-green-400 mt-2">1 week ago</p>
      </div>
    </div>
  </div>
);

export function StudentPortal() {
  const params = useParams();
  const [, navigate] = useLocation();

  const page = params.page || 'dashboard';
  const userName = 'Aarav Sharma';

  const handleLogout = () => navigate('/');

  const renderPage = () => {
    switch(page) {
      case 'dashboard': return <Dashboard userRole="student" userName={userName} />;
      case 'timetable': return <StudentTimetable />;
      case 'assignments': return <StudentAssignments />;
      case 'grades': return <StudentGrades />;
      case 'attendance': return <StudentAttendance />;
      case 'exams': return <StudentExams />;
      case 'fees': return <StudentFees />;
      case 'messages': return <StudentMessages />;
      default: return <Dashboard userRole="student" userName={userName} />;
    }
  };

  const style = { "--sidebar-width": "18rem", "--sidebar-width-icon": "3rem" };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole="student" userName={userName} />
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
