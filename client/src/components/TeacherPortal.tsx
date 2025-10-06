import { useParams, useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Dashboard } from "./Dashboard";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { School, Plus, Edit, Trash2, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";

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

const TeacherAttendance = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<{[key: string]: 'present' | 'absent'}>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Get query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const classParam = urlParams.get('class');
  const sectionParam = urlParams.get('section');

  useEffect(() => {
    console.log('TeacherAttendance useEffect:', { classParam, sectionParam });
    if (classParam && sectionParam) {
      setSelectedClass(classParam);
      setSelectedSection(sectionParam);
      fetchStudents(classParam, sectionParam);
    }
  }, [classParam, sectionParam]);

  const fetchStudents = async (classGrade: string, section: string) => {
    console.log('Fetching students for:', classGrade, section);
    setLoading(true);
    try {
      const response = await fetch(`/api/students/class/${classGrade}/${section}`);
      console.log('Fetch response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched students:', data);
        setStudents(data);
        // Initialize attendance state and fetch existing attendance
        await initializeAttendanceForDate(data, selectedDate);
      } else {
        console.error('Failed to fetch students:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeAttendanceForDate = async (studentData: any[], date: string) => {
    // Initialize all students as present by default
    const initialAttendance: {[key: string]: 'present' | 'absent'} = {};
    studentData.forEach((student: any) => {
      initialAttendance[student.id] = 'present';
    });

    // Fetch existing attendance for this date
    try {
      const response = await fetch(`/api/attendance/class/${selectedClass}/${selectedSection}?date=${date}`);
      if (response.ok) {
        const existingAttendance = await response.json();
        console.log('Fetched existing attendance:', existingAttendance);

        // Update attendance state with existing data
        existingAttendance.forEach((record: any) => {
          initialAttendance[record.studentId] = record.status;
        });
      } else {
        console.log('No existing attendance found for this date, using defaults');
      }
    } catch (error) {
      console.error('Error fetching existing attendance:', error);
    }

    setAttendance(initialAttendance);
  };

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = async () => {
    if (!selectedClass || !selectedSection) return;

    setSaving(true);
    try {
      // Get current user from localStorage with proper validation
      let currentUserData = localStorage.getItem('eduManage_currentUser');
      let currentUser;

      if (!currentUserData) {
        // For testing purposes, create a mock teacher user in database
        try {
          const teacherData = {
            role: 'teacher' as const,
            firstName: 'John',
            lastName: 'Doe',
            email: `teacher_${Date.now()}@example.com`, // Make email unique
            password: 'password123',
            phone: null,
            employeeId: `T${Date.now()}`, // Make employeeId unique
            studentId: null,
            parentRelation: null,
            department: 'Mathematics',
            class: null,
            section: null
          };

          console.log('Creating mock teacher user:', teacherData);

          const createResponse = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData),
          });

          if (createResponse.ok) {
            const createdUser = await createResponse.json();
            localStorage.setItem('eduManage_currentUser', JSON.stringify(createdUser));
            currentUser = createdUser;
            console.log('Mock teacher user created successfully:', createdUser);
          } else {
            const errorData = await createResponse.json().catch(() => ({}));
            console.error('Failed to create teacher user:', errorData);

            // Try to find existing teacher user instead
            console.log('Attempting to find existing teacher user...');
            const signinResponse = await fetch('/api/auth/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: 'teacher@example.com',
                password: 'password123'
              }),
            });

            if (signinResponse.ok) {
              const existingUser = await signinResponse.json();
              localStorage.setItem('eduManage_currentUser', JSON.stringify(existingUser));
              currentUser = existingUser;
              console.log('Found existing teacher user:', existingUser);
            } else {
              alert(`Failed to create or find teacher user: ${errorData.message || 'Unknown error'}. Please try logging in properly.`);
              setSaving(false);
              return;
            }
          }
        } catch (error) {
          console.error('Error creating/finding teacher user:', error);
          alert('Error setting up teacher user. Please check your connection and try again.');
          setSaving(false);
          return;
        }
      } else {
        try {
          currentUser = JSON.parse(currentUserData);
        } catch (error) {
          console.error('Error parsing current user data:', error);
          localStorage.removeItem('eduManage_currentUser'); // Clear corrupted data
          alert('User session corrupted. Please refresh the page and try again.');
          setSaving(false);
          return;
        }
      }

      if (!currentUser || !currentUser.id) {
        alert('User ID not found. Please refresh the page and try again.');
        setSaving(false);
        return;
      }

      console.log('Using teacher user for attendance:', currentUser);

      // Verify the user still exists in the database
      try {
        const verifyResponse = await fetch(`/api/auth/verify/${currentUser.id}`);
        if (!verifyResponse.ok) {
          console.warn('User not found in database, clearing localStorage');
          localStorage.removeItem('eduManage_currentUser');

          // Try to sign in with default teacher credentials
          const signinResponse = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'teacher@example.com',
              password: 'password123'
            }),
          });

          if (signinResponse.ok) {
            const existingUser = await signinResponse.json();
            localStorage.setItem('eduManage_currentUser', JSON.stringify(existingUser));
            currentUser = existingUser;
            console.log('Re-authenticated with existing teacher user:', existingUser);
          } else {
            alert('User session expired. Please refresh the page and try again.');
            setSaving(false);
            return;
          }
        }
      } catch (error) {
        console.warn('Could not verify user, proceeding anyway:', error);
      }

      const attendanceData = students.map(student => ({
        studentId: student.id,
        date: selectedDate,
        status: attendance[student.id] || 'present',
        markedBy: currentUser.id,
        subject: 'General', // Could be made configurable
        class: selectedClass,
        section: selectedSection
      }));

      const response = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        alert('Attendance saved successfully!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Error saving attendance: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    // Fetch existing attendance for this date
    if (selectedClass && selectedSection && students.length > 0) {
      await initializeAttendanceForDate(students, date);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance Management</h1>
          <p className="text-muted-foreground">Mark and view student attendance for your classes.</p>
        </div>
      </div>

      {selectedClass && selectedSection ? (
        <div className="space-y-6">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Mark Attendance - Class {selectedClass}-{selectedSection}</h3>
              <div className="flex gap-4">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-40"
                />
                <Button onClick={handleSaveAttendance} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Attendance'}
                </Button>
              </div>
            </div>

            {loading ? (
              <div>Loading students...</div>
            ) : students.length === 0 ? (
              <div>No students found for this class. Try refreshing or check if the class/section exists.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <span className="font-medium">{student.firstName} {student.lastName}</span>
                      <span className="text-sm text-muted-foreground ml-2">({student.studentId})</span>
                    </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`present-${student.id}`}
                            name={`attendance-${student.id}`}
                            checked={attendance[student.id] === 'present'}
                            onChange={() => handleAttendanceChange(student.id, 'present')}
                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                          />
                          <Label htmlFor={`present-${student.id}`} className="text-sm text-green-600">
                            Present
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`absent-${student.id}`}
                            name={`attendance-${student.id}`}
                            checked={attendance[student.id] === 'absent'}
                            onChange={() => handleAttendanceChange(student.id, 'absent')}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                          />
                          <Label htmlFor={`absent-${student.id}`} className="text-sm text-red-600">
                            Absent
                          </Label>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-card p-4 rounded-lg border">
          <h3 className="font-semibold mb-4">Select a Class to Mark Attendance</h3>
          <p className="text-muted-foreground">Go to the Classes page and click "Mark Attendance" on any class.</p>
        </div>
      )}
    </div>
  );
};

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

