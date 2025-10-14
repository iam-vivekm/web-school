import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { Textarea } from '../../components/ui/textarea';
import { ArrowLeft, Save, X, BookOpen, User } from 'lucide-react';

// Dummy data for subjects and teachers
const availableSubjects = [
  'Mathematics', 'English', 'Science', 'Social Studies', 'Hindi',
  'Computer Science', 'Physical Education', 'Art', 'Music', 'Environmental Science'
];

const availableTeachers = [
  'Mrs. Sarah Johnson',
  'Mr. David Wilson',
  'Ms. Emma Davis',
  'Mr. Robert Brown',
  'Mrs. Lisa Anderson',
  'Mr. Michael Garcia',
  'Mrs. Maria Rodriguez',
  'Mr. James Taylor'
];

// Dummy data for classes
const availableClasses = [
  { id: 1, name: 'Class 1', section: 'A', teacher: 'Mrs. Sarah Johnson' },
  { id: 2, name: 'Class 2', section: 'B', teacher: 'Mr. David Wilson' },
  { id: 3, name: 'Class 3', section: 'A', teacher: 'Ms. Emma Davis' },
];

export default function AssignSubjects() {
  const [formData, setFormData] = useState({
    selectedClass: '',
    selectedSubjects: [],
    assignments: {} // subject -> teacher mapping
  });

  const [selectedClassData, setSelectedClassData] = useState(null);

  const handleClassSelect = (classId) => {
    const classData = availableClasses.find(cls => cls.id.toString() === classId);
    setSelectedClassData(classData);
    setFormData(prev => ({
      ...prev,
      selectedClass: classId,
      selectedSubjects: [],
      assignments: {}
    }));
  };

  const handleSubjectChange = (subject, checked) => {
    setFormData(prev => ({
      ...prev,
      selectedSubjects: checked
        ? [...prev.selectedSubjects, subject]
        : prev.selectedSubjects.filter(s => s !== subject),
      assignments: {
        ...prev.assignments,
        ...(checked ? {} : { [subject]: undefined })
      }
    }));
  };

  const handleTeacherAssignment = (subject, teacher) => {
    setFormData(prev => ({
      ...prev,
      assignments: {
        ...prev.assignments,
        [subject]: teacher
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Assignments submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Subjects
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assign Subjects</h1>
            <p className="text-muted-foreground">
              Assign subjects and teachers to specific classes.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Class Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Class Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="class">Select Class *</Label>
                <Select onValueChange={handleClassSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a class to assign subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.name} - Section {cls.section} (Class Teacher: {cls.teacher})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClassData && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">Selected Class Details:</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>Class: <span className="font-medium">{selectedClassData.name}</span></div>
                    <div>Section: <span className="font-medium">{selectedClassData.section}</span></div>
                    <div>Class Teacher: <span className="font-medium">{selectedClassData.teacher}</span></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Subject Assignment */}
        {selectedClassData && (
          <Card>
            <CardHeader>
              <CardTitle>Subject - Teacher Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Select Subjects</Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose subjects to assign to {selectedClassData.name} - Section {selectedClassData.section}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                    {availableSubjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={formData.selectedSubjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, checked)}
                        />
                        <Label
                          htmlFor={subject}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teacher Assignment */}
                {formData.selectedSubjects.length > 0 && (
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Assign Teachers</Label>
                    <p className="text-sm text-muted-foreground">
                      Assign a teacher to each selected subject
                    </p>

                    <div className="space-y-4">
                      {formData.selectedSubjects.map((subject) => (
                        <div key={subject} className="border rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <BookOpen className="h-4 w-4" />
                            <span className="font-medium">{subject}</span>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`teacher-${subject}`} className="text-sm">
                              Select Teacher *
                            </Label>
                            <Select
                              onValueChange={(value) => handleTeacherAssignment(subject, value)}
                              value={formData.assignments[subject] || ''}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose teacher for this subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableTeachers.map((teacher) => (
                                  <SelectItem key={teacher} value={teacher}>
                                    {teacher}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {formData.assignments[subject] && (
                            <div className="mt-2">
                              <Badge variant="secondary">
                                Assigned: {formData.assignments[subject]}
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        {selectedClassData && formData.selectedSubjects.length > 0 && (
          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="outline">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Save Assignments
            </Button>
          </div>
        )}

        {/* Summary */}
        {selectedClassData && formData.selectedSubjects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Assignment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Class:</span> {selectedClassData.name} - Section {selectedClassData.section}
                  </div>
                  <div>
                    <span className="font-medium">Subjects Selected:</span> {formData.selectedSubjects.length}
                  </div>
                </div>

                <div>
                  <span className="font-medium">Subject-Teacher Assignments:</span>
                  <div className="mt-2 grid gap-2">
                    {formData.selectedSubjects.map((subject) => (
                      <div key={subject} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span>{subject}</span>
                        <Badge variant={formData.assignments[subject] ? "default" : "secondary"}>
                          {formData.assignments[subject] || "Not assigned"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
      </div>
    </div>
  );
}
