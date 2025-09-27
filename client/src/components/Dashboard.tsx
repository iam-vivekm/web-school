import { DashboardCard } from './DashboardCard';
import { AttendanceChart } from './AttendanceChart';
import { NoticeBoard } from './NoticeBoard';
import { TimetableView } from './TimetableView';
import { FeeManagement } from './FeeManagement';
import { Users, GraduationCap, Calendar, DollarSign, TrendingUp, Clock, BookOpen, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  userRole: 'admin' | 'teacher' | 'student' | 'parent';
  userName: string;
}

export function Dashboard({ userRole, userName }: DashboardProps) {
  // TODO: Remove mock data
  const [attendanceData] = useState([
    { day: 'Mon', present: 1180, absent: 104, total: 1284 },
    { day: 'Tue', present: 1210, absent: 74, total: 1284 },
    { day: 'Wed', present: 1165, absent: 119, total: 1284 },
    { day: 'Thu', present: 1198, absent: 86, total: 1284 },
    { day: 'Fri', present: 1156, absent: 128, total: 1284 },
  ]);

  const [notices] = useState([
    {
      id: '1',
      title: 'Annual Sports Day - Registration Open',
      content: 'Registration for the annual sports day is now open. Students can register for various events including track and field, swimming, and team sports. Deadline: March 15th.',
      type: 'info' as const,
      author: 'Physical Education Department',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      targetAudience: 'students' as const,
      isRead: false
    },
    {
      id: '2',
      title: 'Parent-Teacher Conference Scheduled',
      content: 'Parent-teacher conferences will be held next week from March 20-22. Please check your email for your scheduled appointment time.',
      type: 'warning' as const,
      author: 'Administration',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      targetAudience: 'parents' as const,
      isRead: false
    },
    {
      id: '3',
      title: 'URGENT: Early Dismissal Tomorrow',
      content: 'Due to severe weather warning, school will dismiss 2 hours early tomorrow (March 18th). Buses will run on modified schedule.',
      type: 'urgent' as const,
      author: 'Principal Office',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      targetAudience: 'all' as const,
      isRead: false
    }
  ]);

  const [schedule] = useState([
    {
      day: 'Today',
      slots: [
        { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Dr. Smith', room: 'Room 101', type: 'lecture' as const },
        { time: '08:45 - 09:30', subject: 'Physics', teacher: 'Prof. Johnson', room: 'Lab 201', type: 'lab' as const },
        { time: '09:30 - 09:45', subject: 'Break', teacher: '', room: '', type: 'break' as const },
        { time: '09:45 - 10:30', subject: 'English Literature', teacher: 'Ms. Davis', room: 'Room 103', type: 'lecture' as const },
      ]
    }
  ]);

  const [fees] = useState([
    {
      id: '1',
      description: 'Tuition Fee - Semester 2',
      amount: 2500,
      dueDate: new Date('2024-04-15'),
      status: 'pending' as const,
      category: 'tuition' as const
    },
    {
      id: '2',
      description: 'Library Fee - Annual',
      amount: 150,
      dueDate: new Date('2024-03-01'),
      status: 'overdue' as const,
      category: 'library' as const
    },
    {
      id: '3',
      description: 'Transportation Fee - March',
      amount: 120,
      dueDate: new Date('2024-03-10'),
      paidDate: new Date('2024-03-08'),
      status: 'paid' as const,
      category: 'transport' as const
    }
  ]);

  const handleMarkNoticeAsRead = (noticeId: string) => {
    console.log('Mark notice as read:', noticeId);
  };

  const handleViewAllNotices = () => {
    console.log('View all notices');
  };

  const handlePayFee = (feeId: string) => {
    console.log('Pay fee:', feeId);
  };

  const handleDownloadReceipt = (feeId: string) => {
    console.log('Download receipt:', feeId);
  };

  // Different dashboard configurations for each role
  const dashboardConfig = {
    admin: {
      title: `Welcome back, ${userName}`,
      subtitle: 'Administrator Dashboard',
      stats: [
        { title: "Total Students", value: 1284, description: "Active enrolled students", icon: Users, trend: { value: 12, label: "from last month", isPositive: true } },
        { title: "Teachers", value: 47, description: "Active faculty members", icon: GraduationCap, trend: { value: 2, label: "new this month", isPositive: true } },
        { title: "Classes Today", value: 28, description: "Scheduled for today", icon: Calendar },
        { title: "Fee Collection", value: "$124,500", description: "This month", icon: DollarSign, trend: { value: 8, label: "from last month", isPositive: true } }
      ]
    },
    teacher: {
      title: `Good morning, ${userName}`,
      subtitle: 'Teacher Dashboard',
      stats: [
        { title: "My Students", value: 85, description: "Across all classes", icon: Users },
        { title: "Classes Today", value: 6, description: "Scheduled classes", icon: Calendar },
        { title: "Assignments Due", value: 12, description: "Pending review", icon: ClipboardCheck },
        { title: "Attendance Rate", value: "94%", description: "This week", icon: TrendingUp, trend: { value: 2, label: "from last week", isPositive: true } }
      ]
    },
    student: {
      title: `Hello, ${userName}`,
      subtitle: 'Student Dashboard',
      stats: [
        { title: "Attendance", value: "94%", description: "This semester", icon: TrendingUp, trend: { value: 2, label: "from last month", isPositive: true } },
        { title: "Classes Today", value: 6, description: "Remaining classes", icon: Calendar },
        { title: "Assignments", value: 3, description: "Due this week", icon: BookOpen },
        { title: "Current Grade", value: "A-", description: "Overall GPA: 3.7", icon: ClipboardCheck }
      ]
    },
    parent: {
      title: `Hello, ${userName}`,
      subtitle: 'Parent Dashboard',
      stats: [
        { title: "Child's Attendance", value: "94%", description: "This month", icon: TrendingUp, trend: { value: 2, label: "from last month", isPositive: true } },
        { title: "Upcoming Events", value: 2, description: "This week", icon: Calendar },
        { title: "Fee Balance", value: "$2,650", description: "Outstanding fees", icon: DollarSign },
        { title: "Messages", value: 1, description: "From teachers", icon: Clock }
      ]
    }
  };

  const config = dashboardConfig[userRole];

  return (
    <div className="space-y-8" data-testid="dashboard-main">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-heading text-foreground" data-testid="text-dashboard-title">
          {config.title}
        </h1>
        <p className="text-muted-foreground text-lg">{config.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {userRole === 'admin' && (
            <AttendanceChart 
              data={attendanceData} 
              title="Weekly Attendance Overview"
            />
          )}
          
          {(userRole === 'student' || userRole === 'teacher') && (
            <TimetableView 
              schedule={schedule}
              title={userRole === 'teacher' ? 'Today\'s Teaching Schedule' : 'Today\'s Classes'}
              currentDay="Today"
            />
          )}
          
          {(userRole === 'parent' || userRole === 'student') && (
            <FeeManagement 
              fees={fees}
              onPayNow={handlePayFee}
              onDownloadReceipt={handleDownloadReceipt}
              title={userRole === 'parent' ? 'Fee Status' : 'My Fees'}
            />
          )}
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-8">
          <NoticeBoard 
            notices={notices}
            onMarkAsRead={handleMarkNoticeAsRead}
            onViewAll={handleViewAllNotices}
            maxItems={3}
          />
        </div>
      </div>
    </div>
  );
}