import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  Users,
  GraduationCap,
  Phone,
  Mail
} from 'lucide-react';

// Dummy data for students
const dummyStudents = [
  {
    id: 1,
    admissionNo: 'ST2024001',
    name: 'Alice Johnson',
    class: 'Class 1',
    section: 'A',
    rollNo: 1,
    gender: 'Female',
    phone: '+1-555-123-4567',
    email: 'alice.johnson@example.com',
    fatherName: 'John Johnson',
    motherName: 'Sarah Johnson',
    address: '123 Main St, Springfield',
    dateOfBirth: '2015-05-15',
    status: 'Active'
  },
  {
    id: 2,
    admissionNo: 'ST2024002',
    name: 'Bob Smith',
    class: 'Class 1',
    section: 'A',
    rollNo: 2,
    gender: 'Male',
    phone: '+1-555-234-5678',
    email: 'bob.smith@example.com',
    fatherName: ' Michael Smith',
    motherName: 'Emily Smith',
    address: '456 Oak Ave, Springfield',
    dateOfBirth: '2015-03-22',
    status: 'Active'
  },
  {
    id: 3,
    admissionNo: 'ST2024003',
    name: 'Charlie Brown',
    class: 'Class 2',
    section: 'B',
    rollNo: 1,
    gender: 'Male',
    phone: '+1-555-345-6789',
    email: 'charlie.brown@example.com',
    fatherName: 'Daniel Brown',
    motherName: 'Lisa Brown',
    address: '789 Elm St, Springfield',
    dateOfBirth: '2014-11-08',
    status: 'Active'
  },
  {
    id: 4,
    admissionNo: 'ST2024004',
    name: 'Diana Wilson',
    class: 'Class 2',
    section: 'B',
    rollNo: 2,
    gender: 'Female',
    phone: '+1-555-456-7890',
    email: 'diana.wilson@example.com',
    fatherName: 'Robert Wilson',
    motherName: 'Maria Wilson',
    address: '321 Pine St, Springfield',
    dateOfBirth: '2014-09-12',
    status: 'Inactive'
  },
  {
    id: 5,
    admissionNo: 'ST2024005',
    name: 'Eva Garcia',
    class: 'Class 3',
    section: 'A',
    rollNo: 1,
    gender: 'Female',
    phone: '+1-555-567-8901',
    email: 'eva.garcia@example.com',
    fatherName: 'Carlos Garcia',
    motherName: 'Anna Garcia',
    address: '654 Maple Ave, Springfield',
    dateOfBirth: '2014-01-30',
    status: 'Active'
  }
];

export default function AllStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredStudents = dummyStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = !classFilter || student.class === classFilter;
    const matchesStatus = !statusFilter || student.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const uniqueClasses = [...new Set(dummyStudents.map(student => student.class))];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Students</h1>
            <p className="text-muted-foreground">
              Manage and view all student information in the system.
            </p>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dummyStudents.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {dummyStudents.filter(s => s.status === 'Active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueClasses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Students</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {dummyStudents.filter(s => s.status === 'Inactive').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, admission no, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Classes</SelectItem>
                {uniqueClasses.map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Admission Date (From)</label>
              <Input type="date" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Admission Date (To)</label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {dummyStudents.length} students
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Roll No.</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.admissionNo}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Father: {student.fatherName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.section}</Badge>
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="mr-1 h-3 w-3" />
                        {student.phone}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="mr-1 h-3 w-3" />
                        {student.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
