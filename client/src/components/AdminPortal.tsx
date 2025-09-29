import { useLocation } from "wouter";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminStudents = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [students] = useState([
    { id: 1, name: "Aarav Sharma", rollNo: "101", class: "10-A", email: "aarav.sharma@email.com", phone: "+91-9876543210", status: "Active" },
    { id: 2, name: "Priya Patel", rollNo: "102", class: "10-A", email: "priya.patel@email.com", phone: "+91-9876543211", status: "Active" },
    { id: 3, name: "Rohan Kumar", rollNo: "103", class: "9-B", email: "rohan.kumar@email.com", phone: "+91-9876543212", status: "Active" },
    { id: 4, name: "Ananya Singh", rollNo: "104", class: "11-A", email: "ananya.singh@email.com", phone: "+91-9876543213", status: "Active" },
    { id: 5, name: "Vikram Jain", rollNo: "105", class: "10-B", email: "vikram.jain@email.com", phone: "+91-9876543214", status: "Inactive" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Students Management</h1>
          <p className="text-muted-foreground">Manage student records, add new students, edit information, and view student details.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the student's information to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="Full Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rollNo" className="text-right">Roll No</Label>
                <Input id="rollNo" placeholder="Roll Number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="class" className="text-right">Class</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9-A">Grade 9 - Section A</SelectItem>
                    <SelectItem value="9-B">Grade 9 - Section B</SelectItem>
                    <SelectItem value="10-A">Grade 10 - Section A</SelectItem>
                    <SelectItem value="10-B">Grade 10 - Section B</SelectItem>
                    <SelectItem value="11-A">Grade 11 - Section A</SelectItem>
                    <SelectItem value="11-B">Grade 11 - Section B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" placeholder="student@email.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" placeholder="+91-XXXXXXXXXX" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Add Student</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    student.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {student.status}
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

const AdminTeachers = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [teachers] = useState([
    { id: 1, name: "Dr. Priya Sharma", subject: "Mathematics", email: "priya.sharma@school.edu", phone: "+91-9876543201", status: "Active" },
    { id: 2, name: "Prof. Amit Singh", subject: "Physics", email: "amit.singh@school.edu", phone: "+91-9876543202", status: "Active" },
    { id: 3, name: "Ms. Kavita Rao", subject: "English", email: "kavita.rao@school.edu", phone: "+91-9876543203", status: "Active" },
    { id: 4, name: "Mr. Rajesh Kumar", subject: "History", email: "rajesh.kumar@school.edu", phone: "+91-9876543204", status: "Active" },
    { id: 5, name: "Dr. Anjali Gupta", subject: "Biology", email: "anjali.gupta@school.edu", phone: "+91-9876543205", status: "On Leave" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Teachers Management</h1>
          <p className="text-muted-foreground">Manage teacher profiles and assignments.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
              <DialogDescription>
                Enter the teacher's information to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="Full Name" className="col-span-3" />
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
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" placeholder="teacher@school.edu" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" placeholder="+91-XXXXXXXXXX" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Add Teacher</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    teacher.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {teacher.status}
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

const AdminParents = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [parents] = useState([
    { id: 1, name: "Rajesh Sharma", student: "Aarav Sharma", email: "rajesh.sharma@email.com", phone: "+91-9876543220", status: "Active" },
    { id: 2, name: "Sunita Patel", student: "Priya Patel", email: "sunita.patel@email.com", phone: "+91-9876543221", status: "Active" },
    { id: 3, name: "Mohan Kumar", student: "Rohan Kumar", email: "mohan.kumar@email.com", phone: "+91-9876543222", status: "Active" },
    { id: 4, name: "Meera Singh", student: "Ananya Singh", email: "meera.singh@email.com", phone: "+91-9876543223", status: "Active" },
    { id: 5, name: "Suresh Jain", student: "Vikram Jain", email: "suresh.jain@email.com", phone: "+91-9876543224", status: "Inactive" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Parents Management</h1>
          <p className="text-muted-foreground">Manage parent records and communication.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Parent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Parent</DialogTitle>
              <DialogDescription>
                Enter the parent's information to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" placeholder="Full Name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">Student</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aarav">Aarav Sharma</SelectItem>
                    <SelectItem value="priya">Priya Patel</SelectItem>
                    <SelectItem value="rohan">Rohan Kumar</SelectItem>
                    <SelectItem value="ananya">Ananya Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" placeholder="parent@email.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" placeholder="+91-XXXXXXXXXX" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Add Parent</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell className="font-medium">{parent.name}</TableCell>
                <TableCell>{parent.student}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>{parent.phone}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    parent.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {parent.status}
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

const AdminClasses = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [classes] = useState([
    { id: 1, name: "Grade 10 - Section A", teacher: "Dr. Priya Sharma", students: 45, room: "201", status: "Active" },
    { id: 2, name: "Grade 9 - Section B", teacher: "Mr. Rajesh Kumar", students: 38, room: "105", status: "Active" },
    { id: 3, name: "Grade 11 - Section A", teacher: "Dr. Anjali Gupta", students: 42, room: "301", status: "Active" },
    { id: 4, name: "Grade 10 - Section B", teacher: "Prof. Amit Singh", students: 41, room: "202", status: "Active" },
    { id: 5, name: "Grade 8 - Section A", teacher: "Ms. Kavita Rao", students: 36, room: "103", status: "Active" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Class Management</h1>
          <p className="text-muted-foreground">Manage classes, sections, and class assignments.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Create a new class section.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Class Name</Label>
                <Input id="name" placeholder="Grade X - Section Y" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teacher" className="text-right">Class Teacher</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priya">Dr. Priya Sharma</SelectItem>
                    <SelectItem value="amit">Prof. Amit Singh</SelectItem>
                    <SelectItem value="kavita">Ms. Kavita Rao</SelectItem>
                    <SelectItem value="rajesh">Mr. Rajesh Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="room" className="text-right">Room</Label>
                <Input id="room" placeholder="Room Number" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Add Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class Name</TableHead>
              <TableHead>Class Teacher</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="font-medium">{cls.name}</TableCell>
                <TableCell>{cls.teacher}</TableCell>
                <TableCell>{cls.students}</TableCell>
                <TableCell>{cls.room}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {cls.status}
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

const AdminFees = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [fees] = useState([
    { id: 1, student: "Aarav Sharma", feeType: "Tuition Fee", amount: 2500, dueDate: "2024-04-15", status: "Pending", paidDate: null },
    { id: 2, student: "Priya Patel", feeType: "Library Fee", amount: 150, dueDate: "2024-03-01", status: "Paid", paidDate: "2024-03-01" },
    { id: 3, student: "Rohan Kumar", feeType: "Transportation Fee", amount: 120, dueDate: "2024-03-10", status: "Paid", paidDate: "2024-03-08" },
    { id: 4, student: "Ananya Singh", feeType: "Tuition Fee", amount: 2500, dueDate: "2024-04-15", status: "Pending", paidDate: null },
    { id: 5, student: "Vikram Jain", feeType: "Examination Fee", amount: 300, dueDate: "2024-05-01", status: "Overdue", paidDate: null },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Fee Management</h1>
          <p className="text-muted-foreground">Manage school fees, payments, and outstanding balances.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Fee Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Fee Record</DialogTitle>
              <DialogDescription>
                Create a new fee record for a student.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="student" className="text-right">Student</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aarav">Aarav Sharma</SelectItem>
                    <SelectItem value="priya">Priya Patel</SelectItem>
                    <SelectItem value="rohan">Rohan Kumar</SelectItem>
                    <SelectItem value="ananya">Ananya Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="feeType" className="text-right">Fee Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select fee type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                    <SelectItem value="library">Library Fee</SelectItem>
                    <SelectItem value="transport">Transportation Fee</SelectItem>
                    <SelectItem value="exam">Examination Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" type="number" placeholder="Amount in ₹" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">Due Date</Label>
                <Input id="dueDate" type="date" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Add Fee Record</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Fee Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.student}</TableCell>
                <TableCell>{fee.feeType}</TableCell>
                <TableCell>₹{fee.amount}</TableCell>
                <TableCell>{fee.dueDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    fee.status === 'Paid'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : fee.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {fee.status}
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

const AdminExams = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [exams] = useState([
    { id: 1, name: "Mathematics Mid-term Exam", subject: "Mathematics", class: "10-A", date: "2024-04-05", duration: "2 hours", status: "Scheduled" },
    { id: 2, name: "Physics Lab Assessment", subject: "Physics", class: "11-A", date: "2024-04-10", duration: "3 hours", status: "Completed" },
    { id: 3, name: "English Literature Test", subject: "English", class: "10-A", date: "2024-04-15", duration: "1.5 hours", status: "Scheduled" },
    { id: 4, name: "Chemistry Practical Exam", subject: "Chemistry", class: "11-A", date: "2024-04-20", duration: "4 hours", status: "Scheduled" },
    { id: 5, name: "History Final Exam", subject: "History", class: "9-B", date: "2024-05-01", duration: "2 hours", status: "Draft" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Exam Management</h1>
          <p className="text-muted-foreground">Schedule and manage examinations and assessments.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Schedule Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule New Exam</DialogTitle>
              <DialogDescription>
                Create a new examination schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Exam Name</Label>
                <Input id="name" placeholder="Exam title" className="col-span-3" />
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
                    <SelectItem value="history">History</SelectItem>
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
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">Duration</Label>
                <Input id="duration" placeholder="e.g., 2 hours" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">Description</Label>
                <Textarea id="description" placeholder="Exam instructions..." className="col-span-3" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Schedule Exam</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exam Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.name}</TableCell>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>{exam.class}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.duration}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    exam.status === 'Scheduled'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : exam.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {exam.status}
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

const AdminNotices = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notices] = useState([
    { id: 1, title: "Annual Sports Day - Registration Open", content: "Registration for the annual sports day is now open. Students can participate in various events including kho-kho, kabaddi, and athletics...", type: "info", date: "2024-03-15" },
    { id: 2, title: "Parent-Teacher Conference Scheduled", content: "Parent-teacher conferences will be held next week from March 20-22. Please check your email for scheduled appointments...", type: "warning", date: "2024-03-10" },
    { id: 3, title: "Holi Celebration Notice", content: "Holi celebrations will be held on March 25th. Students are requested to bring natural colors only...", type: "info", date: "2024-03-12" },
    { id: 4, title: "Library Timings Update", content: "The school library will remain open until 6 PM on weekdays starting next week...", type: "info", date: "2024-03-08" },
    { id: 5, title: "Important: Fee Payment Deadline", content: "All outstanding fees must be cleared by March 31st to avoid late fees...", type: "urgent", date: "2024-03-05" },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notice Board</h1>
          <p className="text-muted-foreground">Create and manage school notices and announcements.</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Notice</DialogTitle>
              <DialogDescription>
                Create a new school notice or announcement.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" placeholder="Notice title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">Content</Label>
                <Textarea id="content" placeholder="Notice content..." className="col-span-3" rows={4} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddModalOpen(false)}>Add Notice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div key={notice.id} className={`p-4 rounded-lg border ${
            notice.type === 'urgent'
              ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
              : notice.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800'
              : 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{notice.title}</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm mb-2">{notice.content}</p>
            <p className="text-xs text-muted-foreground">{notice.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminAnalytics = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">School Analytics</h1>
    <p className="text-muted-foreground mb-6">Comprehensive insights into school performance and statistics.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Student Enrollment Trends</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>This Year:</span>
            <span className="font-bold">1,284</span>
          </div>
          <div className="flex justify-between">
            <span>Last Year:</span>
            <span>1,156</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Growth:</span>
            <span>+11.1%</span>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Attendance Overview</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Average Rate:</span>
            <span className="font-bold text-green-600">94.2%</span>
          </div>
          <div className="flex justify-between">
            <span>Best Class:</span>
            <span>10-A (96.8%)</span>
          </div>
          <div className="flex justify-between">
            <span>Needs Attention:</span>
            <span>8-B (87.3%)</span>
          </div>
        </div>
      </div>
      <div className="bg-card p-4 rounded-lg border">
        <h3 className="font-semibold mb-4">Academic Performance</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Pass Rate:</span>
            <span className="font-bold text-blue-600">98.7%</span>
          </div>
          <div className="flex justify-between">
            <span>Average GPA:</span>
            <span>3.4/4.0</span>
          </div>
          <div className="flex justify-between">
            <span>Top Performer:</span>
            <span>Mathematics</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export function AdminPortal() {
  const [location, navigate] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  const page = pathParts.length > 1 ? pathParts[1] : 'dashboard';

  const handleLogout = () => navigate('/');

  const renderPage = () => {
    switch(page) {
      case 'dashboard':
        return <Dashboard userRole="admin" userName="Dr. Ramesh Patel" />;
      case 'students':
        return <AdminStudents />;
      case 'teachers':
        return <AdminTeachers />;
      case 'parents':
        return <AdminParents />;
      case 'classes':
        return <AdminClasses />;
      case 'fees':
        return <AdminFees />;
      case 'exams':
        return <AdminExams />;
      case 'notices':
        return <AdminNotices />;
      case 'analytics':
        return <AdminAnalytics />;
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
