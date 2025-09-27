import { StudentCard } from '../StudentCard';

// TODO: Remove mock data
const mockStudents = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.j@school.edu',
    phone: '+1 555-0123',
    class: '10',
    section: 'A',
    rollNumber: '2024001',
    address: '123 Oak Street, Springfield',
    joinDate: '2024-01-15',
    attendance: 94,
    grade: 'A+'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@school.edu',
    phone: '+1 555-0124',
    class: '11',
    section: 'B',
    rollNumber: '2024002',
    address: '456 Pine Avenue, Springfield',
    joinDate: '2024-01-16',
    attendance: 87,
    grade: 'B+'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.w@school.edu',
    phone: '+1 555-0125',
    class: '9',
    section: 'A',
    rollNumber: '2024003',
    address: '789 Maple Drive, Springfield',
    joinDate: '2024-01-17',
    attendance: 72,
    grade: 'B'
  }
];

export default function StudentCardExample() {
  const handleViewDetails = (studentId: string) => {
    console.log('View details for student:', studentId);
  };

  return (
    <div className="space-y-4 p-4">
      {mockStudents.map(student => (
        <StudentCard 
          key={student.id} 
          student={student} 
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
}