const TeacherClasses = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "Class 10-A Mathematics", grade: "10", section: "A", students: 45, presentToday: 42, assignmentsDue: 3, avgAttendance: 88 },
    { id: 2, name: "Class 9-B Mathematics", grade: "9", section: "B", students: 38, presentToday: 35, assignmentsDue: 2, avgAttendance: 92 },
  ]);

  const handleMarkAttendance = (classItem: any) => {
    // Navigate to attendance marking for this class
    window.location.href = `/teacher/attendance?class=${classItem.grade}&section=${classItem.section}`;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Classes</h1>
          <p className="text-muted-foreground">Manage your assigned classes and students.</p>
        </div>
      </div>
      <div className="space-y-4">
        {classes.map((classItem) => (
          <div key={classItem.id} className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">{classItem.name}</h3>
                <p className="text-sm text-muted-foreground">Grade {classItem.grade}, Section {classItem.section}</p>
              </div>
              <Button onClick={() => handleMarkAttendance(classItem)} className="bg-primary hover:bg-primary/90">
                <UserCheck className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{classItem.students}</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{classItem.presentToday}</div>
                <div className="text-sm text-muted-foreground">Present Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{classItem.assignmentsDue}</div>
                <div className="text-sm text-muted-foreground">Assignments Due</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{classItem.avgAttendance}%</div>
                <div className="text-sm text-muted-foreground">Avg. Attendance</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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
  const [location, navigate] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  const page = pathParts.length > 1 ? pathParts[1] : 'dashboard';

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('eduManage_currentUser') || '{}');
  const userName = currentUser.firstName && currentUser.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : 'Teacher';

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
