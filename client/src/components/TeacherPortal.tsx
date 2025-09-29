import { useParams, useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Dashboard } from "./Dashboard";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { School, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TeacherAssignments = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assignments] = useState([
    { id: 1, title: "Mathematics Assignment - Algebra", subject: "Mathematics", class: "10-A", dueDate: "2024-03-20", submitted: 28, total: 30, status: "Active" },
    { id: 2, title: "Physics Lab Report", subject: "Physics", class: "11-A", dueDate: "2024-03-25", submitted: 15, total: 30, status: "Active" },
    { id: 3, title: "English Essay", subject: "English", class: "10-A", dueDate: "2024-03-18", submitted: 30, total: 30, status: "Completed" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-muted-foreground">Create and manage assignments for your classes.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" placeholder="Assignment title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">Subject</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">Class</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10-A">Grade 10 - Section A</SelectItem>
                    <SelectItem value="10-B">Grade 10 - Section B</SelectItem>
                    <SelectItem value="9-A">Grade 9 - Section A</SelectItem>
                    <SelectItem value="9-B">Grade 9 - Section B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Input id="dueDate" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                <Textarea id="description" placeholder="Assignment description..." className="col-span-3" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Create Assignment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Submission</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell>{assignment.subject}</TableCell>
                <TableCell>{assignment.class}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.submitted}/{assignment.total}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    assignment.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {assignment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const TeacherAttendance = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Attendance Management</h1>
    <p className="text-muted-foreground mb-6">Mark and view student attendance for your classes.</p>
    <div className="bg-card p-4 rounded-lg border">
      <h3 className="font-semibold mb-4">Today's Attendance - Mathematics (Grade 10)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-2 border rounded">
          <span>John Smith</span>
          <span className="text-green-600">Present</span>
        </div>
        <div className="flex items-center justify-between p-2 border rounded">
          <span>Emma Davis</span>
          <span className="text-green-600">Present</span>
        </div>
        <div className="flex items-center justify-between p-2 border rounded">
          <span>Michael Johnson</span>
          <span className="text-red-600">Absent</span>
        </div>
      </div>
    </div>
  </div>
);

const TeacherExams = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Exams & Assessments</h1>
    <p className="text-muted-foreground mb-6">Create and manage exams, quizzes, and assessments.</p>
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Mid-term Mathematics Exam</h3>
        <p className="text-sm text-muted-foreground">Date: April 5, 2024</p>
        <p className="mt-2">Comprehensive exam covering algebra and geometry.</p>
        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Grade 10</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Duration: 2 hours</span>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Physics Quiz - Chapter 5</h3>
        <p className="text-sm text-muted-foreground">Date: March 22, 2024</p>
        <p className="mt-2">Short quiz on Newton's laws.</p>
        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Grade 11</span>
          <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">Duration: 30 min</span>
        </div>
      </div>
    </div>
  </div>
);

const TeacherClasses = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Classes</h1>
    <p className="text-muted-foreground mb-6">Manage your assigned classes and students.</p>
    <div className="space-y-4">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Class 10-A Mathematics</h3>
        <p className="text-sm text-muted-foreground">Grade 10, Section A</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">42</div>
            <div className="text-sm text-muted-foreground">Present Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-muted-foreground">Assignments Due</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">88%</div>
            <div className="text-sm text-muted-foreground">Avg. Attendance</div>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Class 9-B Mathematics</h3>
        <p className="text-sm text-muted-foreground">Grade 9, Section B</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">38</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">35</div>
            <div className="text-sm text-muted-foreground">Present Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">2</div>
            <div className="text-sm text-muted-foreground">Assignments Due</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">92%</div>
            <div className="text-sm text-muted-foreground">Avg. Attendance</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherGrades = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Gradebook</h1>
    <p className="text-muted-foreground mb-6">View and manage student grades and assessments.</p>
    <div className="bg-card p-4 rounded-lg border">
      <h3 className="font-semibold mb-4">Mathematics - Class 10-A</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Student Name</th>
              <th className="text-center p-2">Mid-term</th>
              <th className="text-center p-2">Quiz 1</th>
              <th className="text-center p-2">Quiz 2</th>
              <th className="text-center p-2">Final</th>
              <th className="text-center p-2">Overall</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Aarav Sharma</td>
              <td className="text-center p-2">85</td>
              <td className="text-center p-2">18/20</td>
              <td className="text-center p-2">16/20</td>
              <td className="text-center p-2">88</td>
              <td className="text-center p-2 font-semibold">A</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Priya Patel</td>
              <td className="text-center p-2">78</td>
              <td className="text-center p-2">17/20</td>
              <td className="text-center p-2">15/20</td>
              <td className="text-center p-2">82</td>
              <td className="text-center p-2 font-semibold">B+</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Rohan Kumar</td>
              <td className="text-center p-2">92</td>
              <td className="text-center p-2">19/20</td>
              <td className="text-center p-2">18/20</td>
              <td className="text-center p-2">95</td>
              <td className="text-center p-2 font-semibold">A+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TeacherStudents = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Students</h1>
    <p className="text-muted-foreground mb-6">View student information and performance.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Aarav Sharma</h3>
        <p className="text-sm text-muted-foreground">Roll No: 101</p>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Attendance:</span>
            <span className="text-green-600">94%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Mathematics:</span>
            <span className="text-blue-600">A</span>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Priya Patel</h3>
        <p className="text-sm text-muted-foreground">Roll No: 102</p>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Attendance:</span>
            <span className="text-green-600">89%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Mathematics:</span>
            <span className="text-blue-600">B+</span>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold">Rohan Kumar</h3>
        <p className="text-sm text-muted-foreground">Roll No: 103</p>
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Attendance:</span>
            <span className="text-green-600">96%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Mathematics:</span>
            <span className="text-blue-600">A+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherTimetable = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">My Timetable</h1>
    <p className="text-muted-foreground mb-6">View your weekly teaching schedule.</p>
    <div className="bg-card p-4 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Monday</h4>
          <div className="space-y-2">
            <div className="p-2 bg-blue-50 rounded text-sm">
              <div className="font-medium">9:00 - 10:00</div>
              <div>Mathematics - 10-A</div>
              <div className="text-xs text-muted-foreground">Room 201</div>
            </div>
            <div className="p-2 bg-green-50 rounded text-sm">
              <div className="font-medium">11:00 - 12:00</div>
              <div>Mathematics - 9-B</div>
              <div className="text-xs text-muted-foreground">Room 105</div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Tuesday</h4>
          <div className="space-y-2">
            <div className="p-2 bg-blue-50 rounded text-sm">
              <div className="font-medium">10:00 - 11:00</div>
              <div>Mathematics - 10-A</div>
              <div className="text-xs text-muted-foreground">Room 201</div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Wednesday</h4>
          <div className="space-y-2">
            <div className="p-2 bg-green-50 rounded text-sm">
              <div className="font-medium">9:00 - 10:00</div>
              <div>Mathematics - 9-B</div>
              <div className="text-xs text-muted-foreground">Room 105</div>
            </div>
            <div className="p-2 bg-blue-50 rounded text-sm">
              <div className="font-medium">2:00 - 3:00</div>
              <div>Mathematics - 10-A</div>
              <div className="text-xs text-muted-foreground">Room 201</div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Thursday</h4>
          <div className="space-y-2">
            <div className="p-2 bg-blue-50 rounded text-sm">
              <div className="font-medium">10:00 - 11:00</div>
              <div>Mathematics - 10-A</div>
              <div className="text-xs text-muted-foreground">Room 201</div>
            </div>
            <div className="p-2 bg-green-50 rounded text-sm">
              <div className="font-medium">1:00 - 2:00</div>
              <div>Mathematics - 9-B</div>
              <div className="text-xs text-muted-foreground">Room 105</div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Friday</h4>
          <div className="space-y-2">
            <div className="p-2 bg-green-50 rounded text-sm">
              <div className="font-medium">9:00 - 10:00</div>
              <div>Mathematics - 9-B</div>
              <div className="text-xs text-muted-foreground">Room 105</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TeacherMessages = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">Messages</h1>
    <p className="text-muted-foreground mb-6">Communicate with parents and administrators.</p>
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Message from Parent - Rajesh Sharma</h3>
        <p className="text-blue-800 dark:text-blue-200 mt-2">Regarding Aarav's recent mathematics assignment performance...</p>
        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">2 hours ago</p>
      </div>
      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-900 dark:text-green-100">Admin Notice</h3>
        <p className="text-green-800 dark:text-green-200 mt-2">Staff meeting scheduled for tomorrow at 3 PM in the conference hall...</p>
        <p className="text-xs text-green-600 dark:text-green-400 mt-2">1 day ago</p>
      </div>
    </div>
  </div>
);

export function TeacherPortal() {
  const params = useParams();
  const [, navigate] = useLocation();

  const page = params.page || 'dashboard';
  const userName = 'Dr. Priya Sharma';

  const handleLogout = () => navigate('/');

  const renderPage = () => {
    switch(page) {
      case 'dashboard': return <Dashboard userRole="teacher" userName={userName} />;
      case 'classes': return <TeacherClasses />;
      case 'students': return <TeacherStudents />;
      case 'attendance': return <TeacherAttendance />;
      case 'timetable': return <TeacherTimetable />;
      case 'assignments': return <TeacherAssignments />;
      case 'grades': return <TeacherGrades />;
      case 'exams': return <TeacherExams />;
      case 'messages': return <TeacherMessages />;
      default: return <Dashboard userRole="teacher" userName={userName} />;
    }
  };

  const style = { "--sidebar-width": "18rem", "--sidebar-width-icon": "3rem" };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar userRole="teacher" userName={userName} />
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
