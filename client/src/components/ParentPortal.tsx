import { useParams, useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Dashboard } from "./Dashboard";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";

const ParentChildProgress = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Child Progress</h1>
    <p className="text-muted-foreground mb-6">Monitor your child's academic progress and performance.</p>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Academic Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">A-</div>
            <div className="text-sm text-muted-foreground">Current GPA</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-muted-foreground">Attendance Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-sm text-muted-foreground">Assignments Completed</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Subject-wise Performance</h3>
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Mathematics</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Grade: A</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Latest exam: 85/100</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Physics</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Grade: A-</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Latest quiz: 18/20</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <span className="font-semibold">English</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Grade: B+</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Latest assignment: 78/100</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ParentFees = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Fee Management</h1>
    <p className="text-muted-foreground mb-6">View and manage your child's school fees.</p>
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
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Transportation Fee - March</h3>
        <p className="text-sm text-muted-foreground">Paid: March 8, 2024</p>
        <div className="mt-2 flex gap-4">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Paid: $120</span>
        </div>
      </div>
    </div>
  </div>
);

const ParentAttendance = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Child's Attendance</h1>
    <p className="text-muted-foreground mb-6">Monitor your child's attendance record.</p>
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
          <div className="flex justify-between">
            <span>March 14</span>
            <span className="text-green-600">Present</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ParentGrades = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Child's Grades & Results</h1>
    <p className="text-muted-foreground mb-6">Monitor your child's academic performance and grades.</p>
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Current Semester Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Mathematics:</span>
              <span className="font-bold text-blue-600">A (85/100)</span>
            </div>
            <div className="flex justify-between">
              <span>Physics:</span>
              <span className="font-bold text-blue-600">A- (18/20)</span>
            </div>
            <div className="flex justify-between">
              <span>Chemistry:</span>
              <span className="font-bold text-green-600">B+ (78/100)</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>English:</span>
              <span className="font-bold text-green-600">B+ (82/100)</span>
            </div>
            <div className="flex justify-between">
              <span>History:</span>
              <span className="font-bold text-blue-600">A- (88/100)</span>
            </div>
            <div className="flex justify-between">
              <span>Computer Science:</span>
              <span className="font-bold text-blue-600">A (92/100)</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Recent Assessments</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
            <div>
              <div className="font-medium">Mathematics Mid-term Exam</div>
              <div className="text-sm text-muted-foreground">March 10, 2024</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-blue-600">85/100</div>
              <div className="text-sm text-green-600">Grade: A</div>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded">
            <div>
              <div className="font-medium">Physics Lab Report</div>
              <div className="text-sm text-muted-foreground">March 8, 2024</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">18/20</div>
              <div className="text-sm text-green-600">Grade: A-</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ParentTimetable = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Child's Timetable</h1>
    <p className="text-muted-foreground mb-6">View your child's daily class schedule.</p>
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

const ParentMessages = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Messages</h1>
    <p className="text-muted-foreground mb-6">Communicate with teachers and school administration.</p>
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">From: Dr. Priya Sharma (Mathematics Teacher)</h3>
        <p className="text-blue-800 dark:text-blue-200 mt-2">Aarav has been doing excellent work in algebra. His recent test score was 85/100. Please encourage him to continue practicing regularly.</p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">2 days ago</p>
      </div>
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100">School Administration</h3>
        <p className="text-green-800 dark:text-green-200 mt-2">Parent-Teacher conference scheduled for next week. Please check your email for the appointment details.</p>
        <p className="text-xs text-green-600 dark:text-green-400 mt-2">1 week ago</p>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">From: Prof. Amit Singh (Physics Teacher)</h3>
        <p className="text-yellow-800 dark:text-yellow-200 mt-2">Aarav missed the physics lab session on March 15th. Please ensure he catches up on the experiment work.</p>
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">3 days ago</p>
      </div>
    </div>
  </div>
);

export function ParentPortal() {
  const params = useParams();
  const [, navigate] = useLocation();

  const page = params.page || 'dashboard';
  const userName = 'Rajesh Sharma';

  const handleLogout = () => navigate('/');

  const renderPage = () => {
    switch(page) {
      case 'dashboard': return <Dashboard userRole="parent" userName={userName} />;
      case 'child-progress': return <ParentChildProgress />;
      case 'grades': return <ParentGrades />;
      case 'timetable': return <ParentTimetable />;
      case 'fees': return <ParentFees />;
      case 'attendance': return <ParentAttendance />;
      case 'messages': return <ParentMessages />;
      default: return <Dashboard userRole="parent" userName={userName} />;
    }
  };

  const style = { "--sidebar-width": "18rem", "--sidebar-width-icon": "3rem" };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole="parent" userName={userName} />
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
