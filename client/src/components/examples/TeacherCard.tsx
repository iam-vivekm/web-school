import { TeacherCard } from '../TeacherCard';

// TODO: Remove mock data
const mockTeachers = [
  {
    id: '1',
    name: 'Dr. Jennifer Martinez',
    email: 'j.martinez@school.edu',
    phone: '+1 555-0201',
    subjects: ['Mathematics', 'Physics'],
    classes: ['10-A', '11-B', '12-A'],
    experience: 12,
    department: 'Science',
    totalStudents: 85,
    joinDate: '2012-08-15'
  },
  {
    id: '2',
    name: 'Prof. David Thompson',
    email: 'd.thompson@school.edu',
    phone: '+1 555-0202',
    subjects: ['English Literature', 'Creative Writing'],
    classes: ['9-A', '10-B'],
    experience: 8,
    department: 'Language Arts',
    totalStudents: 62,
    joinDate: '2016-01-10'
  },
  {
    id: '3',
    name: 'Ms. Sarah Kumar',
    email: 's.kumar@school.edu',
    phone: '+1 555-0203',
    subjects: ['Computer Science', 'Information Technology'],
    classes: ['11-A', '12-B'],
    experience: 6,
    department: 'Technology',
    totalStudents: 48,
    joinDate: '2018-07-22'
  }
];

export default function TeacherCardExample() {
  const handleViewSchedule = (teacherId: string) => {
    console.log('View schedule for teacher:', teacherId);
  };

  const handleAssignClass = (teacherId: string) => {
    console.log('Assign class to teacher:', teacherId);
  };

  return (
    <div className="space-y-4 p-4">
      {mockTeachers.map(teacher => (
        <TeacherCard 
          key={teacher.id} 
          teacher={teacher}
          onViewSchedule={handleViewSchedule}
          onAssignClass={handleAssignClass}
        />
      ))}
    </div>
  );
}