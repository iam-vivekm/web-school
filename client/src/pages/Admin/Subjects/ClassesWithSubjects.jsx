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
import {
  Search,
  Edit,
  Eye,
  BookOpen,
  Users
} from 'lucide-react';

// Dummy data for class-subject relationships
const dummyClassSubjects = [
  {
    id: 1,
    className: 'Class 1',
    section: 'A',
    teacher: 'Mrs. Sarah Johnson',
    subjects: [
      { name: 'Mathematics', teacher: 'Mr. David Wilson' },
      { name: 'English', teacher: 'Mrs. Sarah Johnson' },
      { name: 'Science', teacher: 'Ms. Emma Davis' },
      { name: 'Social Studies', teacher: 'Mr. Robert Brown' },
      { name: 'Hindi', teacher: 'Mrs. Lisa Anderson' }
    ],
    totalStudents: 35
  },
  {
    id: 2,
    className: 'Class 2',
    section: 'B',
    teacher: 'Mr. David Wilson',
    subjects: [
      { name: 'Mathematics', teacher: 'Mr. David Wilson' },
      { name: 'English', teacher: 'Mrs. Sarah Johnson' },
      { name: 'Science', teacher: 'Ms. Emma Davis' },
      { name: 'Social Studies', teacher: 'Mr. Robert Brown' },
      { name: 'Computer Science', teacher: 'Mr. Michael Garcia' },
      { name: 'Physical Education', teacher: 'Ms. Jennifer Lee' }
    ],
    totalStudents: 32
  },
  {
    id: 3,
    className: 'Class 3',
    section: 'A',
    teacher: 'Ms. Emma Davis',
    subjects: [
      { name: 'Mathematics', teacher: 'Mr. David Wilson' },
      { name: 'English', teacher: 'Mrs. Sarah Johnson' },
      { name: 'Science', teacher: 'Ms. Emma Davis' },
      { name: 'Social Studies', teacher: 'Mr. Robert Brown' },
      { name: 'Art', teacher: 'Mrs. Maria Rodriguez' },
      { name: 'Music', teacher: 'Mr. James Taylor' }
    ],
    totalStudents: 28
  }
];

export default function ClassesWithSubjects() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = dummyClassSubjects.filter(cls =>
    cls.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes with Subjects</h1>
          <p className="text-muted-foreground">
            View subject assignments and teacher allocations for each class.
          </p>
        </div>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Manage Assignments
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Classes with Subjects - Table View */}
      <Card>
        <CardHeader>
          <CardTitle>Class Subject Assignments</CardTitle>
          <p className="text-sm text-muted-foreground">
            Showing {filteredClasses.length} of {dummyClassSubjects.length} classes
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Class Teacher</TableHead>
                <TableHead>Subjects Count</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.className}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{cls.section}</Badge>
                  </TableCell>
                  <TableCell>{cls.teacher}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                      {cls.subjects.length} subjects
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {cls.totalStudents} students
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Subject Cards */}
      <div className="space-y-4">
        {filteredClasses.map((cls) => (
          <Card key={cls.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="flex items-center">
                      {cls.className} - Section {cls.section}
                      <Badge variant="outline" className="ml-2">
                        Class Teacher: {cls.teacher}
                      </Badge>
                    </CardTitle>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-1 h-4 w-4" />
                    {cls.totalStudents} students
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Assigned Subjects ({cls.subjects.length})</span>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {cls.subjects.map((subject, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-muted/30">
                      <div className="font-medium text-sm">{subject.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Teacher: {subject.teacher}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
}
