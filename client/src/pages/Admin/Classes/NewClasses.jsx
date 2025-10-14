import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Checkbox } from '../../components/ui/checkbox';
import { ArrowLeft, Save, X } from 'lucide-react';

// Dummy data for subjects
const availableSubjects = [
  'Mathematics', 'English', 'Science', 'Social Studies', 'Hindi',
  'Computer Science', 'Physical Education', 'Art',
  'Music', 'Environmental Science'
];

// Dummy data for teachers
const availableTeachers = [
  'Mrs. Sarah Johnson',
  'Mr. David Wilson',
  'Ms. Emma Davis',
  'Mr. Robert Brown',
  'Mrs. Lisa Anderson',
  'Mr. Michael Garcia'
];

export default function NewClasses() {
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    teacher: '',
    capacity: '',
    description: '',
    subjects: []
  });

  const [selectedSection, setSelectedSection] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubjectChange = (subject, checked) => {
    setFormData(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    handleInputChange('section', section);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const availableSections = ['A', 'B', 'C', 'D'].filter(
    section => !['A', 'B'].includes(section) || section !== selectedSection
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Class</h1>
            <p className="text-muted-foreground">
              Add a new class to the system with subjects and teacher assignment.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Class 1, Grade 10"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Select onValueChange={handleSectionSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="teacher">Class Teacher</Label>
                <Select onValueChange={(value) => handleInputChange('teacher', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
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

              <div className="space-y-2">
                <Label htmlFor="capacity">Maximum Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="e.g., 40"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Class Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Classroom</Label>
                <Input
                  id="room"
                  placeholder="e.g., Room 101"
                  value={formData.room || ''}
                  onChange={(e) => handleInputChange('room', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select onValueChange={(value) => handleInputChange('academicYear', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                    <SelectItem value="2026-2027">2026-2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fees">Monthly Fees</Label>
                <Input
                  id="fees"
                  type="number"
                  placeholder="e.g., 2500"
                  value={formData.fees || ''}
                  onChange={(e) => handleInputChange('fees', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description for this class..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Subject Assignment */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Assignment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select the subjects that will be taught in this class.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableSubjects.map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <Checkbox
                      id={subject}
                      checked={formData.subjects.includes(subject)}
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

              {formData.subjects.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-sm text-muted-foreground">Selected subjects:</span>
                  {formData.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <Button type="button" variant="outline">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
