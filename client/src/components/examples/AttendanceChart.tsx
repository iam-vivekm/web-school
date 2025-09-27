import { AttendanceChart } from '../AttendanceChart';

// TODO: Remove mock data
const mockData = [
  { day: 'Mon', present: 1180, absent: 104, total: 1284 },
  { day: 'Tue', present: 1210, absent: 74, total: 1284 },
  { day: 'Wed', present: 1165, absent: 119, total: 1284 },
  { day: 'Thu', present: 1198, absent: 86, total: 1284 },
  { day: 'Fri', present: 1156, absent: 128, total: 1284 },
];

export default function AttendanceChartExample() {
  return (
    <div className="p-4">
      <AttendanceChart data={mockData} />
    </div>
  );
}