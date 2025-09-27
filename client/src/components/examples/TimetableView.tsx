import { TimetableView } from '../TimetableView';

// TODO: Remove mock data
const mockSchedule = [
  {
    day: 'Monday',
    slots: [
      { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' as const },
      { time: '08:45 - 09:30', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 201', type: 'lab' as const },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' as const },
      { time: '09:45 - 10:30', subject: 'English Literature', teacher: 'Ms. Davis', room: 'Room 103', type: 'lecture' as const },
      { time: '10:30 - 11:15', subject: 'Chemistry', teacher: 'Dr. Wilson', room: 'Lab 202', type: 'lab' as const }
    ]
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '08:00 - 08:45', subject: 'Biology', teacher: 'Dr. Brown', room: 'Lab 203', type: 'lab' as const },
      { time: '08:45 - 09:30', subject: 'History', teacher: 'Mr. Garcia', room: 'Room 104', type: 'lecture' as const },
      { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' as const },
      { time: '09:45 - 10:30', subject: 'Computer Science', teacher: 'Ms. Kumar', room: 'Computer Lab', type: 'lab' as const },
      { time: '10:30 - 11:15', subject: 'Geography', teacher: 'Mr. Lee', room: 'Room 105', type: 'lecture' as const }
    ]
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '08:00 - 10:00', subject: 'Mathematics Mid-term Exam', teacher: 'Dr. Smith', room: 'Main Hall', type: 'exam' as const },
      { time: '10:00 - 10:15', subject: 'Break', teacher: '', room: '', type: 'break' as const },
      { time: '10:15 - 11:00', subject: 'Art & Design', teacher: 'Ms. Taylor', room: 'Art Studio', type: 'lecture' as const }
    ]
  }
];

export default function TimetableViewExample() {
  const currentDay = 'Monday'; // TODO: Get current day dynamically
  
  return (
    <div className="p-4">
      <TimetableView 
        schedule={mockSchedule} 
        currentDay={currentDay}
      />
    </div>
  );
}